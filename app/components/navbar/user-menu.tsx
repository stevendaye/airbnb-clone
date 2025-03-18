"use client";

import { useCallback, useState } from "react";
import { signOut } from "next-auth/react";

import { AiOutlineMenu } from "react-icons/ai";
import { GoGlobe } from "react-icons/go";

import { Avatar } from "../common/avatar";
import { MenuItem } from "./menu-item";

import { SafeUser } from "@/app/types";

import useRegisterModal from "@/app/hooks/useRegisterModal";
import useLoginModal from "@/app/hooks/useLoginModal";
import useRentModal from "@/app/hooks/useRentModal";

interface UserMenuProps {
  currentUser?: SafeUser | null;
}

export const UserMenu: React.FC<UserMenuProps> = ({ currentUser }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const toggleOpen = useCallback(() => {
    setIsOpen((prevValue) => !prevValue);
  }, []);

  const registerModal = useRegisterModal();
  const loginModal = useLoginModal();
  const rentModal = useRentModal();

  const onRentHome = useCallback(() => {
    if (!currentUser) return loginModal.onOpen();

    rentModal.onOpen();
  }, [currentUser, loginModal, rentModal]);

  return (
    <div className="relative">
      <div className="flex items-center gap-1">
        <div
          className="hidden md:block text-[16px] font-semibold py-3 px-4 rounded-full hover:bg-neutral-100 transition cursor-pointer"
          role="button"
          tabIndex={0}
          onKeyDown={onRentHome}
          onClick={onRentHome}
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
            <Avatar src={currentUser?.image} />
          </div>
        </div>

        {isOpen && (
          <div className="absolute rounded-xl shadow-md w-[40vw] md:w-3/4 bg-white overflow-hidden right-0 top-12 text-sm">
            {currentUser ? (
              <div className="flex flex-col cursor-pointer">
                <MenuItem
                  label="My trips"
                  onClick={() => {
                    toggleOpen();
                  }}
                />
                <MenuItem
                  label="My favourites"
                  onClick={() => {
                    toggleOpen();
                  }}
                />
                <MenuItem
                  label="My reservations"
                  onClick={() => {
                    toggleOpen();
                  }}
                />
                <MenuItem
                  label="My properties"
                  onClick={() => {
                    toggleOpen();
                  }}
                />
                <MenuItem
                  label="Airbnb my home"
                  onClick={() => {
                    toggleOpen();
                    rentModal.onOpen();
                  }}
                />

                <hr />

                <MenuItem label="Logout" onClick={signOut} />
              </div>
            ) : (
              <div className="flex flex-col cursor-pointer">
                <MenuItem
                  label="Sign up"
                  onClick={() => {
                    registerModal.onOpen();
                    toggleOpen();
                  }}
                />
                <MenuItem
                  label="Log in"
                  onClick={() => {
                    loginModal.onOpen();
                    toggleOpen();
                  }}
                />

                <hr />

                <MenuItem label="Gift Cards" onClick={toggleOpen} />
                <MenuItem label="Airbnb your home" onClick={toggleOpen} />
                <MenuItem label="Host an experience" onClick={toggleOpen} />
                <MenuItem label="Help Center" onClick={toggleOpen} />
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
