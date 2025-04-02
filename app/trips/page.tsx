import getCurrentUser from "@/actions/get-current-user";
import getReservations from "@/actions/get-reservations";
import { NoListing } from "@/components/common/no-listing";
import { TripsList } from "./trips-list";

const TripsPage = async () => {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return (
      <NoListing
        title="You are not authorized"
        subTitle="Please login to see this trip"
      />
    );
  }

  const reservations = await getReservations({ userId: currentUser.id });

  if (reservations.length === 0)
    return (
      <NoListing
        title="No trips found"
        subTitle="Looks like you have not reserved any trips yet"
      />
    );

  return <TripsList reservations={reservations} currentUser={currentUser} />;
};

export default TripsPage;
