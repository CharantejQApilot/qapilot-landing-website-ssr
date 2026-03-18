import type { Metadata } from "next";
import BringYourOwnAgentClient from "./BringYourOwnAgentClient";

export const metadata: Metadata = {
  title: "Differentiators - What Makes QApilot Different",
  description:
    "Discover what sets QApilot apart: AI-native architecture, Bring Your Own Agent (BYOA) extensibility, and intelligent mobile app testing automation.",
};

export default function BringYourOwnAgentPage() {
  return <BringYourOwnAgentClient />;
}
