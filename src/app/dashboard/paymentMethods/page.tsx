"use client";
import React, { useState } from "react";
import Image from "next/image";
import { handlePayment } from "@/lib/paymentServices";
import { motion, AnimatePresence } from "framer-motion";

const PaymentOptions = () => {
  const [selectedProvider, setSelectedProvider] = useState<string | null>(null);

  const providers = [
    { id: "paystack", label: "Paystack" },
    { id: "flutterwave", label: "Flutterwave" },
    { id: "interswitch", label: "Interswitch" },
    { id: "opay", label: "OPay" },
    { id: "palmpay", label: "PalmPay" },
    { id: "quickteller", label: "Quickteller" },
  ] as const;

  type ProviderId = (typeof providers)[number]["id"];

  const providerIcons: Record<ProviderId, string> = {
    paystack: "/paystack.svg",
    flutterwave: "/flutterwave.svg",
    interswitch: "/interswitch.svg",
    opay: "/opay.svg",
    palmpay: "/palmpay.svg",
    quickteller: "/quickteller.svg",
  };

  const handleCheckout = () => {
    if (!selectedProvider) {
      alert("Please select a payment method");
      return;
    }
    handlePayment(selectedProvider, 5000, {
      name: "John Doe",
      email: "john@example.com",
    });
  };

  return (
    <main className="h-screen bg-white rounded-[30px_30px_0_0]">
      <div className="bg-white rounded-[30px_30px_0_0] p-[35px_45px]">
        <div className=" max-w-xl">
          <h2 className="text-xl font-semibold mb-4 text-[#391713]">
            Choose Payment Method
          </h2>
          <div className="flex flex-col gap-3">
            {providers.map((p) => (
              <motion.div
                key={p.id}
                whileTap={{ scale: 0.97 }}
                animate={{
                  backgroundColor:
                    selectedProvider === p.id ? "#FFF0EB" : "transparent",
                }}
                onClick={() => setSelectedProvider(p.id)}
                className="flex justify-between border-t border-b border-[#FFD8C7] rounded-[15px] p-[15px_10px] cursor-pointer"
              >
                <div className="flex items-center gap-[10px]">
                  <div key={p.id} className="flex items-center gap-2">
                    <Image
                      src={providerIcons[p.id]}
                      alt={p.label}
                      width={30}
                      height={30}
                      className="w-6 h-6 object-contain"
                    />
                  </div>
                  <span className="text-[#391713] font-medium">{p.label}</span>
                </div>

                <div className="flex justify-center items-center my-auto w-[24px] h-[24px] rounded-full border border-[#E95322]">
                  <input
                    type="checkbox"
                    checked={selectedProvider === p.id}
                    readOnly
                    className="appearance-none w-[14px] h-[14px] rounded-full border border-[#E95322] checked:bg-red-500 checked:border-[#E95322] cursor-pointer"
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
};

export default PaymentOptions;
