import prisma from "@/app/libs/prismadb";

interface IParams {
  listingId?: string | null | undefined;
  userId?: string | null | undefined;
  authorId?: string | null | undefined;
  rstatus?: string;
}

export default async function getReservations(
  params: IParams
) {
  try {
    const { listingId, userId, authorId, rstatus } = params;

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

    if(rstatus) {
      query.rstatus = rstatus;
    } else{
      query.rstatus = "Pending";
    }

    //query.rstatus = "Pending";

    const reservations = await prisma.reservation.findMany({
      where: query,
      include: {
        listing: true
      },
      orderBy: {
        createdAt: 'desc'
      }
    });

    const safeReservations = reservations.map(
      (reservation) => ({
      ...reservation,
      createdAt: reservation.createdAt.toISOString(),
      startDate: reservation.startDate.toISOString(),
      endDate: reservation.endDate.toISOString(),
      listing: {
        ...reservation.listing,
        createdAt: reservation.listing.createdAt.toISOString(),
      },
      rstatus: reservation.rstatus,
    }));

    return safeReservations;
  } catch (error: any) {
    throw new Error(error);
  }
}