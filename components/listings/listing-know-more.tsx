"use client";

import { PiHouseLineLight } from "react-icons/pi";
import { AiOutlineSafety } from "react-icons/ai";
import { FcCancel } from "react-icons/fc";

interface ListingKnowMoreProps {
  guestCount: number;
}

export const ListingKnowMore: React.FC<ListingKnowMoreProps> = ({
  guestCount,
}) => {
  return (
    <div className="flex flex-col gap-5">
      <h1 className="text-xl font-bold">Things to know</h1>

      <div className="flex flex-col gap-6 text-sm text-neutral-700">
        <div className="flex flex-col gap-3">
          <h3 className="flex items-center gap-2 text-lg font-bold">
            <PiHouseLineLight size="20" />
            House rules
          </h3>
          <p className="font-medium">Check-in: Anytime</p>
          <p className="font-medium">Check-out: Before 11AM</p>
          <p>{guestCount} guests maximum</p>
        </div>

        <div className="flex flex-col gap-3">
          <h3 className="flex items-center gap-2 text-lg font-bold">
            <AiOutlineSafety size="20" />
            Safety & property
          </h3>
          <p className="font-medium"> Carbon monoxide alarm not reported </p>
          <p className="font-medium"> Smoke alarm </p>
        </div>

        <div className="flex flex-col gap-3">
          <h3 className="flex items-center gap-2 text-lg font-bold">
            <FcCancel size="20" />
            Cancellation policy
          </h3>
          <p className="font-medium">
            Free cancellation for 72 hours. Cancel before check-in date for a
            partial refund
          </p>
          <p className="font-medium">
            Review this Host&apos;s full policy for details
          </p>
        </div>
      </div>
    </div>
  );
};
