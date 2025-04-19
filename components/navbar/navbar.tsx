"use client";

import { Suspense } from "react";
import { Container } from "../common/container";
import { Categories } from "./categories";
import { Logo } from "./logo";
import { Search } from "./search";
import { UserMenu } from "./user-menu";
import { SafeUser } from "@/types";

interface NavbarProps {
  currentUser?: SafeUser | null;
}

export const Navbar: React.FC<NavbarProps> = ({ currentUser }) => {
  return (
    <div className="fixed w-full bg-white z-10 shadow-sm">
      <div className="py-4 border-b">
        <Container>
          <div className="flex items-center justify-between gap-3 md:gap-0">
            <Logo />
            <Suspense>
              <Search />
            </Suspense>
            <UserMenu currentUser={currentUser} />
          </div>
        </Container>
      </div>

      <Suspense>
        <Categories />
      </Suspense>
    </div>
  );
};
