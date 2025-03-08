"use client";

import { User } from "@prisma/client";

import { Container } from "../commons/container";
import { Logo } from "./logo";
import { Search } from "./search";
import { UserMenu } from "./user-menu";

interface NavbarProps {
  currentUser?: User | null;
}

export const Navbar: React.FC<NavbarProps> = ({ currentUser }) => {
  return (
    <div className="fixed w-full bg-white z-10 shadow-sm">
      <div className="py-4 border-b">
        <Container>
          <div className="flex items-center justify-between gap-3 md:gap-0">
            <Logo />
            <Search />
            <UserMenu currentUser={currentUser} />
          </div>
        </Container>
      </div>
    </div>
  );
};
