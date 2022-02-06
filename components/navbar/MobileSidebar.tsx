import Image from "next/image";
import { useTheme } from "next-themes";
import { useRouter } from "next/router";
import { Dropdown } from "components";
import useTranslation from "next-translate/useTranslation";
import { useCallback } from "react";

const Sidebar = () => {
  const router = useRouter();
  const { t } = useTranslation("common");
  const { theme, setTheme } = useTheme();

  const handleChangeLanguage = useCallback(
    (value: string) => {
      router.push(router.basePath, router.basePath, { locale: value });
    },
    [router]
  );

  return (
    <div className="flex items-center justify-between  w-full border-b-2 border-slate-500 bg-white dark:bg-[#252945] z-30">
      <div
        className="bg-[#9277ff] relative  rounded-r-lg before:top-2/3  before:rounded-t-lg overflow-hidden before:absolute before:w-full before:h-full before:bg-slate-800/25 "
        onClick={() => {
          router.push("/");
        }}
      >
        <div className="p-8">
          <Image
            src="/assets/logo.svg"
            alt="logo"
            width={20}
            height={20}
            layout="fixed"
          />
        </div>
      </div>

      <div className="flex items-center">
        <Dropdown
          className="mr-4 !text-sm"
          option={[
            { label: "English", value: "en" },
            { label: "Indonesia", value: "id" },
          ]}
          toggleFunction={handleChangeLanguage}
        />

        <div className="relative mr-8 top-1">
          <Image
            onClick={() => setTheme(theme === "light" ? "dark" : "light")}
            src={`/assets/${
              theme === "light" ? "icon-moon.svg" : "icon-sun.svg"
            }`}
            alt="logo"
            width={30}
            height={30}
            layout="fixed"
          />
        </div>

        <Image
          className="rounded-full"
          src="/assets/image-avatar.jpg"
          alt="profile picture"
          width={50}
          height={50}
          layout="fixed"
        />
      </div>
    </div>
  );
};

export default Sidebar;
