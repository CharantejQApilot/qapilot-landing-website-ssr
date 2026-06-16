import type { Metadata } from "next";
import AdminQueryProviders from "./AdminQueryProviders";

export const metadata: Metadata = {
  title: { default: "Admin", template: "%s | Admin" },
  robots: {
    index: false,
    follow: false,
    googleBot: { index: false, follow: false },
  },
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return <AdminQueryProviders>{children}</AdminQueryProviders>;
}
