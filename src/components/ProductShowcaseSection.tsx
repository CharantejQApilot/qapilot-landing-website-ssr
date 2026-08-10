import {
  marketingEyebrowClass,
  marketingSectionH2Class,
  marketingSectionIntroClass,
} from "@/lib/marketing-typography";
import { cn } from "@/lib/utils";

const ARCADE_EMBED_SRC =
  "https://demo.arcade.software/JxLpXPUuOXd4ad9mwlC9?embed&embed_mobile=tab&embed_desktop=inline&squared=true&show_copy_link=true";

/** S07 feature split. Existing demo copy | Arcade media. */
const ProductShowcaseSection = () => {
  return (
    <section className="relative bg-background overflow-hidden section-edge w-full">
      <div className="section-full relative z-10 pt-7 pb-[2.8rem] md:pt-[2.45rem] md:pb-14 2xl:pt-[2.8rem] 2xl:pb-[4.2rem]">
        <div className="sig-split items-start lg:items-center">
          <header
            className="min-w-0"
            aria-labelledby="product-showcase-heading"
          >
            <p className={marketingEyebrowClass}>Interactive demo</p>
            <h2
              id="product-showcase-heading"
              className={cn(
                marketingSectionH2Class,
                "text-foreground mb-4 md:mb-5",
              )}
            >
              QApilot <span className="text-primary">In Action</span>
            </h2>
            <p
              className={cn(
                marketingSectionIntroClass,
                "w-full min-w-0 max-w-none",
              )}
            >
              See QApilot in action in this interactive demo. Experience
              AI-native quality assurance without installing anything.
            </p>
          </header>

          <div className="relative min-w-0 overflow-hidden rounded-2xl border border-border bg-background">
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
