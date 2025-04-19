import { NextResponse } from "next/server";

import prisma from "@/lib/prismadb";
import getCurrentUser from "@/actions/get-current-user";

interface IParams {
  params: Promise<{
    listingId: string;
  }>;
}

export async function DELETE(req: Request, { params }: IParams) {
  const currentUser = await getCurrentUser();

  if (!currentUser) return NextResponse.error();

  const { listingId } = await params;

  if (!listingId || typeof listingId !== "string")
    throw new Error("Invalid Listing ID");

  const listing = await prisma.listing.deleteMany({
    where: {
      id: listingId,
      userId: currentUser.id,
    },
  });

  return NextResponse.json(listing);
}
