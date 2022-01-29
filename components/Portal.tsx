import { createPortal } from "react-dom";

interface PortalProps {
  children: React.ReactNode;
  visible: boolean;
}

const Portal = ({ children, visible }: PortalProps) => {
  return visible
    ? createPortal(children, document.querySelector("#modalportal")!)
    : null;
};

export default Portal;
