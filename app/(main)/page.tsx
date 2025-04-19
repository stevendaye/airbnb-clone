import getCurrentUser from "@/actions/get-current-user";
import getListings, { IListingsParams } from "@/actions/get-listings";

import { Container } from "@/components/common/container";
import { NoListing } from "@/components/common/no-listing";
import { ListingCard } from "@/components/listings/listing-card";
import { SafeListing } from "@/types";

interface MainProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

const MainPage = async ({ searchParams }: MainProps) => {
  const currentUser = await getCurrentUser();

  const resolvedSearchParams = await searchParams;

  const filters: IListingsParams = {
    userId: resolvedSearchParams.userId as string,
    guestCount: resolvedSearchParams.guestCount
      ? parseInt(resolvedSearchParams.guestCount as string)
      : undefined,
    roomCount: resolvedSearchParams.roomCount
      ? parseInt(resolvedSearchParams.roomCount as string)
      : undefined,
    bathroomCount: resolvedSearchParams.bathroomCount
      ? parseInt(resolvedSearchParams.bathroomCount as string)
      : undefined,
    startDate: resolvedSearchParams.startDate as string,
    endDate: resolvedSearchParams.endDate as string,
    location: resolvedSearchParams.location as string,
    category: resolvedSearchParams.category as string,
  };

  const listings = await getListings(filters);

  if (listings.length === 0) {
    return <NoListing showReset />;
  }

  return (
    <Container>
      <div
        className="pt-24 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4
        xl:grid-cols-5 2xl:grid-cols-6 gap-8"
      >
        {listings.map((listing: SafeListing) => (
          <ListingCard
            key={listing.id}
            currentUser={currentUser}
            data={listing}
          />
        ))}
      </div>
    </Container>
  );
};

export default MainPage;
