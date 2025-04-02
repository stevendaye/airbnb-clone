"use client";

import { BiSearch } from "react-icons/bi";
import useSearchModal from "@/hooks/use-search-modal";

export const Search: React.FC = () => {
  const searchModal = useSearchModal();

  return (
    <div
      role="button"
      tabIndex={0}
      onKeyDown={searchModal.onOpen}
      className="border w-full md:w-auto py-2 rounded-full shadow-sm hover:shadow-md transition cursor-pointer"
      onClick={searchModal.onOpen}
    >
      <div className="flex flex-row items-center justify-between">
        <div className="text-sm font-semibold px-6">Anywhere</div>

        <div className="hidden sm:block text-sm font-semibold px-6 border-x flex-1 text-center">
          Any week
        </div>

        <div className="text-sm pl-6 pr-2 text-gray-600 flex items-center gap-3">
          <div className="hidden sm-block">Add Guests</div>
          <div className="p-2 bg-rose-500 rounded-full text-white">
            <BiSearch size="18" />
          </div>
        </div>
      </div>
    </div>
  );
};
