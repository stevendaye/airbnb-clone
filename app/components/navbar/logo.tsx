"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";

export const Logo: React.FC = () => {
  const router = useRouter();

  return (
    <Image
      alt="Logo"
      width="100"
      height="100"
      className="hidden md:block cursor-pointer"
      src="/images/airbnb-logo.png"
      onClick={() => router.push("/")}
    />
  );
};
