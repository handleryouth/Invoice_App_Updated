import Image from "next/image";

const Sidebar = () => {
  return (
    <div className="absolute flex flex-col justify-between h-full bg-red-500">
      <div className="flex flex-col justify-between h-full">
        <Image
          src="/assets/logo.svg"
          alt="logo"
          width={50}
          height={50}
          layout="fixed"
        />

        <Image
          src="/assets/icon-sun.svg"
          alt="logo"
          width={50}
          height={50}
          layout="fixed"
        />
      </div>

      <Image
        className=""
        src="/assets/image-avatar.jpg"
        alt="profile picture"
        width={50}
        height={50}
        layout="fixed"
      />
    </div>
  );
};

export default Sidebar;
