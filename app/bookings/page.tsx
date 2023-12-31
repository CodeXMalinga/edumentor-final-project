import EmptyState from "@/app/components/EmptyState";
import ClientOnly from "@/app/components/ClientOnly";

import getCurrentUser from "@/app/actions/getCurrentUser";
import getReservations from "@/app/actions/getReservations";

import BookingsClient from "./BookingsClient";

const BookingPage = async () => {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return (
      <ClientOnly>
        <EmptyState title="Unauthorized" subtitle="Please login" />
      </ClientOnly>
    );
  }

  const reservations = await getReservations({
    userId: currentUser.id,
    rstatus: "Pending",
  });

  if (reservations.length === 0) {
    return (
      <ClientOnly>
        <EmptyState
          title="No subjects found"
          subtitle="Looks like you havent booked any subjects."
        />
      </ClientOnly>
    );
  }

  return (
    <ClientOnly>
      <BookingsClient reservations={reservations} currentUser={currentUser} />
    </ClientOnly>
  );
};

export default BookingPage;
