export const InputField: React.FC<{
    value: any;
    onChange: (value: any) => void;
  }> = ({ value, onChange }) => {
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      onChange(e.target.value);
    };
  
    return (
      <td className="border-[0.15em] justify-center">
        <input
          type="text"
          value={value}
          onChange={handleChange}
          className="w-full h-full bg-transparent pl-1 border-none outline-none"
        />
      </td>
    );
  };