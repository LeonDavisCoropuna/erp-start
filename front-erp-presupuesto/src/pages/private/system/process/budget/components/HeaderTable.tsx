export const HeadersTablePresupuesto = ({
  value,
  size,
}: {
  value: string;
  size: number;
}) => {
  return (
    <th
      className={`bg-blue-600 text-white resize-x overflow-auto border-[0.15em]`}
    >
      <div className={`h-full w-[${size}em]`}> {value}</div>
    </th>
  );
};
