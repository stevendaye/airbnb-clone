"use client";

import { useMemo, useState } from "react";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";

import axios from "axios";
import toast from "react-hot-toast";

import useRentModal from "@/hooks/use-rent-modal";

import { Modal } from "./modal";
import { Heading } from "../common/heading";
import { categories, amenities } from "@/utils";
import { CategoryInput } from "../inputs/category-input";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { CountrySelect } from "../inputs/country-select";
import { Counter } from "../inputs/counter";
import { ImpageUpload } from "../common/impage-upload";
import { Input } from "../inputs/input";
import { AmenityInput } from "../inputs/amenity";

/* eslint-disable  @typescript-eslint/no-explicit-any */

enum STEPS {
  CATEGORY = 0,
  AMENITIES = 1,
  LOCATION = 2,
  INFO = 3,
  IMAGES = 4,
  DESCRIPTION = 5,
  PRICE = 6,
}

export const RentModal = () => {
  const router = useRouter();

  const [step, setStep] = useState<number>(STEPS.CATEGORY);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const {
    register,
    setValue,
    watch,
    reset,
    formState: { errors },
    handleSubmit,
  } = useForm<FieldValues>({
    defaultValues: {
      category: "",
      amenities: [],
      locationValue: null,
      guestCount: 1,
      roomCount: 1,
      bathroomCount: 1,
      imagesSrc: [],
      price: 1,
      title: "",
      description: "",
    },
  });

  const amenitiesValues = watch("amenities");
  const category = watch("category");
  const locationValue = watch("locationValue");
  const guestCount = watch("guestCount");
  const roomCount = watch("roomCount");
  const bathroomCount = watch("bathroomCount");
  const imagesSrc = watch("imagesSrc");

  const MapLocation = useMemo(
    () => dynamic(() => import("../common/map-location"), { ssr: false }),
    []
  );

  const setCustomValue = (id: string, value: any) => {
    setValue(id, value, {
      shouldValidate: true,
      shouldTouch: true,
      shouldDirty: true,
    });
  };

  const onStepBackward = () => {
    setStep((prevValue) => prevValue - 1);
  };

  const onStepForward = () => {
    setStep((prevValue) => prevValue + 1);
  };

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    if (step !== STEPS.PRICE) {
      return onStepForward();
    }

    setIsLoading(true);
    axios
      .post("/api/listings", data)
      .then(() => {
        toast.success("Listing Created!");
        router.refresh();
        reset();
        setStep(STEPS.CATEGORY);
        rentModal.onClose();
      })
      .catch((error) => {
        const validationErrors = error.response?.data?.errors;
        if (validationErrors) {
          return validationErrors.forEach((err: { message: string }) => {
            toast.error(err.message);
          });
        }

        toast.error("Something went wrong");
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const actionLabel = useMemo(() => {
    if (step === STEPS.PRICE) return "Create";

    return "Next";
  }, [step]);

  const secondaryActionLabel = useMemo(() => {
    if (step === STEPS.CATEGORY) return undefined;

    return "Back";
  }, [step]);

  const rentModal = useRentModal();
  let bodyContent;

  switch (step) {
    case STEPS.AMENITIES:
      bodyContent = (
        <div className="flex flex-col gap-8">
          <Heading
            title="What does your place offer?"
            subTitle="What utilities do your guests find in this property?"
          />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-h-[50vh] overflow-y-auto">
            {amenities.map((item) => (
              <div key={item.label} className="col-span-1">
                <AmenityInput
                  onClick={(amenities) =>
                    setCustomValue("amenities", amenities)
                  }
                  selected={amenitiesValues.includes(item.label)}
                  label={item.label}
                  icon={item.icon}
                  amenities={amenitiesValues}
                />
              </div>
            ))}
          </div>
        </div>
      );
      break;

    case STEPS.LOCATION:
      bodyContent = (
        <div className="flex flex-col gap-8">
          <Heading
            title="Where is your place loacted?"
            subTitle="Where do guests find you?"
          />
          <CountrySelect
            value={locationValue}
            onChange={(value) => setCustomValue("locationValue", value)}
          />
          <MapLocation center={locationValue?.latlng} />
        </div>
      );
      break;

    case STEPS.INFO:
      bodyContent = (
        <div className="flex flex-col gap-8">
          <Heading
            title="Share some basic info about your place"
            subTitle="What amenities doo you have?"
          />
          <Counter
            title="Guests"
            subTitle="How many guests do you allow"
            value={guestCount}
            onChange={(value) => setCustomValue("guestCount", value)}
          />
          <hr />
          <Counter
            title="Rooms"
            subTitle="How many rooms do you have"
            value={roomCount}
            onChange={(value) => setCustomValue("roomCount", value)}
          />
          <hr />
          <Counter
            title="Bathrooms"
            subTitle="How many bathrooms do you have"
            value={bathroomCount}
            onChange={(value) => setCustomValue("bathroomCount", value)}
          />
        </div>
      );
      break;

    case STEPS.IMAGES:
      bodyContent = (
        <div className="flex flex-col gap-8">
          <Heading
            title="Add a photo of your place"
            subTitle="Show guests what your place looks like!"
          />
          <ImpageUpload
            imagesSrc={imagesSrc}
            onChange={(srcs) => setCustomValue("imagesSrc", srcs)}
          />
        </div>
      );
      break;

    case STEPS.DESCRIPTION:
      bodyContent = (
        <div className="flex flex-col gap-8">
          <Heading
            title="How would you describe your place"
            subTitle="Keeping it short works best"
          />
          <Input
            id="title"
            label="title"
            disabled={isLoading}
            register={register}
            errors={errors}
            required
          />
          <Input
            id="description"
            label="Description"
            disabled={isLoading}
            register={register}
            errors={errors}
            required
          />
        </div>
      );
      break;

    case STEPS.PRICE:
      bodyContent = (
        <div className="flex flex-col gap-8">
          <Heading
            title="Now, set your price"
            subTitle="How much do you charge per night?"
          />
          <Input
            id="price"
            label="Price"
            type="number"
            formatPrice
            disabled={isLoading}
            register={register}
            errors={errors}
            required
          />
        </div>
      );
      break;

    default:
      bodyContent = (
        <div className="flex flex-col gap-8">
          <Heading
            title="Which of these best describe your place?"
            subTitle="Pick a category"
          />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-h-[50vh] overflow-y-auto">
            {categories.map((item) => (
              <div key={item.label} className="col-span-1">
                <CategoryInput
                  onClick={(category) => setCustomValue("category", category)}
                  selected={category === item.label}
                  label={item.label}
                  icon={item.icon}
                />
              </div>
            ))}
          </div>
        </div>
      );
      break;
  }

  return (
    <Modal
      isOpen={rentModal.isOpen}
      onClose={rentModal.onClose}
      onSubmit={handleSubmit(onSubmit)}
      actionLabel={actionLabel}
      secondaryActionLabel={secondaryActionLabel}
      secondaryAction={step === STEPS.CATEGORY ? undefined : onStepBackward}
      title="Airbnb your home"
      body={bodyContent}
    />
  );
};
