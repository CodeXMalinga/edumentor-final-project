"use client";

import { useCallback, useEffect, useState } from "react";

import { LiveKitRoom, VideoConference } from "@livekit/components-react";

import "@livekit/components-styles";
import getCurrentUser from "../../actions/getCurrentUser";
import { SafeReservation, SafeUser } from "@/app/types";

import { Loader2 } from "lucide-react";
import { Reservation, User } from "@prisma/client";
import { useParams, useSearchParams } from "next/navigation";
import Button from "@/app/components/Button";
import axios from "axios";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

interface MediaRoomProps {
  reservation: SafeReservation | any;
  user: any;
}

export const MediaRoom = ({ reservation, user }: MediaRoomProps) => {
  const [token, setToken] = useState("");

  const router = useRouter();

  const params = useParams();
  const id = params?.roomId;

  console.log(id?.toString());

  // console.log("user is " + currentUser);

  const onComplete = useCallback(() => {
    axios
      .put(`/api/reservations/${id}`, { rstatus: "Completed" })
      .then(() => {
        toast.success("Meeting successfully completed");
        router.push("/");
      })
      .catch(() => {
        toast.error("Something went wrong.");
      })
      .finally(() => {});
  }, [router, id]);

  useEffect(() => {
    (async () => {
      try {
        const resp = await fetch(
          `/api/livekit?room=${id}&username=${user?.name}`
        );

        const data = await resp.json();

        setToken(data.token);
        //console.log(reservation?.id);
      } catch (e) {
        console.log(e);
      }
    })();
  }, [id, user]);

  if (token === "") {
    return (
      <div className="flex flex-col flex-1 justify-center items-center">
        <Loader2 className="h-7 w-7 text-zinc-500 animate-spin my-4" />
        <p className="text-xs text-zinc-500 dark:text-zinc-400">Loading...</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center">
      <LiveKitRoom
        data-lk-theme="default"
        serverUrl={process.env.NEXT_PUBLIC_LIVEKIT_URL}
        token={token}
        connect={true}
      >
        <VideoConference />
      </LiveKitRoom>

      <div>
        <p>Mark as completed</p>
        <Button label="Mark as Completed" onClick={onComplete} />
      </div>
    </div>
  );
};
