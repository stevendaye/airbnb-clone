import { NextResponse } from "next/server";
import prisma from "@/app/libs/prismadb";
import { z } from "zod";

import getCurrentUser from "@/app/actions/getCurrentUer";

const listingSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters"),
  description: z.string().min(10, "Description must be at least 10 characters"),
  imageSrc: z.string().url("A valid image must be provided"),
  category: z.string().min(1, "Category is required"),
  roomCount: z.number().int().positive("Room count must be a positive number"),
  bathroomCount: z
    .number()
    .int()
    .positive("Bathroom count must be a positive number"),
  guestCount: z
    .number()
    .int()
    .positive("Guest count must be a positive number"),
  location: z.object({
    value: z.string().min(1, "Location value is required"),
  }),
  price: z.string().refine((val) => !isNaN(parseInt(val, 10)), {
    message: "Price must be a valid number",
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
        imageSrc: parsedData.imageSrc,
        category: parsedData.category,
        roomCount: parsedData.roomCount,
        bathroomCount: parsedData.bathroomCount,
        guessCount: parsedData.guestCount,
        locationValue: parsedData.location.value,
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
