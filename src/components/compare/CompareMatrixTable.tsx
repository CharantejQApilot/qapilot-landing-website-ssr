type CompareMatrixTableProps = {
  competitorName: string;
  rows: readonly (readonly [string, string, string])[];
  /** Accessible name for the table. */
  "aria-label"?: string;
};

/** Semantic comparison matrix for compare / alternatives pages. */
export function CompareMatrixTable({
  competitorName,
  rows,
  "aria-label": ariaLabel,
}: CompareMatrixTableProps) {
  return (
    <div className="overflow-x-auto border border-border">
      <table
        className="w-full min-w-[40rem] border-collapse text-left"
        aria-label={
          ariaLabel ?? `QApilot vs ${competitorName} feature comparison`
        }
      >
        <thead className="sticky top-0 bg-muted/40">
          <tr className="border-b border-border">
            <th
              scope="col"
              className="sticky left-0 bg-muted/40 px-4 py-3 font-heading text-sm font-semibold text-foreground sm:px-5"
            >
              Area
            </th>
            <th
              scope="col"
              className="px-4 py-3 font-heading text-sm font-semibold text-foreground sm:px-5"
            >
              {competitorName}
            </th>
            <th
              scope="col"
              className="px-4 py-3 font-heading text-sm font-semibold text-primary sm:px-5"
            >
              QApilot
            </th>
          </tr>
        </thead>
        <tbody>
          {rows.map(([area, competitor, qapilot]) => (
            <tr
              key={area}
              className="border-b border-border last:border-b-0"
            >
              <th
                scope="row"
                className="sticky left-0 bg-background px-4 py-4 font-heading text-sm font-semibold text-foreground sm:px-5 md:text-base"
              >
                {area}
              </th>
              <td className="px-4 py-4 text-sm leading-relaxed text-muted-foreground sm:px-5 md:text-base">
                {competitor}
              </td>
              <td className="bg-primary/[0.04] px-4 py-4 text-sm font-medium leading-relaxed text-foreground sm:px-5 md:text-base">
                {qapilot}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
