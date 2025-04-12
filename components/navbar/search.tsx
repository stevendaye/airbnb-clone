"use client";

import { BiSearch } from "react-icons/bi";
import useSearchModal from "@/hooks/use-search-modal";
import { useSearchParams } from "next/navigation";
import useCountries from "@/hooks/use-countries";
import { useMemo } from "react";
import { differenceInDays } from "date-fns";

export const Search: React.FC = () => {
  const searchParams = useSearchParams();

  const searchModal = useSearchModal();
  const { getByValue } = useCountries();

  const locationValue = searchParams?.get("locationValue");
  const endDate = searchParams?.get("endDate");
  const startDate = searchParams?.get("startDate");
  const guestCount = searchParams?.get("guestCount");

  const locationLabel = useMemo(() => {
    if (locationValue) {
      return getByValue(locationValue)?.label;
    }

    return "Anywhere";
  }, [locationValue, getByValue]);

  const durationLabel = useMemo(() => {
    if (startDate && endDate) {
      const start = new Date(startDate);
      const end = new Date(endDate);

      let diffDays = differenceInDays(end, start);

      if (diffDays === 0) {
        diffDays = 1;
      }

      return `${diffDays} Days`;
    }

    return "Any Week";
  }, [startDate, endDate]);

  const guestLabel = useMemo(() => {
    if (guestCount) {
      return `${guestCount} Guests`;
    }

    return "Add Guests";
  }, [guestCount]);

  return (
    <div
      role="button"
      tabIndex={0}
      onKeyDown={searchModal.onOpen}
      className="border w-full md:w-auto py-2 rounded-full shadow-sm hover:shadow-md transition cursor-pointer"
      onClick={searchModal.onOpen}
    >
      <div className="flex flex-row items-center justify-between">
        <div className="text-sm font-semibold px-6">{locationLabel}</div>

        <div className="hidden sm:block text-sm font-semibold px-6 border-x flex-1 text-center">
          {durationLabel}
        </div>

        <div className="text-sm pl-6 pr-2 text-gray-600 flex items-center gap-3">
          <div className="hidden sm-block">{guestLabel}</div>
          <div className="p-2 bg-rose-500 rounded-full text-white">
            <BiSearch size="18" />
          </div>
        </div>
      </div>
    </div>
  );
};
