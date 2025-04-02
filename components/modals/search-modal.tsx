"use client";

import { useCallback, useMemo, useState } from "react";
import { Range } from "react-date-range";
import dynamic from "next/dynamic";
import qs from "query-string";
import { formatISO } from "date-fns";

import useSearchModal from "@/hooks/use-search-modal";
import { Modal } from "./modal";
import { useRouter, useSearchParams } from "next/navigation";
import { CountrySelect, CountrySelectValue } from "../inputs/country-select";

import { Heading } from "../common/heading";
import { Calendar } from "../inputs/calendar";
import { Counter } from "../inputs/counter";

enum STEPS {
  LOCATION = 0,
  DATE = 1,
  INFO = 2,
}

export const SearchModal = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const searchModal = useSearchModal();

  const [step, setStep] = useState<number>(STEPS.LOCATION);

  const [location, setLocation] = useState<CountrySelectValue>();
  const [roomCount, setRoomCount] = useState<number>(1);
  const [bathroomCount, setBathroomCount] = useState<number>(1);
  const [guestCount, setGuestCount] = useState<number>(1);
  const [dateRange, setDateRange] = useState<Range>({
    startDate: new Date(),
    endDate: new Date(),
    key: "selection",
  });

  const MapLocation = useMemo(
    () => dynamic(() => import("../common/map-location"), { ssr: false }),
    [location]
  );

  const onStepBackward = useCallback(() => {
    setStep((prevValue) => prevValue - 1);
  }, []);

  const onStepForward = useCallback(() => {
    setStep((prevValue) => prevValue + 1);
  }, []);

  const onSubmit = useCallback(async () => {
    if (step !== STEPS.INFO) return onStepForward();

    let currentQuery = {};

    if (searchParams) {
      currentQuery = qs.parse(searchParams.toString());
    }

    const updatedQuery: any = {
      ...currentQuery,
      location: location?.value,
      roomCount,
      guestCount,
      bathroomCount,
    };

    if (dateRange.startDate) {
      updatedQuery.startDate = formatISO(dateRange.startDate);
    }

    if (dateRange.endDate) {
      updatedQuery.endDate = formatISO(dateRange.endDate);
    }

    const url = qs.stringifyUrl({
      url: "/",
      query: updatedQuery,
    });

    setStep(STEPS.LOCATION);
    searchModal.onClose();
    router.push(url);
  }, [
    step,
    location,
    guestCount,
    roomCount,
    bathroomCount,
    dateRange,
    searchModal,
    onStepForward,
    searchParams,
    router,
  ]);

  const actionLabel = useMemo(() => {
    if (step === STEPS.INFO) {
      return "Search";
    }

    return "Next";
  }, [step]);

  const secondaryActionLabel = useMemo(() => {
    if (step === STEPS.INFO) {
      return undefined;
    }

    return "Back";
  }, []);

  let bodyContent;

  switch (step) {
    case STEPS.DATE:
      bodyContent = (
        <div className="flex flex-col gap-8">
          <Heading
            title="When do you want to go?"
            subTitle="Make sure evryone is free!"
          />
          <Calendar
            value={dateRange}
            onChange={(value) => setDateRange(value.selection)}
          />
        </div>
      );
      break;

    case STEPS.INFO:
      bodyContent = (
        <div className="flex flex-col gap-8">
          <Heading
            title="More information"
            subTitle="Find your perfect place!"
          />
          <Counter
            title="Guests"
            subTitle="How many guests are coming"
            value={guestCount}
            onChange={(value) => setGuestCount(value)}
          />
          <Counter
            title="Rooms"
            subTitle="How many rooms do you need?"
            value={roomCount}
            onChange={(value) => setRoomCount(value)}
          />
          <Counter
            title="Bathrooms"
            subTitle="How many bathrooms do you need?"
            value={bathroomCount}
            onChange={(value) => setBathroomCount(value)}
          />
        </div>
      );
      break;

    default:
      bodyContent = (
        <div className="flex flex-col gap-8">
          <Heading
            title="Where do you want to go?"
            subTitle="Find the perfect location!"
          />
          <CountrySelect
            value={location}
            onChange={(value) => setLocation(value)}
          />
          <hr />
          <MapLocation center={location?.latlng} />
        </div>
      );
      break;
  }

  return (
    <Modal
      isOpen={searchModal.isOpen}
      onClose={searchModal.onClose}
      onSubmit={onSubmit}
      title="Filters"
      body={bodyContent}
      actionLabel={actionLabel}
      secondaryActionLabel={secondaryActionLabel}
      secondaryAction={step === STEPS.LOCATION ? undefined : onStepBackward}
    />
  );
};
