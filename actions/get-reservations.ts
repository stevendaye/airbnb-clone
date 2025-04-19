import prisma from "@/lib/prismadb";

interface IParans {
  listingId?: string;
  userId?: string;
  authorId?: string;
}

export default async function getReservations(params: IParans) {
  try {
    const { listingId, userId, authorId } = params;

    const query: any = {};

    // Reservations listed on a listing
    if (listingId) {
      query.listingId = listingId;
    }

    // Trips made by connected user
    if (userId) {
      query.userId = userId;
    }

    // Reservation made by other users
    if (authorId) {
      query.listing = { userId: authorId };
    }

    const reservations = await prisma.reservation.findMany({
      where: query,
      include: {
        listing: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    const safeReservations = reservations.map((reservation) => ({
      ...reservation,
      createdAt: reservation.createdAt.toISOString(),
      startDate: reservation.startDate.toISOString(),
      endDate: reservation.endDate.toISOString(),
      listing: {
        ...reservation.listing,
        createdAt: reservation.listing.createdAt.toISOString(),
      },
    }));

    return safeReservations;
  } catch (error: any) {
    throw new Error(error);
  }
}
