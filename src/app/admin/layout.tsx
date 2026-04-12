import AdminQueryProviders from "./AdminQueryProviders";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return <AdminQueryProviders>{children}</AdminQueryProviders>;
}
