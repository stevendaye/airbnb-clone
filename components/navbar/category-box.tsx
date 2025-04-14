"use client";

import { useCallback } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import qs from "query-string";

import { IconType } from "react-icons";

/* eslint-disable  @typescript-eslint/no-explicit-any */

interface CategoryBoxProps {
  label: string;
  icon: IconType;
  selected?: boolean;
}

export const CategoryBox: React.FC<CategoryBoxProps> = ({
  label,
  icon: Icon,
  selected,
}) => {
  const router = useRouter();
  const params = useSearchParams();

  const handleClick = useCallback(() => {
    let currentQuery = {};

    if (params) {
      currentQuery = qs.parse(params.toString());
    }

    const updatedQuery: any = {
      ...currentQuery,
      category: label,
    };

    // Unselect category icon on same click
    if (params?.get("category") === label) delete updatedQuery.category;

    const url = qs.stringifyUrl(
      {
        url: "/",
        query: updatedQuery,
      },
      { skipNull: true }
    );

    router.push(url);
  }, [label, params, router]);

  return (
    <div
      role="button"
      tabIndex={0}
      className={`flex flex-col items-center justify-center gap-2 p-3 border-b-2
      hover:text-neutral-800 transition cursor-pointer
      ${
        selected
          ? "border-b-neutral-800 text-neutral-800"
          : "border-transparent text-neutral-500"
      }`}
      onKeyDown={handleClick}
      onClick={handleClick}
    >
      <Icon size="26" />
      <div className="font-medium text-sm">{label}</div>
    </div>
  );
};
