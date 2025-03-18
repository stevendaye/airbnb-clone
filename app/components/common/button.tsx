"use client";

import { IconType } from "react-icons";

interface ButtonProps {
  label: string;
  disabled?: boolean;
  outline?: boolean;
  small?: boolean;
  icon?: IconType;
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

export const Button: React.FC<ButtonProps> = ({
  label,
  disabled,
  outline,
  small,
  icon: Icon,
  onClick,
}) => {
  return (
    <button
      disabled={disabled}
      onClick={onClick}
      className={`relative disabled:opacity-70 disabled:cursor-not-allowed rounded-lg
        w-full transition ${outline ? "bg-white" : "bg-rose-500"} ${
        outline ? "border-black" : "border-rose-500"
      } ${outline ? "text-black" : "text-white"}
       ${small ? "py-1" : "py-3"} ${small ? "text-sm" : "text-[16px]"} ${
        small ? "font-light" : "font-semibold"
      } ${small ? "border" : "border-2"}
      ${outline ? "hover:bg-neutral-100" : "hover:opacity-80"}
    `}
    >
      {Icon && <Icon size="24" className="absolute left-4 top-3" />}
      {label}
    </button>
  );
};
