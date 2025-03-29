"use client";

import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";
import axios from "axios";

import { Container } from "@/components/common/container";
import { Heading } from "@/components/common/heading";
import { SafeReservation, SafeUser } from "@/types";
import toast from "react-hot-toast";
import { ListingCard } from "@/components/listings/listing-card";

interface TripsListProps {
  reservations: SafeReservation[];
  currentUser: SafeUser | null;
}

export const TripsList: React.FC<TripsListProps> = ({
  reservations,
  currentUser,
}) => {
  const router = useRouter();
  const [deletingId, setDeletingId] = useState<string>("");

  const onCancelTrip = useCallback(
    (id: string) => {
      setDeletingId(id);

      axios
        .delete(`/api/reservations/${id}`)
        .then(() => {
          toast.success("Reservation Canceled");
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
      <Heading
        title="Trips"
        subTitle="Where you've been and where you're going"
      />

      <div
        className="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4
        xl:grid-cols-5 2xl:grid-cols-6 gap-8"
      >
        {reservations.map((reservation) => (
          <ListingCard
            key={reservation.id}
            data={reservation.listing}
            reservation={reservation}
            actionId={reservation.id}
            onAction={onCancelTrip}
            disabled={deletingId === reservation.id}
            actionLabel={"Cancel reservation"}
            currentUser={currentUser}
          />
        ))}
      </div>
    </Container>
  );
};
