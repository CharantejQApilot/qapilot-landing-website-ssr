import { HomeHeroCta } from "@/lib/home-hero-cta";
import { PATHS } from "@/lib/routes";

export default function HomeHeroDemoButton() {
  return (
    <HomeHeroCta href={PATHS.BOOK_DEMO} variant="primary">
      Book a Demo
    </HomeHeroCta>
  );
}
