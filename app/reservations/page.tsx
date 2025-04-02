import getCurrentUser from "@/actions/get-current-user";
import getReservations from "@/actions/get-reservations";
import { NoListing } from "@/components/common/no-listing";
import { ReservationsList } from "./reservations-list";

const ReservationPage = async () => {
  const currentUser = await getCurrentUser();

  if (!currentUser)
    return (
      <NoListing title="You are not authorized" subTitle="Please log in" />
    );

  // Showing to the property owner reservations made by users
  const reservations = await getReservations({
    authorId: currentUser.id,
  });

  if (reservations.length === 0)
    return (
      <NoListing
        title="No reservations found"
        subTitle="Looks like you have no reservations yet on your properties"
      />
    );

  return (
    <ReservationsList currentUser={currentUser} reservations={reservations} />
  );
};

export default ReservationPage;
