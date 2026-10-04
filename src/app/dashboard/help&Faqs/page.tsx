"use client";
import React, { useState } from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";

const faqOptions = [
  {
    id: 1,
    label: "How do I place an order?",
    answer:
      "Browse through available menus, select your preferred items, add them to your cart, and proceed to checkout to complete your order.",
  },
  {
    id: 2,
    label: "How can I track my order?",
    answer:
      "Once your order is confirmed, you can track its progress in the 'Orders' section under active orders.",
  },
  {
    id: 3,
    label: "What payment methods are available?",
    answer:
      "We support multiple payment options including Paystack, Flutterwave, OPay, PalmPay, and other secure payment gateways.",
  },
  {
    id: 4,
    label: "Can I cancel my order?",
    answer:
      "Yes, you can cancel your order before it is marked as completed. Go to your orders page and select the cancel option.",
  },
  {
    id: 5,
    label: "What should I do if my order is delayed?",
    answer:
      "If your order is taking longer than expected, please contact customer support or use the live chat feature for immediate assistance.",
  },
  {
    id: 6,
    label: "How do I contact customer support?",
    answer:
      "You can reach us via live chat, WhatsApp, email, or by calling our support line from the contact section.",
  },
  {
    id: 7,
    label: "Can I modify my order after placing it?",
    answer:
      "Order modifications are limited. You may need to cancel the order and place a new one if changes are required.",
  },
  {
    id: 8,
    label: "Are there delivery charges?",
    answer:
      "Yes, delivery charges may apply depending on your location and the restaurant. The fee will be displayed before checkout.",
  },
  {
    id: 9,
    label: "What happens if I receive the wrong order?",
    answer:
      "Please report the issue immediately through the app or contact support. We will resolve it as quickly as possible.",
  },
  {
    id: 10,
    label: "Is my payment information secure?",
    answer:
      "Yes, all payments are processed through secure and trusted payment gateways with encryption to protect your data.",
  },
];

const HelpAndFAQs = () => {
  const [openId, setOpenId] = useState<number | null>(null);

  const toggleDropdown = (id: number) => {
    setOpenId((prev) => (prev === id ? null : id));
  };
  return (
    <main className="h-screen bg-white rounded-[30px_30px_0_0]">
      <div className="bg-white rounded-[30px_30px_0_0] p-[35px_45px]">
        <div className="max-w-xl">
          <h2 className="text-xl font-semibold text-[#391713]">Help & FAQs</h2>
          <p className="text-[#E95322] mb-4 text-[14px]">
            {" "}
            How can we help you?{" "}
          </p>

          {faqOptions.map((cont) => (
            <div key={cont.id} className="mb-3">
              {/* HEADER */}
              <motion.div
                whileTap={{ scale: 0.98 }}
                onClick={() => toggleDropdown(cont.id)}
                className="flex justify-between items-center border-t border-b border-[#FFD8C7] rounded-[15px] p-[15px_10px] cursor-pointer"
              >
                <div className="flex items-center gap-[10px]">
                  <h5 className="font-semibold text-[#391713]">{cont.label}</h5>
                </div>

                <div className="flex items-center">
                  {openId === cont.id ? (
                    <FaChevronUp color="#E95322" />
                  ) : (
                    <FaChevronDown color="#E95322" />
                  )}
                </div>
              </motion.div>

              {/* DROPDOWN */}
              <AnimatePresence initial={false}>
                {openId === cont.id && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.25 }}
                    className="overflow-hidden border border-t-0 border-[#FFD8C7] rounded-b-[15px] bg-[#FFF7F3]"
                  >
                    <div className="p-3">
                      <div className="py-2 px-2 hover:bg-[#FFEDE5] rounded cursor-pointer text-sm text-[#391713]">
                        {cont.answer}
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
};

export default HelpAndFAQs;
