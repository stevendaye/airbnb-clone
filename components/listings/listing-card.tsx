"use client";

import useCountries from "@/hooks/useCountries";
import { SafeListing, SafeReservation, SafeUser } from "@/types";
import { format } from "date-fns";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useCallback, useMemo } from "react";
import { HeartButton } from "../common/heart-button";
import { Button } from "../common/button";

interface ListingCardProps {
  data: SafeListing;
  reservation?: SafeReservation;
  onAction?: (id: string) => void;
  actionId?: string;
  actionLabel?: string;
  disabled?: boolean;
  currentUser?: SafeUser | null;
}

export const ListingCard: React.FC<ListingCardProps> = ({
  data,
  reservation,
  onAction,
  actionLabel,
  actionId = "",
  disabled,
  currentUser,
}) => {
  const router = useRouter();
  const { getByValue } = useCountries();

  const location = getByValue(data.locationValue);

  const handleCancel = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      e.stopPropagation();

      if (disabled) return;

      onAction?.(actionId);
    },
    [actionId, onAction, disabled]
  );

  const price = useMemo(() => {
    if (reservation) return reservation.totalPrice;

    return data.price;
  }, [reservation, data.price]);

  const reservationDate = useMemo(() => {
    if (!reservation) return null;

    const start = new Date(reservation.startDate);
    const end = new Date(reservation.endDate);

    return `${format(start, "PP")} ${format(end, "PP")}`;
  }, [reservation]);

  const showListingDetail = () => {
    router.push(`/listings/${data.id}`);
  };

  return (
    <div
      role="button"
      tabIndex={0}
      onKeyDown={showListingDetail}
      onClick={showListingDetail}
      className="col-span-1 cursor-pointer group"
    >
      <div className="flex flex-col gap-2 w-full">
        <div className="aspect-square w-full relative overflow-hidden rounded-xl">
          <Image
            src={data.imageSrc}
            className="object-cover h-full w-full group-hover:scale-110 transition"
            alt="Listing"
            fill
          />

          <div className="absolute top-3 right-3">
            <HeartButton listingId={data.id} currentUser={currentUser} />
          </div>
        </div>

        <div className="font-semibold text-lg">
          {location?.region}, {location?.label}
        </div>
        <div className="font-light text-neutral-500 ">
          {reservationDate ?? data.category}
        </div>
        <div className="flex items-center gap-1">
          <div className="font-semibold">$ {price}</div>
          {!reservation && <div className="font-light"> night </div>}
        </div>

        {onAction && actionLabel && (
          <Button
            disabled={disabled}
            small
            label={actionLabel}
            onClick={handleCancel}
          />
        )}
      </div>
    </div>
  );
};
