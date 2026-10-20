import { HomeHeroCta } from "@/lib/home-hero-cta";
import { BOOK_DEMO_CALENDAR_URL } from "@/lib/constants";

export default function HomeHeroDemoButton({ className }: { className?: string }) {
  return (
    <HomeHeroCta href={BOOK_DEMO_CALENDAR_URL} variant="primary" external className={className}>
      Book a Demo
    </HomeHeroCta>
  );
}
