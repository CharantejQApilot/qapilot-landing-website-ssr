/**
 * Homepage hero lattice + scan. Shared by the home hero and every
 * marketing hero so the atmosphere is one system, not a one-off.
 */
export function HomeHeroAtmosphere() {
  return (
    <div
      className="pointer-events-none absolute inset-0 overflow-hidden"
      aria-hidden
    >
      <div className="absolute inset-0 bg-structured-grid opacity-[0.45]" />
      <div className="absolute inset-0 home-hero-grid-scan">
        <div className="absolute inset-0 bg-structured-grid opacity-[0.9]" />
      </div>
    </div>
  );
}
