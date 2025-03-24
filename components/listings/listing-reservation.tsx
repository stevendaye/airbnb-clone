"use client";

import { Range } from "react-date-range";
import { Calendar } from "../inputs/calendar";
import { Button } from "../common/button";

interface ListingReservationProps {
  price: number;
  totalPrice: number;
  dateRange: Range;
  disabled?: boolean;
  disabledDates: Date[];
  onChangeDate: (value: Range) => void;
  onSubmit: () => void;
}

export const ListingReservation: React.FC<ListingReservationProps> = ({
  price,
  totalPrice,
  dateRange,
  disabled,
  disabledDates,
  onChangeDate,
  onSubmit,
}) => {
  return (
    <div className="bg-white rounded-xl border border-neutral-200 overflow-hidden">
      <div className="flex items-center gap-1 p-4">
        <div className="text-2xl font-semibold">$ {price}</div>
        <div className="font-light text-neutral-600">night</div>
      </div>
      <hr />

      <Calendar
        value={dateRange}
        disabledDates={disabledDates}
        onChange={(value) => onChangeDate(value.selection)}
      />

      <hr />
      <div className="p-4">
        <Button label="reserve" disabled={disabled} onClick={onSubmit} />
      </div>

      <div className="flex items-center justify-between p-4 text-lg">
        <span className="font-semibold">Total</span>
        <span className="font-semibold">$ {totalPrice}</span>
      </div>
    </div>
  );
};
