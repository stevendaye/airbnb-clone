import { NextResponse } from "next/server";
import prisma from "@/lib/prismadb";
import { z } from "zod";

import getCurrentUser from "@/actions/get-current-user";

const listingSchema = z.object({
  title: z.string().min(3, "The title must be at least 3 characters long"),
  description: z
    .string()
    .min(10, "Your place description must be at least 10 characters long"),
  imagesSrc: z
    .array(z.string())
    .min(3, "You must upload at least 3 images of your place"),
  category: z
    .string()
    .min(1, "The category in which your place falls is required"),
  amenities: z
    .array(z.string())
    .min(2, "Your place must offer at least two amenities"),
  roomCount: z
    .number()
    .int()
    .positive("The number of room must be a positive number"),
  bathroomCount: z
    .number()
    .int()
    .positive("The number of bathroom must be a positive number"),
  guestCount: z
    .number()
    .int()
    .positive("The number of guest must be a positive number"),
  locationValue: z.object({
    value: z.string().min(1, "The Location of this place is required"),
  }),
  price: z.string().refine((val) => !isNaN(parseInt(val, 10)), {
    message: "The price must be a valid number",
  }),
});

export async function POST(req: Request) {
  try {
    const currentUser = await getCurrentUser();
    if (!currentUser) return NextResponse.error();

    const body = await req.json();

    const parsedData = listingSchema.parse(body);

    const listing = await prisma.listing.create({
      data: {
        title: parsedData.title,
        description: parsedData.description,
        imagesSrc: parsedData.imagesSrc,
        category: parsedData.category,
        amenities: parsedData.amenities,
        roomCount: parsedData.roomCount,
        bathroomCount: parsedData.bathroomCount,
        guestCount: parsedData.guestCount,
        locationValue: parsedData.locationValue.value,
        price: parseInt(parsedData.price, 10),
        userId: currentUser.id,
      },
    });

    return NextResponse.json(listing);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { message: "Invalid input", errors: error.errors },
        { status: 400 }
      );
    }
    return NextResponse.json(
      { message: "Something went wrong" },
      { status: 500 }
    );
  }
}
