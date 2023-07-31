import prisma from "@/app/libs/prismadb";

export interface IListingsParams {
  userId?: string;
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
    } = params;

    let query: any = {};

    if (userId) {
      query.userId = userId;
    }

    console.log(`Query -> ${query}`);
    console.log(`userID -> ${userId}`);

    // const listings = await prisma.listing.findMany({
    //   where: {
    //     AND: [
    //       {
    //         subject: {
    //           contains: query.subject,
    //           mode: 'insensitive'
    //         }
    //       },
    //       {
    //         category: query.category
    //       }
    //     ]
    //   },
    //   orderBy: {
    //     createdAt: 'desc'
    //   }
    // });

    const listings = await prisma.listing.findMany({
      where: query,
      orderBy: {
        createdAt: 'desc'
      }
    });

    const safeListings = listings.map((listing) => ({
      ...listing,
      createdAt: listing.createdAt.toISOString(),
    }));

    return safeListings;
  } catch (error: any) {
    throw new Error(error);
  }
}