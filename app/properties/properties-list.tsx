"use client";

import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";
import axios from "axios";

import { Container } from "@/components/common/container";
import { Heading } from "@/components/common/heading";
import { SafeListing, SafeUser } from "@/types";
import toast from "react-hot-toast";
import { ListingCard } from "@/components/listings/listing-card";

interface PropertiesListProps {
  listings: SafeListing[];
  currentUser: SafeUser | null;
}

export const PropertiesList: React.FC<PropertiesListProps> = ({
  listings,
  currentUser,
}) => {
  const router = useRouter();
  const [deletingId, setDeletingId] = useState<string>("");

  const onRemoveListing = useCallback(
    (id: string) => {
      setDeletingId(id);

      axios
        .delete(`/api/listings/${id}`)
        .then(() => {
          toast.success("Listing Removed");
          router.refresh();
        })
        .catch((error) => {
          toast.error(error?.response?.data?.error);
        })
        .finally(() => {
          setDeletingId("");
        });
    },
    [router]
  );

  return (
    <Container>
      <Heading title="Properties" subTitle="Listing of your properties" />

      <div
        className="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4
        xl:grid-cols-5 2xl:grid-cols-6 gap-8"
      >
        {listings.map((listing) => (
          <ListingCard
            key={listing.id}
            data={listing}
            actionId={listing.id}
            onAction={onRemoveListing}
            disabled={deletingId === listing.id}
            actionLabel={"Remove property"}
            currentUser={currentUser}
          />
        ))}
      </div>
    </Container>
  );
};
