import { marketingEyebrowClass, marketingSectionH2Class, marketingSectionIntroClass } from "@/lib/marketing-typography";
import { cn } from "@/lib/utils";

const ARCADE_EMBED_SRC =
  "https://demo.arcade.software/JxLpXPUuOXd4ad9mwlC9?embed&embed_mobile=tab&embed_desktop=inline&squared=true&show_copy_link=true";

const ProductShowcaseSection = () => {
  return (
    <section className="relative bg-background overflow-hidden section-edge w-full">
      <div className="section-full relative z-10 pt-7 pb-[2.8rem] md:pt-[2.45rem] md:pb-14 2xl:pt-[2.8rem] 2xl:pb-[4.2rem]">
        <header
          className="mb-14 w-full rounded-2xl border border-border bg-muted/20 px-6 py-8 shadow-sm md:px-10 md:py-10 2xl:mb-20 2xl:px-12 2xl:py-12 relative overflow-hidden"
          aria-labelledby="product-showcase-heading"
        >
          <span className="absolute left-0 top-0 bottom-0 w-1 bg-primary rounded-l-2xl" aria-hidden />
          <div className="relative pl-4 md:pl-5">
            <p className={marketingEyebrowClass}>Interactive demo</p>
            <h2
              id="product-showcase-heading"
              className={cn(marketingSectionH2Class, "text-foreground mb-4 md:mb-5")}
            >
              QApilot <span className="text-primary">In Action</span>
            </h2>
            <p className={cn(marketingSectionIntroClass, "w-full min-w-0 max-w-none")}>
              See QApilot in action in this interactive demo—experience AI-native quality assurance without installing anything.
            </p>
          </div>
        </header>

        <div className="relative border border-border rounded-2xl overflow-hidden bg-background">
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
    </section>
  );
};

export default ProductShowcaseSection;
