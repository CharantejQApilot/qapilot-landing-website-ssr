import Footer from "@/components/Footer";

/** Shared site footer for all public marketing routes. */
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
