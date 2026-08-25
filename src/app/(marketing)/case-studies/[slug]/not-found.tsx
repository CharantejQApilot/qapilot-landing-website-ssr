import Link from "next/link";
import { PATHS } from "@/lib/routes";

export default function CaseStudyNotFound() {
  return (
    <div className="section-edge flex min-h-[50vh] w-full items-center bg-background py-20">
      <div className="section-full">
        <h1 className="font-heading text-3xl font-semibold tracking-tight text-foreground">
          Case study not found
        </h1>
        <p className="mt-3 max-w-xl text-muted-foreground">
          That customer story is not on this site. See the published case studies
          instead.
        </p>
        <Link
          href={PATHS.CASE_STUDIES}
          className="mt-6 inline-block text-sm font-semibold text-primary hover:underline"
        >
          All case studies
        </Link>
      </div>
    </div>
  );
}
