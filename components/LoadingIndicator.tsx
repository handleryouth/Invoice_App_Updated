import { useTheme } from "next-themes";
import ReactLoading from "react-loading";

const LoadingIndicator = () => {
  const { theme } = useTheme();
  return (
    <ReactLoading
      type="bubbles"
      height={50}
      width={50}
      color={`${theme === "light" ? "black" : "white"}`}
    />
  );
};

export default LoadingIndicator;
