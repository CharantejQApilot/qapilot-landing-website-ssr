/**
 * Playerzero-inspired section: a grid of muted coloured cells as background
 * with a content overlay (video, image, or metrics). Use for hero-style
 * content blocks, demo videos, or key metrics.
 */

import { ReactNode } from "react";

/* Muted, earthy tones for grid cells (Playerzero-style) */
const GRID_CELL_COLORS = [
  "hsl(35 18% 88%)",
  "hsl(45 12% 85%)",
  "hsl(60 8% 82%)",
  "hsl(80 12% 86%)",
  "hsl(30 15% 84%)",
  "hsl(220 10% 88%)",
  "hsl(40 14% 86%)",
  "hsl(50 10% 83%)",
  "hsl(25 12% 87%)",
  "hsl(70 10% 85%)",
];

interface GridContentSectionProps {
  /** Content to render on top of the grid (video, image, metrics card) */
  children: ReactNode;
  /** Optional section title above the grid */
  title?: string;
  /** Optional subtitle / eyebrow */
  eyebrow?: string;
  /** Number of columns in the grid (default 20) */
  gridCols?: number;
  /** Number of rows (default 10) */
  gridRows?: number;
  /** Additional class for the section wrapper */
  className?: string;
  /** Optional id for the section */
  id?: string;
  /** Optional data attribute for scroll targets (e.g. data-section="video") */
  dataSection?: string;
  /** If true, content is in a card with border; if false, content fills the overlay area */
  contentInCard?: boolean;
}

const GridContentSection = ({
  children,
  title,
  eyebrow,
  gridCols = 20,
  gridRows = 10,
  className = "",
  id,
  dataSection,
  contentInCard = true,
}: GridContentSectionProps) => {
  const totalCells = gridCols * gridRows;
  const cells = Array.from({ length: totalCells }, (_, i) => ({
    color: GRID_CELL_COLORS[i % GRID_CELL_COLORS.length],
  }));

  return (
    <section
      id={id}
      {...(dataSection ? { "data-section": dataSection } : {})}
      className={`relative w-full overflow-hidden section-edge min-h-[420px] md:min-h-[520px] ${className}`}
    >
      {/* Grid background — absolute, fills section (Harvey-style edge-to-edge) */}
      <div
        className="absolute inset-0 grid gap-0"
        style={{
          gridTemplateColumns: `repeat(${gridCols}, 1fr)`,
          gridTemplateRows: `repeat(${gridRows}, 1fr)`,
        }}
        aria-hidden
      >
        {cells.map((cell, i) => (
          <div
            key={i}
            style={{
              backgroundColor: cell.color,
            }}
          />
        ))}
      </div>

      {/* Content — in flow so section grows; centered over grid */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-[420px] md:min-h-[520px] py-12 md:py-16">
        {(eyebrow || title) && (
          <div className="section-full text-center mb-8">
            {eyebrow && (
              <span className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground block mb-2">
                {eyebrow}
              </span>
            )}
            {title && (
              <h2 className="font-heading text-2xl md:text-3xl lg:text-4xl font-semibold text-foreground">
                {title}
              </h2>
            )}
          </div>
        )}
        <div className={`w-full section-full ${contentInCard ? "max-w-4xl mx-auto" : ""}`}>
          {contentInCard ? (
            <div className="rounded-xl overflow-hidden border border-border bg-background/95 backdrop-blur-sm shadow-lg">
              {children}
            </div>
          ) : (
            children
          )}
        </div>
      </div>
    </section>
  );
};

export default GridContentSection;
