"use client";

import { useEffect } from "react";

import { useRouter } from "next/navigation";

import { useAuth } from "@/context/authContext";

interface Props {
  children: React.ReactNode;
}

const ProtectedRoute = ({ children }: Props) => {
  const router = useRouter();

  const {
    authenticated,
    loading,
  } = useAuth();

  useEffect(() => {

    if (
      !loading &&
      !authenticated
    ) {

      router.replace(
        "/logIn"
      );
    }

  }, [
    authenticated,
    loading,
    router,
  ]);

  if (loading) {

    return (
      <div className="h-screen flex items-center justify-center">
        Loading...
      </div>
    );
  }

  if (!authenticated) {
    return null;
  }

  return children;
}

export default ProtectedRoute;
