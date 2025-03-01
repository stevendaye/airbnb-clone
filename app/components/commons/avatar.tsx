"use client";

import Image from "next/image";

export const Avatar: React.FC = () => {
  return (
    <Image
      alt="Avatar"
      width={30}
      height={30}
      className="rounded-full"
      src="/images/user-placeholder.png"
    />
  );
};
