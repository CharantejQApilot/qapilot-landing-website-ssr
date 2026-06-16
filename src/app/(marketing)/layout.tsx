import Footer from "@/components/Footer";

/** Shared site footer for all public marketing routes (single ISR surface with Header in root layout). */
export default function MarketingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      {children}
      <Footer />
    </>
  );
}
