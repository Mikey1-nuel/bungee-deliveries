import { io, Socket } from "socket.io-client";

let socket: Socket | null = null;

export const connectSocket = (token: string): Socket => {
  // Disconnect stale socket if token changed
  if (socket?.connected) {
    socket.disconnect();
    socket = null;
  }

  socket = io(process.env.NEXT_PUBLIC_SOCKET_URL || "http://localhost:5000", {
    auth: { token },
    transports: ["websocket"],
    reconnection: true,
    reconnectionDelay: 1000,
    reconnectionAttempts: 10,
  });

  socket.on("connect", () => console.log("✅ Socket connected"));
  socket.on("disconnect", (reason) =>
    console.log("❌ Socket disconnected:", reason),
  );
  socket.on("connect_error", (err) =>
    console.error("Socket error:", err.message),
  );

  return socket;
};

export const disconnectSocket = () => {
  socket?.disconnect();
  socket = null;
};

export const getSocket = () => socket;
