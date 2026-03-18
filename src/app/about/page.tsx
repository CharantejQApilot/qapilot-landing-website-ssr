import type { Metadata } from "next";
import AboutClient from "./AboutClient";

export const metadata: Metadata = {
  title: "About QApilot - AI-Native Mobile App Testing Company",
  description:
    "QApilot exists to make mobile testing effortless, scalable, and future-ready for every team, from startups to global enterprises. Learn about our mission and vision.",
};

export default function AboutPage() {
  return <AboutClient />;
}
