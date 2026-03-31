"use client";

import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Plus, Save, X, Edit, Trash2, Linkedin, Upload, Loader2 } from "lucide-react";

interface Writer {
  id: string;
  name: string;
  designation: string | null;
  description: string | null;
  linkedin_url: string | null;
  profile_image: string | null;
  created_at: string;
}

const WritersCMS = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [name, setName] = useState("");
  const [designation, setDesignation] = useState("");
  const [description, setDescription] = useState("");
  const [linkedinUrl, setLinkedinUrl] = useState("");
  const [profileImageUrl, setProfileImageUrl] = useState("");
  const [uploadingImage, setUploadingImage] = useState(false);
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: writers, isLoading } = useQuery({
    queryKey: ["admin-writers"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("writers")
        .select("*")
        .order("name");
      if (error) throw error;
      return data as Writer[];
    },
  });

  const saveMutation = useMutation({
    mutationFn: async () => {
      const writerData = {
        name,
        designation: designation || null,
        description: description || null,
        linkedin_url: linkedinUrl || null,
        profile_image: profileImageUrl || null,
      };

      if (editingId) {
        const { error } = await supabase
          .from("writers")
          .update(writerData)
          .eq("id", editingId);
        if (error) throw error;
      } else {
        const { error } = await supabase.from("writers").insert(writerData);
        if (error) throw error;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-writers"] });
      toast({
        title: "Success",
        description: editingId ? "Writer updated" : "Writer added",
      });
      resetForm();
    },
    onError: (error: Error) => {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from("writers").delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-writers"] });
      toast({ title: "Success", description: "Writer deleted" });
    },
  });

  const resetForm = () => {
    setEditingId(null);
    setName("");
    setDesignation("");
    setDescription("");
    setLinkedinUrl("");
    setProfileImageUrl("");
    setIsEditing(false);
  };

  const handleEdit = (writer: Writer) => {
    setEditingId(writer.id);
    setName(writer.name);
    setDesignation(writer.designation || "");
    setDescription(writer.description || "");
    setLinkedinUrl(writer.linkedin_url || "");
    setProfileImageUrl(writer.profile_image || "");
    setIsEditing(true);
  };

  const handleProfileImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadingImage(true);
    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `writer-${Date.now()}.${fileExt}`;
      const filePath = `writers/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('blog-images')
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      const { data: { publicUrl } } = supabase.storage
        .from('blog-images')
        .getPublicUrl(filePath);

      setProfileImageUrl(publicUrl);
      toast({ title: "Success", description: "Profile image uploaded" });
    } catch (error: any) {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    } finally {
      setUploadingImage(false);
    }
  };

  if (isLoading) return <div className="text-muted-foreground">Loading writers...</div>;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="font-heading text-xl font-semibold tracking-tight text-foreground">
          Writer profiles
        </h2>
        {!isEditing && (
          <Button onClick={() => setIsEditing(true)}>
            <Plus className="w-4 h-4 mr-2" />
            Add Writer
          </Button>
        )}
      </div>

      {isEditing && (
        <Card className="border border-border bg-card text-card-foreground shadow-sm">
          <CardContent className="p-6 space-y-4">
            <div className="flex justify-between items-center mb-2">
              <h3 className="font-semibold text-foreground">
                {editingId ? "Edit writer" : "New writer"}
              </h3>
              <Button variant="ghost" size="sm" onClick={resetForm}>
                <X className="w-4 h-4" />
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="writer-name">Name *</Label>
                <Input
                  id="writer-name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Full name"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="writer-designation">Designation</Label>
                <Input
                  id="writer-designation"
                  value={designation}
                  onChange={(e) => setDesignation(e.target.value)}
                  placeholder="e.g. Senior QA Engineer"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="writer-description">Short Bio</Label>
              <Textarea
                id="writer-description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="A brief description of the writer..."
                className="min-h-[80px]"
                maxLength={500}
              />
              <p className="text-xs text-muted-foreground">{description.length}/500 characters</p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="writer-linkedin">LinkedIn Profile URL</Label>
              <Input
                id="writer-linkedin"
                value={linkedinUrl}
                onChange={(e) => setLinkedinUrl(e.target.value)}
                placeholder="https://linkedin.com/in/username"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="writer-image">Profile Image</Label>
              <div className="flex items-center gap-4">
                {profileImageUrl && (
                  <img
                    src={profileImageUrl}
                    alt="Writer profile"
                    className="w-16 h-16 rounded-full object-cover border border-border"
                  />
                )}
                <div className="flex-1">
                  <Input
                    id="writer-image"
                    type="file"
                    accept="image/*"
                    onChange={handleProfileImageUpload}
                    disabled={uploadingImage}
                  />
                </div>
                {uploadingImage && <Loader2 className="w-5 h-5 animate-spin text-muted-foreground" />}
              </div>
            </div>

            <div className="flex gap-2">
              <Button
                onClick={() => saveMutation.mutate()}
                disabled={!name || saveMutation.isPending}
              >
                <Save className="w-4 h-4 mr-2" />
                {saveMutation.isPending ? "Saving..." : "Save"}
              </Button>
              <Button variant="outline" onClick={resetForm}>
                Cancel
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      <div className="grid gap-4">
        {writers && writers.length > 0 ? (
          writers.map((writer) => (
            <Card key={writer.id} className="border border-border bg-card text-card-foreground shadow-sm">
              <CardContent className="p-4 flex items-center justify-between">
                {writer.profile_image ? (
                  <img src={writer.profile_image} alt={writer.name} className="w-10 h-10 rounded-full object-cover border border-border flex-shrink-0 mr-3" />
                ) : (
                  <div className="w-10 h-10 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center flex-shrink-0 mr-3">
                    <span className="text-sm font-bold text-primary">{writer.name.charAt(0).toUpperCase()}</span>
                  </div>
                )}
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-semibold text-foreground">{writer.name}</h3>
                    {writer.linkedin_url && (
                      <a
                        href={writer.linkedin_url}
                        target="_blank"
                        rel="noopener"
                        className="text-primary hover:text-primary/80"
                        title={`${writer.name}'s LinkedIn`}
                      >
                        <Linkedin className="w-4 h-4" />
                      </a>
                    )}
                  </div>
                  {writer.designation && (
                    <p className="text-sm text-muted-foreground">{writer.designation}</p>
                  )}
                  {writer.description && (
                    <p className="text-sm text-muted-foreground mt-1 line-clamp-2">{writer.description}</p>
                  )}
                </div>
                <div className="flex gap-2 ml-4">
                  <Button variant="outline" size="sm" onClick={() => handleEdit(writer)}>
                    <Edit className="w-4 h-4" />
                  </Button>
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => {
                      if (confirm("Delete this writer? This will unlink them from any blogs.")) {
                        deleteMutation.mutate(writer.id);
                      }
                    }}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))
        ) : (
          <p className="text-muted-foreground text-center py-8">
            No writers added yet. Add your first writer profile above.
          </p>
        )}
      </div>
    </div>
  );
};

export default WritersCMS;
