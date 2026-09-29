type TestingApproachTableProps = {
  caption?: string;
};

const ROWS = [
  {
    approach: "Manual",
    author: "A tester repeats the journey each release",
    change: "The tester does the work again",
  },
  {
    approach: "Scripted",
    author: "An engineer maintains the test code",
    change: "Scripts break and need repairs",
  },
  {
    approach: "QApilot",
    author: "The platform explores the app",
    change: "Self-healing adapts the test",
  },
] as const;

/** Real <table> for comparison content. Restates the manual / scripted / autonomous split. */
export function TestingApproachTable({
  caption = "How mobile testing approaches differ",
}: TestingApproachTableProps) {
  return (
    <div className="my-8 overflow-x-auto">
      <table className="w-full min-w-[36rem] border-collapse text-left text-sm md:text-base">
        <caption className="mb-3 text-left font-heading text-lg font-semibold tracking-tight text-foreground md:text-xl">
          {caption}
        </caption>
        <thead>
          <tr className="border-b border-border">
            <th scope="col" className="py-3 pr-4 font-semibold text-foreground">
              Approach
            </th>
            <th scope="col" className="py-3 pr-4 font-semibold text-foreground">
              Who writes the test
            </th>
            <th scope="col" className="py-3 font-semibold text-foreground">
              When the UI changes
            </th>
          </tr>
        </thead>
        <tbody>
          {ROWS.map((row) => (
            <tr key={row.approach} className="border-b border-border/80">
              <th scope="row" className="py-3 pr-4 font-semibold text-foreground">
                {row.approach}
              </th>
              <td className="py-3 pr-4 text-muted-foreground">{row.author}</td>
              <td className="py-3 text-muted-foreground">{row.change}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
