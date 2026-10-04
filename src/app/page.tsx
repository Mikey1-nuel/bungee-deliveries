"use client";

import { useEffect, useState } from "react";
import FirstScreen from "./launch/firstScreen/page";
import WelcomeScreen from "./launch/welcomeScreen/page";

export default function Home() {
  const [showFirstScreen, setShowFirstScreen] = useState(false);
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    const hasSeenSplash = localStorage.getItem("hasSeenSplash");

    if (!hasSeenSplash) {
      setShowFirstScreen(true);

      // Start fade-out at 4.5s
      setTimeout(() => {
        setFadeOut(true);
      }, 4700);

      // Remove splash at 5s
      setTimeout(() => {
        setShowFirstScreen(false);
        localStorage.setItem("hasSeenSplash", "true");
      }, 5000);
    }
  }, []);

  return (
    <div className="min-h-screen">
      {showFirstScreen ? (
        <div
          className={`transition-opacity duration-500 ${
            fadeOut ? "opacity-0" : "opacity-100"
          }`}
        >
          <FirstScreen />
        </div>
      ) : (
        <WelcomeScreen />
      )}
    </div>
  );
}
