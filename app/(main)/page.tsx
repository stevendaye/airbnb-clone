import getCurrentUser from "@/actions/get-current-user";
import getListings, { IListingsParams } from "@/actions/get-listings";

import { Container } from "@/components/common/container";
import { NoListing } from "@/components/common/no-listing";
import { ListingCard } from "@/components/listings/listing-card";

interface MainProps {
  searchParams: IListingsParams;
}

const MainPage = async ({ searchParams }: MainProps) => {
  const currentUser = await getCurrentUser();
  const listings = await getListings(searchParams);

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
