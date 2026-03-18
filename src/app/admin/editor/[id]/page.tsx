import type { Metadata } from "next";
import BlogEditorClient from "../BlogEditorClient";

export const metadata: Metadata = {
  title: "Editor | QApilot",
  robots: { index: false, follow: false },
};

export default function BlogEditorWithIdPage() {
  return <BlogEditorClient />;
}
