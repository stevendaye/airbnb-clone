import getCurrentUser from "@/actions/getCurrentUer";

import { NoListing } from "@/components/common/no-listing";
import { FavouritesList } from "./favourites-list";
import getFavouriteListings from "@/actions/getFavouriteListings";

const FavouritesPage = async () => {
  const favourites = await getFavouriteListings();
  const currentUser = await getCurrentUser();

  if (!currentUser)
    return (
      <NoListing title="You are not authorized" subTitle="Please log in" />
    );

  if (favourites.length === 0)
    return (
      <NoListing
        title="No favourites found"
        subTitle="Looks like you have not liked any properties yet"
      />
    );

  return <FavouritesList currentUser={currentUser} favourites={favourites} />;
};

export default FavouritesPage;
