import getCurrentUser from "@/actions/get-current-user";
import getListings, { IListingsParams } from "@/actions/get-listings";

import { Container } from "@/components/common/container";
import { NoListing } from "@/components/common/no-listing";
import { ListingCard } from "@/components/listings/listing-card";

type SearchParams = { [key: string]: string | string[] | undefined };

function parseSearchParams(searchParams: SearchParams): IListingsParams {
  return {
    userId: searchParams.userId as string,
    guestCount: searchParams.guestCount
      ? parseInt(searchParams.guestCount as string)
      : undefined,
    roomCount: searchParams.roomCount
      ? parseInt(searchParams.roomCount as string)
      : undefined,
    bathroomCount: searchParams.bathroomCount
      ? parseInt(searchParams.bathroomCount as string)
      : undefined,
    startDate: searchParams.startDate as string,
    endDate: searchParams.endDate as string,
    location: searchParams.location as string,
    category: searchParams.category as string,
  };
}

const MainPage = async ({
  searchParams = {},
}: {
  searchParams?: SearchParams;
}) => {
  const parsedParams = parseSearchParams(searchParams);

  const currentUser = await getCurrentUser();
  const listings = await getListings(parsedParams);

  if (listings.length === 0) {
    return <NoListing showReset />;
  }

  return (
    <Container>
      <div
        className="pt-24 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4
        xl:grid-cols-5 2xl:grid-cols-6 gap-8"
      >
        {listings.map((listing) => (
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
