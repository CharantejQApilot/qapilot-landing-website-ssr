import BookDemoCtaButton from "@/components/compare/BookDemoCtaButton";
import { MarketingThesisHero } from "@/components/marketing/MarketingThesisHero";

export function SecurityReportsHero() {
  return (
    <MarketingThesisHero
      ariaLabel="Security reports for mobile"
      title={
        <>
          <span className="text-primary">Security Reports</span> That Ship With Your Release
        </>
      }
      lead="Surface risk alongside functional testing—permissions, network, storage, and trackers—so every build is reviewed with the same rigor as your features."
      cta={<BookDemoCtaButton />}
    />
  );
}
