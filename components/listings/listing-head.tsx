"use client";

import useCountries from "@/hooks/use-countries";
import { SafeUser } from "@/types";
import { Heading } from "../common/heading";
import Image from "next/image";
import { HeartButton } from "../common/heart-button";
import { useEffect, useState } from "react";

interface ListingHeadProps {
  id: string;
  title: string;
  imagesSrc: string[];
  locationValue: string;
  currentUser?: SafeUser | null;
}

export const ListingHead: React.FC<ListingHeadProps> = ({
  id,
  title,
  imagesSrc,
  locationValue,
  currentUser,
}) => {
  const { getByValue } = useCountries();

  const [region, setRegion] = useState<string>("");
  const [locationLabel, setLocationLabel] = useState<string>("");

  useEffect(() => {
    const location = getByValue(locationValue);

    if (location) {
      setRegion(location.region);
      setLocationLabel(location.label);
    }
  }, [locationValue, getByValue]);

  return (
    <>
      <Heading title={title} subTitle={`${region}, ${locationLabel}`} />
      <div className="w-full flex flex-col md:flex-row gap-2 h-[50vh]">
        <div className="relative w-full h-3/4 md:h-full md:w-[65%]">
          <Image
            src={imagesSrc[0]}
            alt="Main image"
            fill
            className="object-cover w-full h-full rounded-l-xl rounded-tr-xl md:rounded-tr-none
            rounded-bl-none md:rounded-bl-xl"
          />
          <div className="absolute top-5 right-5 z-10">
            <HeartButton listingId={id} currentUser={currentUser} />
          </div>
        </div>

        <div className="w-full h-1/4 md:h-full md:w-[35%]">
          {imagesSrc.length === 3 && (
            <div className="flex flex-row md:flex-col gap-2 h-full">
              {imagesSrc.slice(1, 2).map((src) => (
                <div
                  key={src}
                  className="relative w-1/2 md:w-full md:h-1/2 h-full"
                >
                  <Image
                    src={src}
                    alt={`Image ${src}`}
                    fill
                    className="object-cover rounded-bl-xl md:rounded-bl-none md:rounded-tr-xl"
                  />
                </div>
              ))}
              {imagesSrc.slice(2).map((src) => (
                <div
                  key={src}
                  className="relative w-1/2 md:w-full md:h-1/2 h-full"
                >
                  <Image
                    src={src}
                    alt={`Image ${src}`}
                    fill
                    className="object-cover rounded-br-xl"
                  />
                </div>
              ))}
            </div>
          )}

          {imagesSrc.length === 4 && (
            <div className="flex flex-row md:flex-col gap-2 h-full">
              {imagesSrc.slice(1, 2).map((src) => (
                <div
                  key={src}
                  className="relative w-1/3 md:w-full md:h-1/3 h-full"
                >
                  <Image
                    src={src}
                    alt={`Image ${src}`}
                    fill
                    className="object-cover rounded-bl-xl md:rounded-bl-none md:rounded-tr-xl"
                  />
                </div>
              ))}
              {imagesSrc.slice(2, 3).map((src) => (
                <div
                  key={src}
                  className="relative w-1/3 md:w-full md:h-1/3 h-full"
                >
                  <Image
                    src={src}
                    alt={`Image ${src}`}
                    fill
                    className="object-cover"
                  />
                </div>
              ))}
              {imagesSrc.slice(3).map((src) => (
                <div
                  key={src}
                  className="relative w-1/3 md:w-full md:h-1/3 h-full"
                >
                  <Image
                    src={src}
                    alt={`Image ${src}`}
                    fill
                    className="object-cover rounded-br-xl"
                  />
                </div>
              ))}
            </div>
          )}

          {imagesSrc.length >= 5 && (
            <div className="grid grid-cols-2 grid-rows-2 gap-2 h-full">
              {imagesSrc.slice(1, 2).map((src) => (
                <div key={src} className="relative w-full h-full">
                  <Image
                    src={src}
                    alt={`Image ${src}`}
                    fill
                    className="object-cover"
                  />
                </div>
              ))}
              {imagesSrc.slice(2, 3).map((src) => (
                <div key={src} className="relative w-full h-full">
                  <Image
                    src={src}
                    alt={`Image ${src}`}
                    fill
                    className="object-cover rounded-tr-xl"
                  />
                </div>
              ))}
              {imagesSrc.slice(3, 4).map((src) => (
                <div key={src} className="relative w-full h-full">
                  <Image
                    src={src}
                    alt={`Image ${src}`}
                    fill
                    className="object-cover"
                  />
                </div>
              ))}
              {imagesSrc.slice(4).map((src) => (
                <div key={src} className="relative w-full h-full">
                  <Image
                    src={src}
                    alt={`Image ${src}`}
                    fill
                    className="object-cover rounded-br-xl"
                  />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
};
