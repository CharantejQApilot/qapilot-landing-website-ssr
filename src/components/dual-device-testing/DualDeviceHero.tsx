import BookDemoCtaButton from "@/components/compare/BookDemoCtaButton";
import { DualDeviceHeroVisual } from "@/components/dual-device-testing/DualDeviceHeroVisual";
import { MarketingThesisHero } from "@/components/marketing/MarketingThesisHero";

export function DualDeviceHero() {
  return (
    <MarketingThesisHero
      titleId="dual-device-hero-title"
      eyebrow="Synchronised across two devices"
      title={
        <>
          Dual Device <span className="text-hero-here">Testing</span>
        </>
      }
      lead="Real journeys span two devices. QApilot runs both sides as one continuous transaction."
      cta={<BookDemoCtaButton />}
      media={<DualDeviceHeroVisual />}
    />
  );
}
