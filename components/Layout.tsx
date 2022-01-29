import { ReactNode } from "react";
import Script from "next/script";
import { MobileSidebar, Sidebar } from "./navbar";

function Layout({ children }: { children: ReactNode }) {
  return (
    <>
      <Script
        src="../path/to/tw-elements/dist/js/index.min.js"
        strategy="beforeInteractive"
      />
      <div className="bg-[#f8f8fb] dark:bg-[#141625]  min-w-[320px]">
        {/* <Sidebar /> */}
        <MobileSidebar />
        {children}
      </div>
    </>
  );
}

export default Layout;
