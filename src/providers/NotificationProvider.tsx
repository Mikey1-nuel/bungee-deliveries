"use client";

import { useEffect } from "react";

import { useQuery } from "@apollo/client/react";

import toast from "react-hot-toast";

import { connectSocket, disconnectSocket } from "@/lib/socket";

import { useAuth } from "@/context/authContext";

import { useNotificationStore } from "@/app/store/notificationStore";

import { GetMyNotificationsDocument } from "@/generated/graphql";

export default function NotificationProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, accessToken } = useAuth();

  const { setNotifications, addNotification } = useNotificationStore();

  //
  // FETCH
  //

  const { data, refetch } = useQuery(GetMyNotificationsDocument, {
    skip: !user,

    variables: {
      limit: 20,
      offset: 0,
    },

    fetchPolicy: "network-only",
  });

  //
  // INITIAL STATE
  //

  useEffect(() => {
    if (data?.getMyNotifications) {
      setNotifications(data.getMyNotifications);
    }
  }, [data, setNotifications]);

  //
  // SOCKETS
  //

  useEffect(() => {
    if (!user?.id || !accessToken) {
      return;
    }

    //
    // AUTH
    //

    const socket = connectSocket(accessToken);

    //
    // NEW NOTIFICATION
    //

    socket.on("new_notification", (notification) => {
      addNotification(notification);

      //
      // TOAST
      //

      toast(notification.title, {
        icon: "🔔",
      });

      //
      // SOUND
      //

      try {
        const audio = new Audio(
          "/universfield-new-notification-051-494246.mp3",
        );

        audio.volume = 0.6;

        audio.play();
      } catch (err) {
        console.error(err);
      }
    });

    //
    // RECONNECT RECOVERY
    //

    socket.on("connect", async () => {
      await refetch();
    });

    //
    // CLEANUP
    //

    return () => {
      socket.off("new_notification");

      socket.off("connect");

      disconnectSocket();
    };
  }, [user, accessToken, addNotification, refetch]);

  return children;
}
