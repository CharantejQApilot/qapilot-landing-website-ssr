import type { Metadata } from "next";
import AuthClient from "./AuthClient";

export const metadata: Metadata = {
  title: "Login | QApilot",
  robots: { index: false, follow: false },
};

export default function AuthPage() {
  return <AuthClient />;
}
