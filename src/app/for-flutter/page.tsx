import type { Metadata } from "next";
import ForFlutterClient from "./ForFlutterClient";

export const metadata: Metadata = {
  title: "Flutter App Testing - AI-Native Testing Platform",
  description:
    "The best AI-native platform for Flutter app testing. Instant sanity checks and scalable functional coverage engineered for Flutter's unique needs. Zero setup, script-free testing.",
};

export default function ForFlutterPage() {
  return <ForFlutterClient />;
}
