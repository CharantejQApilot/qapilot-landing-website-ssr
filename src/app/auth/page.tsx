import type { Metadata } from "next";
import AuthClient from "./AuthClient";

export const metadata: Metadata = {
  title: "Login",
  robots: { index: false, follow: false },
};

export default function AuthPage() {
  return <AuthClient />;
}
