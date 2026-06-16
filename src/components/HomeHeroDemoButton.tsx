import { BookDemoLinkButton } from "@/components/book-demo/BookDemoLinkButton";
import { cn } from "@/lib/utils";

export default function HomeHeroDemoButton() {
  return (
    <BookDemoLinkButton
      size="lg"
      className={cn(
        "rounded-xl bg-primary font-semibold text-primary-foreground shadow-lg shadow-primary/25 transition-shadow",
        "hover:bg-primary/90 hover:shadow-xl hover:shadow-primary/20",
        "px-8 py-5 text-base sm:px-10 sm:py-7 sm:text-lg md:text-xl 2xl:px-14 2xl:py-8 2xl:text-xl",
        "max-lg:px-7 max-lg:py-4 max-lg:text-base max-lg:shadow-xl max-lg:shadow-primary/30",
        "max-lg:sm:px-10 max-lg:sm:py-6 max-lg:sm:text-lg max-lg:md:px-12 max-lg:md:py-7 max-lg:md:text-xl",
      )}
    />
  );
}
