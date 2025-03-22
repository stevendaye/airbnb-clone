"use client";

import { usePathname, useSearchParams } from "next/navigation";

import { Container } from "../common/container";
import { CategoryBox } from "./category-box";
import { categories } from "@/utils";

export const Categories = () => {
  const params = useSearchParams();
  const category = params?.get("category");
  const pathname = usePathname();

  const isHomePage = pathname === "/";

  if (!isHomePage) return null;

  return (
    <Container>
      <div className="flex items-center justify-between pt-4 overflow-x-auto">
        {categories.map((item) => (
          <CategoryBox
            key={item.label}
            label={item.label}
            icon={item.icon}
            selected={category === item.label}
          />
        ))}
      </div>
    </Container>
  );
};
