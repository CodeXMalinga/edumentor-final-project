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

      query.subject = subject;
    }


    if(subject === undefined && category === undefined){
      await prisma.listing.findMany();
    }


    const listings = await prisma.listing.findMany({
      where: {
        AND: [
          {
            subject: {
              contains: query.subject,
              mode: 'insensitive'
            }
          },
          {
            category: query.category
          }
        ]
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