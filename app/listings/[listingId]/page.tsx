import getCurrentUser from "@/actions/get-current-user";
import getListingById from "@/actions/get-listing-by-id";
import { NoListing } from "@/components/common/no-listing";
import { ListingDetail } from "@/app/listings/[listingId]/listing-detail";
import getReservations from "@/actions/get-reservations";

interface ListingDetailPageProps {
  params: Promise<{
    listingId?: string;
  }>;
}

const ListingDetailPage = async ({ params }: ListingDetailPageProps) => {
  const resolvedParams = await params;

  const currentUser = await getCurrentUser();

  const listing = await getListingById(resolvedParams);
  const reservations = await getReservations(resolvedParams);

  if (!listing) return <NoListing />;

  return (
    <ListingDetail
      listing={listing}
      currentUser={currentUser}
      reservations={reservations}
    />
  );
};

export default ListingDetailPage;
