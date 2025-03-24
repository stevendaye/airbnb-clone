"use client";

import useCountries from "@/hooks/useCountries";
import { SafeUser } from "@/types";
import { IconType } from "react-icons";
import { Avatar } from "../common/avatar";
import { ListingCategory } from "./listing-category";
import dynamic from "next/dynamic";

interface ListingBodyProps {
  user: SafeUser;
  description: string;
  roomCount: number;
  guestCount: number;
  bathroomCount: number;
  locationValue: string;
  category:
    | {
        icon: IconType;
        label: string;
        description: string;
      }
    | undefined;
}

const MapLocation = dynamic(() => import("@/components/common/map-location"), {
  ssr: false,
});

export const ListingBody: React.FC<ListingBodyProps> = ({
  user,
  category,
  description,
  roomCount,
  guestCount,
  bathroomCount,
  locationValue,
}) => {
  const { getByValue } = useCountries();

  const coordinates = getByValue(locationValue)?.latlng;

  return (
    <div className="col-span-4 flex flex-col gap-8">
      <div className="flex flex-col gap-2">
        <div className="flex items-center text-xl font-semibold gap-2">
          <p className="font-normal">Hosted by {user?.name}</p>
          <Avatar src={user?.image} />
        </div>

        <div className="flex items-center gap-4 font-light text-neutral-500">
          <p className="font-normal">{guestCount} guests</p>
          <p className="font-normal">{roomCount} rooms</p>
          <p className="font-normal">{bathroomCount} bathrooms</p>
        </div>
      </div>
      <hr />

      {category && (
        <ListingCategory
          icon={category.icon}
          label={category.label}
          description={category.description}
        />
      )}

      <hr />
      <div className="text-lg font-light text-neutral-500">{description}</div>
      <hr />

      <MapLocation center={coordinates} />
    </div>
  );
};
