import { NextResponse } from "next/server";

import prisma from "@/lib/prismadb";
import getCurrentUser from "@/actions/get-current-user";

export async function POST(req: Request) {
  const currentUser = await getCurrentUser();

  if (!currentUser) return NextResponse.error();

  const body = await req.json();

  const { listingId, totalPrice, startDate, endDate } = body;

  if (!listingId || !totalPrice || !startDate || !endDate)
    return NextResponse.error();

  const listingWithReservations = await prisma.listing.update({
    where: {
      id: listingId,
    },
    data: {
      reservations: {
        create: {
          userId: currentUser.id,
          totalPrice,
          startDate,
          endDate,
          createdAt: new Date(),
        },
      },
    },
  });

  return NextResponse.json(listingWithReservations);
}
