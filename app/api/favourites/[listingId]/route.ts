import { NextResponse } from "next/server";

import getCurrentUser from "@/actions/get-current-user";
import prisma from "@/lib/prismadb";

interface IParams {
  listingId: string;
}

export async function POST(req: Request, { params }: { params: IParams }) {
  const currentUser = await getCurrentUser();

  if (!currentUser) return NextResponse.error();

  const { listingId } = await params;

  if (!listingId || typeof listingId !== "string")
    throw new Error("Invalid Listing ID");

  let favouriteIds = [...(currentUser.favouriteIds || [])];

  favouriteIds.push(listingId);

  const user = await prisma.user.update({
    where: {
      id: currentUser.id,
    },
    data: {
      favouriteIds,
    },
  });

  return NextResponse.json(user);
}

export async function DELETE(req: Request, { params }: { params: IParams }) {
  const currentUser = await getCurrentUser();

  if (!currentUser) return NextResponse.error();

  const { listingId } = await params;

  if (!listingId || typeof listingId !== "string")
    throw new Error("Invalid Listing ID");

  let favouriteIds = [...(currentUser.favouriteIds || [])];

  favouriteIds = favouriteIds.filter((id) => id !== listingId);

  const user = await prisma.user.update({
    where: {
      id: currentUser.id,
    },
    data: {
      favouriteIds,
    },
  });

  return NextResponse.json(user);
}
