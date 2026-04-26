"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { z } from "zod";
import { getAdminAccessState } from "@/lib/admin/admin-auth";
import {
  clearAdminAccessCookie,
  setAdminAccessCookie,
} from "@/lib/admin/session-cookie";

const authSchema = z.object({
  email: z.string().trim().email({ message: "Invalid email address" }),
  password: z.string().min(6, { message: "Password must be at least 6 characters" }),
});

const AuthClient = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { toast } = useToast();

  useEffect(() => {
    const routeForSession = async () => {
      const access = await getAdminAccessState(supabase);
      if (access.status === "ok") {
        setAdminAccessCookie(access.session.access_token);
        router.push("/admin");
      } else if (access.status === "forbidden") {
        setAdminAccessCookie(access.session.access_token);
        router.push("/");
      } else {
        clearAdminAccessCookie();
      }
    };
    routeForSession();

    const { data: { subscription } } = supabase.auth.onAuthStateChange(() => {
      void routeForSession();
    });

    return () => subscription.unsubscribe();
  }, [router]);

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const validation = authSchema.safeParse({ email, password });
    if (!validation.success) {
      toast({
        title: "Validation Error",
        description: validation.error.errors[0].message,
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    const { data, error } = await supabase.auth.signInWithPassword({
      email: validation.data.email,
      password: validation.data.password,
    });

    if (error) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    }
    if (!error && data.session?.access_token) {
      setAdminAccessCookie(data.session.access_token);
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-background dark flex items-center justify-center p-4 relative">
      <div className="absolute inset-0 glow-bg"></div>
      
      <Card className="w-full max-w-md relative z-10 border-border/50 bg-card/95 backdrop-blur">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-center text-gradient">Admin Portal</CardTitle>
          <CardDescription className="text-center">
            Sign in to manage your blog content
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSignIn} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="admin@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? "Signing in..." : "Sign In"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default AuthClient;
