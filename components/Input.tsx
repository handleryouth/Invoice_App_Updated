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
    <div className={`my-2 ${className}`}>
      <label htmlFor="input_label">{label}</label>
      <input
        className="w-full p-2 text-black mt-1 rounded"
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
