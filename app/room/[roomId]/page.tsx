import React, { useCallback } from "react";
import getCurrentUser from "../../actions/getCurrentUser";

import { useParams, useSearchParams } from "next/navigation";
import { MediaRoom } from "./RoomClient";
import getReservationsOne from "@/app/actions/getReservationsOne";
import ClientOnly from "@/app/components/ClientOnly";
import EmptyState from "@/app/components/EmptyState";
import Button from "@/app/components/Button";
import axios from "axios";

const Room = async () => {
  //const params = useParams();

  const onAccept = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();

    axios.put;
  };

  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return (
      <ClientOnly>
        <EmptyState title="Unauthorized" subtitle="Please login" />
      </ClientOnly>
    );
  }

  const reservation = await getReservationsOne({ authorId: currentUser.id });

  //const id = params?.roomId;

  //console.log(id?.toString());
  return (
    <>
      <MediaRoom reservation={reservation} user={currentUser} />
    </>
  );
};

export default Room;
