import { HomeDarkAtmosphere } from "@/components/home/HomeDarkAtmosphere";
import { HomeEyebrow } from "@/components/home/HomeEyebrow";
import { HomeSeam } from "@/components/home/HomeSeam";
import {
  marketingSectionH2Class,
  marketingSectionIntroClass,
} from "@/lib/marketing-typography";
import { cn } from "@/lib/utils";

const ARCADE_EMBED_SRC =
  "https://demo.arcade.software/JxLpXPUuOXd4ad9mwlC9?embed&embed_mobile=tab&embed_desktop=inline&squared=true&show_copy_link=true";

/** S07 feature split. Existing demo copy | Arcade media. Dark chapter break. */
const ProductShowcaseSection = () => {
  return (
    <section className="relative section-navy overflow-hidden section-edge w-full">
      <HomeSeam invert />
      <HomeDarkAtmosphere glow="right" />
      <div className="section-full relative z-10 py-16 md:py-20 lg:py-24">
        <div className="sig-split max-lg:[grid-template-columns:minmax(0,1fr)] items-start lg:items-center">
          <header
            className="min-w-0"
            aria-labelledby="product-showcase-heading"
          >
            <HomeEyebrow invert>Interactive demo</HomeEyebrow>
            <h2
              id="product-showcase-heading"
              className={cn(
                marketingSectionH2Class,
                "text-white mb-4 md:mb-5",
              )}
            >
              QApilot <span className="text-white">In Action</span>
            </h2>
            <p
              className={cn(
                marketingSectionIntroClass,
                "w-full min-w-0 max-w-none !text-white/50",
              )}
            >
              See QApilot in action in this interactive demo. Experience
              AI-native quality assurance without installing anything.
            </p>
          </header>

          <div className="relative min-w-0 overflow-hidden rounded-md border border-white/10 bg-background">
            <div
              className="relative w-full"
              style={{
                paddingBottom: "calc(57.8889% + 41px)",
                height: 0,
                width: "100%",
              }}
            >
              <iframe
                src={ARCADE_EMBED_SRC}
                title="QApilot interactive demo"
                className="absolute left-0 top-0 h-full w-full"
                frameBorder={0}
                loading="lazy"
                allowFullScreen
                allow="clipboard-write"
                style={{ colorScheme: "light" }}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductShowcaseSection;
