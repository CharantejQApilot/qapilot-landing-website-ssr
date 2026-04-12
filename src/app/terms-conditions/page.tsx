import { permanentRedirect } from "next/navigation";
import { PATHS } from "@/lib/routes";

export default function TermsConditionsPage() {
  permanentRedirect(PATHS.TERMS);
}
