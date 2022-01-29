import Image from "next/image";
import { useTheme } from "next-themes";
import { useRouter } from "next/router";

const Sidebar = () => {
  const router = useRouter();
  const { theme, setTheme } = useTheme();

  return (
    <div className="flex items-center justify-between  w-full bg-[#252945] z-30">
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
