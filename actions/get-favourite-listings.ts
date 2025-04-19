import prisma from "@/lib/prismadb";

import getCurrentUser from "./get-current-user";

export default async function getFavouriteListings() {
  try {
    const currentUser = await getCurrentUser();

    if (!currentUser) return [];

    const favourites = await prisma.listing.findMany({
      where: {
        id: {
          in: [...(currentUser.favouriteIds || [])],
        },
      },
    });

    const safeFavourites = favourites.map(
      (favourite: { createdAt: { toISOString: () => any } }) => ({
        ...favourite,
        createdAt: favourite.createdAt.toISOString(),
      })
    );

    return safeFavourites;
  } catch (error: any) {
    throw new Error(error);
  }
}
