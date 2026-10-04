"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { NotificationSettings, SettingsSection } from "@/app/types/type";

const settingsConfig: SettingsSection[] = [
  {
    title: "Notification Types",
    items: [
      {
        key: "orders",
        label: "Order Updates",
        description: "Get notified on every order status change",
      },
      {
        key: "payments",
        label: "Payments",
        description: "Payment confirmations and refunds",
      },
      {
        key: "offers",
        label: "Offers & Discounts",
        description: "Promo codes and special deals",
      },
      {
        key: "general",
        label: "General",
        description: "App updates and announcements",
      },
    ],
  },
  {
    title: "Delivery Preferences",
    items: [
      {
        key: "push",
        label: "Push Notifications",
        description: "Receive notifications on your device",
      },
      { key: "sound", label: "Sound" },
      { key: "vibrate", label: "Vibration" },
    ],
  },
];

const DEFAULT_SETTINGS: NotificationSettings = {
  orders: true,
  payments: true,
  offers: false,
  general: true,
  push: true,
  sound: true,
  vibrate: false,
};

export default function SettingsPage() {
  const [toggles, setToggles] =
    useState<NotificationSettings>(DEFAULT_SETTINGS);
  const [toast, setToast] = useState<string | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [loadingDelete, setLoadingDelete] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("notification_settings");
    if (saved) {
      try {
        setToggles(JSON.parse(saved));
      } catch {}
    }
  }, []);

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 2000);
  };

  const handleToggle = (key: keyof NotificationSettings) => {
    setToggles((prev) => {
      const updated = { ...prev, [key]: !prev[key] };
      localStorage.setItem("notification_settings", JSON.stringify(updated));
      return updated;
    });
    showToast("Settings saved");
  };

  const handleDelete = async () => {
    setLoadingDelete(true);
    setTimeout(() => {
      setLoadingDelete(false);
      setShowModal(false);
      showToast("Account deleted successfully");
    }, 2000);
  };

  return (
    <main className="min-h-screen bg-white rounded-[30px_30px_0_0]">
      <div className="bg-white rounded-[30px_30px_0_0] p-[35px_45px]">
        <div className="max-w-xl">
          <h2 className="text-xl font-semibold text-[#391713] mb-6">
            Settings
          </h2>

          {settingsConfig.map((section) => (
            <div key={section.title} className="mb-6">
              <h4 className="text-sm font-semibold text-gray-500 mb-2">
                {section.title}
              </h4>
              <div className="bg-[#FFF7F3] border border-[#FFD8C7] rounded-xl p-3">
                {section.items.map((item) => {
                  const isDisabled =
                    !toggles.push &&
                    (item.key === "sound" || item.key === "vibrate");

                  return (
                    <div
                      key={item.key}
                      className="flex justify-between items-center py-3 border-b border-orange-100 last:border-none"
                    >
                      <div>
                        <p className="text-sm font-medium text-[#391713]">
                          {item.label}
                        </p>
                        {item.description && (
                          <p className="text-xs text-gray-400 mt-0.5">
                            {item.description}
                          </p>
                        )}
                      </div>
                      <button
                        disabled={isDisabled}
                        onClick={() => handleToggle(item.key)}
                        className={`w-10 h-5 flex items-center rounded-full p-1 transition-colors duration-200 ${
                          toggles[item.key] ? "bg-[#E95322]" : "bg-gray-300"
                        } ${isDisabled ? "opacity-40 cursor-not-allowed" : "cursor-pointer"}`}
                      >
                        <div
                          className={`bg-white w-4 h-4 rounded-full shadow transform transition-transform duration-200 ${
                            toggles[item.key]
                              ? "translate-x-4"
                              : "translate-x-0"
                          }`}
                        />
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}

          {/* DANGER ZONE */}
          <div className="mt-6">
            <h4 className="text-sm font-semibold text-red-500 mb-2">
              Danger Zone
            </h4>
            <div className="bg-red-50 border border-red-200 rounded-xl p-4">
              <p className="text-xs text-gray-500 mb-3">
                Once you delete your account, all your data will be permanently
                removed.
              </p>
              <button
                onClick={() => setShowModal(true)}
                className="text-sm text-red-600 font-semibold hover:underline"
              >
                Delete Account Permanently
              </button>
            </div>
          </div>
        </div>

        {/* DELETE MODAL */}
        <AnimatePresence>
          {showModal && (
            <motion.div
              className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <motion.div
                initial={{ scale: 0.85, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.85, opacity: 0 }}
                className="bg-white rounded-2xl w-full max-w-[400px] mx-4 p-6"
              >
                <h3 className="text-lg font-semibold text-[#391713] mb-2">
                  Delete Account
                </h3>
                <p className="text-sm text-gray-500 mb-6">
                  Are you sure? This action is permanent and cannot be undone.
                </p>
                <div className="flex justify-end gap-3">
                  <button
                    onClick={() => setShowModal(false)}
                    className="px-4 py-2 text-sm rounded-lg bg-gray-100 hover:bg-gray-200 transition"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleDelete}
                    className="px-4 py-2 text-sm rounded-lg bg-red-600 text-white flex items-center gap-2 hover:bg-red-700 transition"
                  >
                    {loadingDelete && (
                      <span className="w-3 h-3 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    )}
                    {loadingDelete ? "Deleting..." : "Yes, Delete"}
                  </button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* TOAST */}
        <AnimatePresence>
          {toast && (
            <motion.div
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 50, opacity: 0 }}
              className="fixed bottom-6 left-1/2 -translate-x-1/2 bg-[#391713] text-white px-5 py-2 rounded-full text-sm shadow-lg z-50"
            >
              {toast}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </main>
  );
}
