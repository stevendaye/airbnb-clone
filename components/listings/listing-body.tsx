"use client";

import useCountries from "@/hooks/use-countries";
import { SafeUser } from "@/types";
import { IconType } from "react-icons";
import { Avatar } from "../common/avatar";
import { ListingCategory } from "./listing-category";
import dynamic from "next/dynamic";
import { ListingAmenities } from "./listing-amenities";
import { ListingKnowMore } from "./listing-know-more";

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
  propertyAmenities:
    | {
        icon: IconType;
        label: string;
        description: string;
      }[]
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
  propertyAmenities,
}) => {
  const { getByValue } = useCountries();

  const coordinates = getByValue(locationValue)?.latlng;
  const country = getByValue(locationValue)?.label;
  const region = getByValue(locationValue)?.region;

  return (
    <div className="col-span-4 flex flex-col gap-7">
      <div className="flex flex-col gap-5">
        <div className="flex flex-col gap-1">
          <h1 className="text-2xl font-bold">
            Property in {country}, {region}
          </h1>

          <div className="flex items-center gap-2 font-light text-neutral-800">
            <p className="text-base">{guestCount} guests</p> &middot;
            <p className="text-base">{roomCount} rooms</p> &middot;
            <p className="text-base">{bathroomCount} bathrooms</p>
          </div>
        </div>

        <div className="flex items-center text-base gap-3">
          <Avatar src={user?.image} />
          <div className="flex flex-col">
            <p className="font-bold">Hosted by {user?.name?.split(" ")[0]}</p>
            <p className="text-neutral-600 text-sm">Superhost</p>
          </div>
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
      <div className="text-lg font-light text-neutral-800">{description}</div>

      <hr />
      {propertyAmenities && <ListingAmenities amenities={propertyAmenities} />}

      <hr className="mt-2" />
      <div className="flex flex-col gap-3">
        <h3 className="text-xl font-bold">Where you will be</h3>
        <p className="text-sm text-neutral-500">
          {country}, {region}
        </p>
      </div>
      <MapLocation center={coordinates} />

      <hr />
      <ListingKnowMore guestCount={guestCount} />
    </div>
  );
};
