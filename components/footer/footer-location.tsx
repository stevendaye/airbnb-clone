"use client";

import { usePathname } from "next/navigation";
import useListingLocation from "@/hooks/use-listing-location";

export const FooterLocation = () => {
  const pathename = usePathname();
  const isHomePage = pathename === "/";

  const { category, region, country } = useListingLocation();

  if (!category || !region || !country || isHomePage) return;

  return (
    <div className="border py-8 border-y border-slate-300">
      <p className="max-w-screen-lg m-auto px-7 lg:px-0">
        Airbnb Clone &nbsp;&nbsp;&gt;&nbsp;&nbsp; English
        &nbsp;&nbsp;&gt;&nbsp;&nbsp;
        {category} &gt;&nbsp;&nbsp;
        {region} &nbsp;&nbsp;&gt;&nbsp;&nbsp;
        {country}
      </p>
    </div>
  );
};
