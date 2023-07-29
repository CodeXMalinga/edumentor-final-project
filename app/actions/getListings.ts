import prisma from "@/app/libs/prismadb";

export interface IListingsParams {
  userId?: string;
  guestCount?: number;
  roomCount?: number;
  bathroomCount?: number;
  startDate?: string;
  endDate?: string;
  locationValue?: string;
  category?: string;
  subject?: string;
}

export default async function getListings(
  params: IListingsParams
) {
  try {
    const {
      userId,
      category,
      subject,
    } = params;

    let query: any = {};

    if (userId) {
      query.userId = userId;
    }

    if (category) {
      query.category = category;
    }

    let newSubject;

    if (subject) {
      if (subject.at(0) === '"' && subject.at(-1) === '"') {
        newSubject = subject.slice(1, -1);
      }
    }

    const listings = await prisma.listing.findMany({
      where: {
        title: {
          contains: newSubject,
          mode: 'insensitive'
        }
      },
      orderBy: {
        createdAt: 'desc'
      }
    });

    // const listings = await prisma.listing.findMany({
    //   where: query,
    //   orderBy: {
    //     createdAt: 'desc'
    //   }
    // });

    const safeListings = listings.map((listing) => ({
      ...listing,
      createdAt: listing.createdAt.toISOString(),
    }));

    return safeListings;
  } catch (error: any) {
    throw new Error(error);
  }
}