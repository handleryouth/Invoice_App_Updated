import { useCallback } from "react";
import { StatusBadgeProps } from "types";

const StatusBadge = ({ status, custom_class }: StatusBadgeProps) => {
  const handleStatusColorSwitch = useCallback(() => {
    switch (status) {
      case "Paid":
        return "bg-green-500 text-green-400";
      case "Pending":
        return "bg-orange-500 text-orange-400";
      case "Draft":
        return "bg-gray-500 text-gray-400";
    }
  }, [status]);

  return (
    <div
      className={` ${
        custom_class ? custom_class : "flex items-center justify-center"
      } ${handleStatusColorSwitch()}  bg-opacity-30 rounded-md w-28 h-10`}
    >
      <div
        className={`w-2 h-2 mr-2  ${handleStatusColorSwitch()}  rounded-full`}
      ></div>
      <p>{status}</p>
    </div>
  );
};

export default StatusBadge;
