import getCurrentUser from "@/actions/get-current-user";
import getListings from "@/actions/get-listings";
import { NoListing } from "@/components/common/no-listing";
import { PropertiesList } from "./properties-list";

const PropertiesPage = async () => {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return (
      <NoListing
        title="You are not authorized"
        subTitle="Please login to see this properties"
      />
    );
  }

  const listings = await getListings({ userId: currentUser.id });

  if (listings.length === 0)
    return (
      <NoListing
        title="No properties found"
        subTitle="Looks like you have not listed any properties yet"
      />
    );

  return <PropertiesList listings={listings} currentUser={currentUser} />;
};

export default PropertiesPage;
