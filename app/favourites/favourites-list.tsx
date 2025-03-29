"use client";

import { Container } from "@/components/common/container";
import { Heading } from "@/components/common/heading";
import { SafeListing, SafeUser } from "@/types";
import { ListingCard } from "@/components/listings/listing-card";

interface FavouritesListProps {
  favourites: SafeListing[];
  currentUser: SafeUser | null;
}

export const FavouritesList: React.FC<FavouritesListProps> = ({
  favourites,
  currentUser,
}) => {
  return (
    <Container>
      <Heading title="Favourites" subTitle="List of places you've liked" />

      <div
        className="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4
        xl:grid-cols-5 2xl:grid-cols-6 gap-8"
      >
        {favourites.map((favourite) => (
          <ListingCard
            key={favourite.id}
            data={favourite}
            currentUser={currentUser}
          />
        ))}
      </div>
    </Container>
  );
};
