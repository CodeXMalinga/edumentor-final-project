import { NextResponse } from "next/server";

import getCurrentUser from "@/app/actions/getCurrentUser";
import prisma from "@/app/libs/prismadb";

interface IParams {
  reservationId?: string;
  rstatus?: string;
}

export async function PUT(
  request: Request,
  { params }: { params: IParams}
){
  const currentUser = await getCurrentUser();

  const body = await request.json();
  const { 
    rstatus,
   } = body;

  if (!currentUser) {
    return NextResponse.error();
  }

  const { reservationId } = params;

  console.log("reservation ID " + reservationId, "Rstatus " + rstatus);

  if (!reservationId || typeof reservationId !== 'string') {
    throw new Error('Invalid ID');
  }

  const reservationupdated = await prisma.reservation.update({
    where: {
      id: reservationId,
    },
    data: {
      rstatus: rstatus,
    }
  });

  return NextResponse.json(reservationupdated);
}

export async function DELETE(
  request: Request, 
  { params }: { params: IParams }
) {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return NextResponse.error();
  }

  const { reservationId } = params;

  if (!reservationId || typeof reservationId !== 'string') {
    throw new Error('Invalid ID');
  }

  const reservation = await prisma.reservation.deleteMany({
    where: {
      id: reservationId,
      OR: [
        { userId: currentUser.id },
        { listing: { userId: currentUser.id } }
      ]
    }
  });


  return NextResponse.json(reservation);
}