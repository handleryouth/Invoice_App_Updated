import { DropdownProps } from "types";

const Dropdown = ({
  label,
  option,
  toggleFunction,
  value,
}: DropdownProps) => {
  return (
    <div className="flex flex-col ">
      <label htmlFor="payment_term">{label}</label>
      <select
        id="payment_term"
        className="px-2 py-3 text-black rounded bg-white"
        onChange={(event) => {
          toggleFunction!(event.target.value);
        }}
        value={value}
      >
        {option.map((item, index) => {
          return (
            <option key={index} value={item.value}>
              {item.label}
            </option>
          );
        })}
      </select>
    </div>
  );
};

export default Dropdown;
