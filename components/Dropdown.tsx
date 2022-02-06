import { DropdownProps } from "types";

const Dropdown = ({
  label,
  option,
  toggleFunction,
  value,
  className,
}: DropdownProps) => {
  return (
    <div className={`flex flex-col my-4 ${className}`}>
      <label htmlFor="payment_term ">{label}</label>
      <select
        id="payment_term"
        className="pl-0 py-3 mb-2  bg-transparent border-x-0 border-t-0 dark:text-white"
        onChange={(event) => {
          toggleFunction!(event.target.value);
        }}
        value={value}
      >
        {option.map((item, index) => {
          return (
            <option key={index} value={item.value} className="text-black">
              {item.label}
            </option>
          );
        })}
      </select>
    </div>
  );
};

export default Dropdown;
