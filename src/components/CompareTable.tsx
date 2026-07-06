// src/components/CompareTable.tsx
// Tabel de comparație semantic. Motoarele AI extrag tabele cu prioritate,
// iar userii adoră "opțiuni într-un loc" -> bun și pentru afiliere.
// Prima coloană din fiecare rând devine <th scope="row"> (numele opțiunii).
type Props = {
  caption?: string;
  columns: string[];
  rows: (string | number)[][];
};

export function CompareTable({caption, columns, rows}: Props) {
  return (
    <div className="compare-table-wrap">
      <table className="compare-table">
        {caption && <caption>{caption}</caption>}
        <thead>
          <tr>
            {columns.map((c, i) => (
              <th key={i} scope="col">
                {c}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, ri) => (
            <tr key={ri}>
              {row.map((cell, ci) =>
                ci === 0 ? (
                  <th key={ci} scope="row">
                    {cell}
                  </th>
                ) : (
                  <td key={ci}>{cell}</td>
                )
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
