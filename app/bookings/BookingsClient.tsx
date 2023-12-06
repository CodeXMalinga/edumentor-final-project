"use client";
import Head from "next/head";
import { toast } from "react-hot-toast";
import axios from "axios";
import { useCallback, useState } from "react";
import { useRouter } from "next/navigation";

import { SafeReservation, SafeUser } from "@/app/types";

import Heading from "@/app/components/Heading";
import Container from "@/app/components/Container";
import ListingCard from "@/app/components/listings/ListingCard";

import Script from "next/script";

interface BookingsClientProps {
  reservations: SafeReservation[];
  currentUser?: SafeUser | null;
}

const BookingsClient: React.FC<BookingsClientProps> = ({
  reservations,
  currentUser,
}) => {
  const router = useRouter();
  const [deletingId, setDeletingId] = useState("");

  const onCancel = useCallback(
    (id: string) => {
      setDeletingId(id);

      axios
        .delete(`/api/reservations/${id}`)
        .then(() => {
          toast.success("Your Booking Successfully Cancelled");
          router.refresh();
        })
        .catch((error) => {
          toast.error(error?.response?.data?.error);
        })
        .finally(() => {
          setDeletingId("");
        });
    },
    [router]
  );

  const onPayment = useCallback(
    (id: string) => {
      router.push("/payment");
    },
    [router]
  );

  return (
    <Container>
      <Script
        type="text/javascript"
        src="https://www.payhere.lk/lib/payhere.js"
      />
      <Heading
        title="Your Subject Bookings"
        subtitle="All your subject booking will appear here. You can cancel your bookings here."
      />
      <div
        className="
          mt-10
          grid 
          grid-cols-1 
          sm:grid-cols-2 
          md:grid-cols-3 
          lg:grid-cols-4
          xl:grid-cols-5
          2xl:grid-cols-6
          gap-8
        "
      >
        {reservations.map((reservation: any) => (
          <ListingCard
            key={reservation.id}
            data={reservation.listing}
            reservation={reservation}
            actionId={reservation.id}
            onAction={onCancel}
            disabled={deletingId === reservation.id}
            actionLabel="Cancel Booking"
            secondaryActionLabel="Proceed to payment"
            secondaryAction={onPayment}
            currentUser={currentUser}
          />
        ))}
      </div>
    </Container>
  );
};

export default BookingsClient;
