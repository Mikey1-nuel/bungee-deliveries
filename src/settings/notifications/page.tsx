"use client";

import { useState } from "react";

export default function NotificationSettingsPage() {
  const [settings, setSettings] = useState({
    orders: true,
    offers: true,
    push: true,
    sound: true,
    vibrate: false,
  });

  const toggle = (key: string) => {
    setSettings((prev) => ({
      ...prev,
      [key]: !prev[key as keyof typeof prev],
    }));
  };

  return (
    <main className="p-6">
      <h1 className="text-xl font-bold mb-6">Notification Settings</h1>

      <div className="space-y-4">
        {Object.entries(settings).map(([key, value]) => (
          <div
            key={key}
            className="flex justify-between items-center border p-4 rounded-xl"
          >
            <span className="capitalize">{key}</span>

            <button
              onClick={() => toggle(key)}
              className={`w-14 h-8 rounded-full ${
                value ? "bg-green-500" : "bg-gray-300"
              }`}
            />
          </div>
        ))}
      </div>
    </main>
  );
}
