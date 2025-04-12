"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { eachDayOfInterval, differenceInCalendarDays } from "date-fns";
import { useRouter } from "next/navigation";
import { Range } from "react-date-range";
import toast from "react-hot-toast";
import axios from "axios";

import { ListingReservation } from "@/components/listings/listing-reservation";
import { ListingBody } from "@/components/listings/listing-body";
import { ListingHead } from "@/components/listings/listing-head";
import { Container } from "@/components/common/container";
import { SafeListing, SafeReservation, SafeUser } from "@/types";
import { amenities, categories } from "@/utils";

import useLoginModal from "@/hooks/use-login-modal";
import useCountries from "@/hooks/use-countries";
import useListingLocation from "@/hooks/use-listing-location";

interface ListingDetailProps {
  reservations?: SafeReservation[];
  listing: SafeListing & {
    user: SafeUser;
  };
  currentUser?: SafeUser | null;
}

const initialDateRange = {
  startDate: new Date(),
  endDate: new Date(),
  key: "selection",
};

export const ListingDetail: React.FC<ListingDetailProps> = ({
  listing,
  currentUser,
  reservations = [],
}) => {
  const { onSetLocation } = useListingLocation();
  const loginModal = useLoginModal();
  const router = useRouter();

  // Disabled Already Reserved Dates
  const disabledDates = useMemo(() => {
    let dates: Date[] = [];

    reservations.forEach((reservation) => {
      const range = eachDayOfInterval({
        start: new Date(reservation.startDate),
        end: new Date(reservation.endDate),
      });

      dates = [...dates, ...range];
    });

    return dates;
  }, [reservations]);

  const { getByValue } = useCountries();

  const [isMounted, setIsMounted] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [totalPrice, setTotalPrice] = useState<number>(listing.price);
  const [dateRange, setDateRange] = useState<Range>(initialDateRange);

  const country = getByValue(listing.locationValue)?.label;
  const region = getByValue(listing.locationValue)?.region;

  // Create Reservations
  const onCreateReservation = useCallback(() => {
    if (!currentUser) return loginModal.onOpen();

    setIsLoading(true);

    axios
      .post("/api/reservations", {
        totalPrice,
        startDate: dateRange.startDate,
        endDate: dateRange.endDate,
        listingId: listing?.id,
      })
      .then(() => {
        toast.success("Listing Reserved");
        setDateRange(initialDateRange);
        router.push("/trips");
      })
      .catch(() => {
        toast.error("Something went wrong");
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [totalPrice, dateRange, currentUser, loginModal, listing?.id, router]);

  const category = useMemo(() => {
    return categories.find((category) => category.label === listing.category);
  }, [listing.category]);

  const propertyAmenities = useMemo(() => {
    return amenities.filter((amenity) =>
      listing.amenities.includes(amenity.label)
    );
  }, [listing.amenities, amenities]);

  // Calculate Reservations Total Price
  useEffect(() => {
    if (dateRange.startDate && dateRange.endDate) {
      const daysCount = differenceInCalendarDays(
        dateRange.endDate,
        dateRange.startDate
      );

      if (daysCount && listing.price) {
        return setTotalPrice(daysCount * listing.price);
      }

      return setTotalPrice(listing.price);
    }
  }, [dateRange, listing.price]);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (!isMounted || !region || !country || !category) return;

    onSetLocation({
      category: category.label,
      country,
      region,
    });
  }, [isMounted, country, region, category?.label]);

  return (
    <Container>
      <div className="max-w-screen-lg mx-auto">
        <div className="flex flex-col gap-6">
          <ListingHead
            title={listing.title}
            imagesSrc={listing.imagesSrc}
            locationValue={listing.locationValue}
            id={listing.id}
            currentUser={currentUser}
          />

          <div className="grid grid-cols-1 md:grid-cols-7 md:gap-10 mt-6">
            <ListingBody
              user={listing.user}
              category={category}
              propertyAmenities={propertyAmenities}
              description={listing.description}
              roomCount={listing.roomCount}
              guestCount={listing.guestCount}
              bathroomCount={listing.bathroomCount}
              locationValue={listing.locationValue}
            />

            <div className="order-first md:order-last md:col-span-3 mb-10">
              <ListingReservation
                price={listing.price}
                totalPrice={totalPrice}
                dateRange={dateRange}
                disabled={isLoading}
                disabledDates={disabledDates}
                onChangeDate={(value) => setDateRange(value)}
                onSubmit={onCreateReservation}
              />
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
};
