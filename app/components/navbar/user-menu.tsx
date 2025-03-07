"use client";

import { useCallback, useState } from "react";

import { AiOutlineMenu } from "react-icons/ai";

import { GoGlobe } from "react-icons/go";
import { Avatar } from "../commons/avatar";
import { MenuItem } from "./menu-item";
import useRegisterModal from "@/app/hooks/useRegisterModal";

export const UserMenu = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const toggleOpen = useCallback(() => {
    setIsOpen((prevValue) => !prevValue);
  }, []);

  const registerModal = useRegisterModal();

  return (
    <div className="relative">
      <div className="flex items-center gap-1">
        <div
          className="hidden md:block text-[16px] font-semibold py-3 px-4 rounded-full hover:bg-neutral-100 transition cursor-pointer"
          role="button"
          tabIndex={0}
          onKeyDown={() => {}}
          onClick={() => {}}
        >
          Airbnb your home
        </div>

        <div className="hidden md:block text-sm font-semibold p-4 rounded-full hover:bg-neutral-100 transition cursor-pointer">
          <GoGlobe size={20} />
        </div>

        <div
          className="p-4 md:py-1 md:px-2 border border-neutral-200 flex items-center gap-3 rounded-full cursor-pointer hover:shadow-md transition"
          role="button"
          tabIndex={0}
          onKeyDown={() => {}}
          onClick={toggleOpen}
        >
          <AiOutlineMenu />
          <div className="hidden md:block">
            <Avatar />
          </div>
        </div>

        {isOpen && (
          <div className="absolute rounded-xl shadow-md w-[40vw] md:w-3/4 bg-white overflow-hidden right-0 top-12 text-sm">
            <div className="flex flex-col cursor-pointer">
              <MenuItem label="Sign up" onClick={registerModal.onOpen} />
              <MenuItem label="Log in" onClick={toggleOpen} />

              <hr />

              <MenuItem label="Gift Cards" onClick={toggleOpen} />
              <MenuItem label="Airbnb your home" onClick={toggleOpen} />
              <MenuItem label="Host an experience" onClick={toggleOpen} />
              <MenuItem label="Help Center" onClick={toggleOpen} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
