import { HomeHeroCta } from "@/lib/home-hero-cta";
import { BOOK_DEMO_CALENDAR_URL } from "@/lib/constants";

export default function HomeHeroDemoButton() {
  return (
    <HomeHeroCta href={BOOK_DEMO_CALENDAR_URL} variant="primary" external>
      Book a Demo
    </HomeHeroCta>
  );
}
