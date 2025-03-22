import getCurrentUser from "@/actions/getCurrentUer";
import getListings from "@/actions/getListings";

import { Container } from "@/components/common/container";
import { NoListings } from "@/components/common/no-listings";
import { ListingCard } from "@/components/listings/listing-card";

const MainLayout = async () => {
  const currentUser = await getCurrentUser();
  const listings = await getListings();

  if (listings.length === 0) {
    return <NoListings showReset />;
  }

  return (
    <Container>
      <div
        className="pt-24 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4
        xl:grid-cols-5 2xl:grid-cols-6 gap-8"
      >
        {listings.map((item) => (
          <ListingCard key={item.id} currentUser={currentUser} data={item} />
        ))}
      </div>
    </Container>
  );
};

export default MainLayout;
