"use client";

import useFavourite from "@/hooks/useFavourite";
import { SafeUser } from "@/types";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";

interface HeartButtonProps {
  listingId: string;
  currentUser?: SafeUser | null;
}

export const HeartButton: React.FC<HeartButtonProps> = ({
  listingId,
  currentUser,
}) => {
  const { hasFavourited, toggleFavourite } = useFavourite({
    listingId,
    currentUser,
  });

  return (
    <div
      role="button"
      tabIndex={0}
      onKeyDown={() => {}}
      onClick={toggleFavourite}
      className="relative cursor-pointer hover:opacity-80 transition"
    >
      <AiOutlineHeart
        size="28"
        className="absolute fill-white -top-[2px] -right-[2px]"
      />
      {hasFavourited && (
        <AiFillHeart
          size="24"
          className={true ? "fill-red-500" : "fill-neutral-500/70"}
        />
      )}
    </div>
  );
};
