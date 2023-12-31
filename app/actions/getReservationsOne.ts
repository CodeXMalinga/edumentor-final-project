import prisma from "@/app/libs/prismadb";

interface IParams {
  listingId?: string;
  userId?: string;
  authorId?: string;
}

export default async function getReservations(
  params: IParams
) {
  try {
    const { listingId, userId, authorId } = params;

    const query: any = {};
        
    if (listingId) {
      query.listingId = listingId;
    };

    if (userId) {
      query.userId = userId;
    }

    if (authorId) {
      query.listing = { userId: authorId };
    }

    const reservation = await prisma.reservation.findFirst({
      where: query,
      include: {
        user: true,
        listing: true,
      },
    });

    const safeReservations = (
      {
      ...reservation,
      createdAt: reservation?.createdAt.toISOString(),
      startDate: reservation?.startDate.toISOString(),
      endDate: reservation?.endDate.toISOString(),
      listing: {
        ...reservation?.listing,
        createdAt: reservation?.listing.createdAt.toISOString(),
      },
      rstatus: reservation?.rstatus,
    });

    return safeReservations;
  } catch (error: any) {
    throw new Error(error);
  }
}