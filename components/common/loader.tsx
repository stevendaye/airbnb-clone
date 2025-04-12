"use client";

import { PuffLoader } from "react-spinners";

export const Loader = () => {
  return (
    <div className="flex flex-col items-center justify-center h-[70vh]">
      <PuffLoader size="100px" color="red" />
    </div>
  );
};
