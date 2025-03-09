"use client";

import Image from "next/image";

interface AvatarProps {
  src: string | null | undefined;
}

export const Avatar: React.FC<AvatarProps> = ({ src }) => {
  return (
    <Image
      alt="Avatar"
      width={30}
      height={30}
      className="rounded-full"
      src={src ?? "/images/user-placeholder.png"}
    />
  );
};
