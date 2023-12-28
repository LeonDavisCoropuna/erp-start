type TableProps = {
  children: React.ReactNode;
};

type TableRowProps = {
  children: React.ReactNode;
};

type TableCellProps = {
  children: React.ReactNode;
};

export const Table: React.FC<TableProps> = ({ children }) => {
  return (
    <div className="overflow-auto">
      <table className="min-w-full bg-white border border-gray-200">
        {children}
      </table>
    </div>
  );
};

export const TableRow: React.FC<TableRowProps> = ({ children }) => {
  return <tr className="hover:bg-slate-200">{children}</tr>;
};

export const TableCell: React.FC<TableCellProps> = ({ children }) => {
  return <td className="border px-4 py-2">{children}</td>;
};
