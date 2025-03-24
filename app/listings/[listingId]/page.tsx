import getCurrentUser from "@/actions/getCurrentUer";
import getListingById from "@/actions/getListingById";
import { NoListing } from "@/components/common/no-listing";
import { ListingDetail } from "@/app/listings/[listingId]/listing-detail";
import getReservations from "@/actions/getReservations";

interface IParams {
  listingId?: string;
}

const ListingDetailPage = async ({ params }: { params: IParams }) => {
  const listing = await getListingById(params);
  const currentUser = await getCurrentUser();
  const reservations = await getReservations(params);

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
