import { InputProps } from "types";

const Input = ({
  label,
  placeholder,
  type = "text",
  toggleFunction,
  className,
  value,
  defaultValue,
}: InputProps) => {
  return (
    <div className={`my-2 ${className && className}`}>
      <label htmlFor="input_label">{label}</label>
      <input
        className="w-full mt-1 pl-0 border-x-0 border-t-0 bg-transparent text-white border-white focus:border-white focus:ring-0"
        type={type}
        defaultValue={defaultValue}
        value={value}
        id="input_label"
        placeholder={placeholder}
        onChange={(event) => {
          toggleFunction!(event.target.value);
        }}
      />
    </div>
  );
};

export default Input;
