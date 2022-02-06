import React from "react";

interface CheckboxProps {
  value: "Draft" | "Paid" | "Pending";
  toggleFunction: (value: string) => void;
}

const Checkbox = ({ value, toggleFunction }: CheckboxProps) => {
  return (
    <div className="form-check my-2">
      <input
        className="form-check-input appearance-none h-4 w-4 border border-gray-300 rounded-sm bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer"
        type="checkbox"
        value={value}
        onChange={(event) => toggleFunction(event.target.value)}
        id="flexCheckDefault"
      />
      <label
        className="form-check-label inline-block dark:text-white"
        htmlFor="flexCheckDefault"
      >
        {value}
      </label>
    </div>
  );
};

export default Checkbox;
