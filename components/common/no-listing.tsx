"use client";

import { useRouter } from "next/navigation";
import { Heading } from "./heading";
import { Button } from "./button";

interface NoListingProps {
  title?: string;
  subTitle?: string;
  showReset?: boolean;
}

export const NoListing: React.FC<NoListingProps> = ({
  title = "No exact matches",
  subTitle = "Try changing or removing some of your filters",
  showReset,
}) => {
  const router = useRouter();

  return (
    <div className="h-[60vh] flex flex-col gap-2 justify-center items-center">
      <Heading center title={title} subTitle={subTitle} />
      <div className="w-48 mt-4">
        {showReset && (
          <Button
            outline
            label="Remove all filters"
            onClick={() => router.push("/")}
          />
        )}
      </div>
    </div>
  );
};
