"use client";

import { useCallback } from "react";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";

interface CounterProps {
  title: string;
  subTitle: string;
  value: number;
  onChange: (value: number) => void;
}

export const Counter: React.FC<CounterProps> = ({
  title,
  subTitle,
  value,
  onChange,
}) => {
  const onAdd = useCallback(() => {
    onChange(value + 1);
  }, [value, onChange]);

  const onReduce = useCallback(() => {
    if (value === 1) return;

    onChange(value - 1);
  }, [value, onChange]);

  return (
    <div className="flex items-center justify-between ">
      <div className="flex flex-col">
        <div className="font-medium">{title}</div>
        <div className="font-light text-gray-600">{subTitle}</div>
      </div>

      <div className="flex items-center gap-4">
        <div
          role="button"
          tabIndex={0}
          onKeyDown={onReduce}
          onClick={onReduce}
          className="flex items-center justify-center size-10 rounded-full border border-neutral-400
          text-neutral-600 cursor-pointer hover:opacity-80 transition"
        >
          <AiOutlineMinus />
        </div>

        <div className="font-light text-xl text-neutral-600">{value}</div>

        <div
          role="button"
          tabIndex={0}
          onKeyDown={onAdd}
          onClick={onAdd}
          className="flex items-center justify-center size-10 rounded-full border border-neutral-400
          text-neutral-600 cursor-pointer hover:opacity-80 transition"
        >
          <AiOutlinePlus />
        </div>
      </div>
    </div>
  );
};
