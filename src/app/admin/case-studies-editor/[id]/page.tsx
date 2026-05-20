import type { Metadata } from "next";
import CaseStudyEditorClient from "../CaseStudyEditorClient";

export const metadata: Metadata = {
  title: "Case Study Editor",
  robots: { index: false, follow: false },
};

export default function CaseStudyEditorWithIdPage() {
  return <CaseStudyEditorClient />;
}
