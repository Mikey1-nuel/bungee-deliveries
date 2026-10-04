"use client";
import React, { useState } from "react";
import Image from "next/image";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";

const contactOptions = [
  {
    id: 1,
    label: "Customer service",
    img: "/customer-care.png",
    options: [
      "Call Support",
      "Email Support",
      "Live Chat",
      "Report an Issue",
      "Track an Order",
    ],
  },
  {
    id: 2,
    label: "Website",
    img: "/world-wide-web.png",
    options: [
      "Visit Homepage",
      "Track Order",
      "FAQs",
      "Terms & Conditions",
      "Privacy Policy",
    ],
  },
  {
    id: 3,
    label: "Whatsapp",
    img: "/whatsapp (1).png",
    options: ["Chat with Support", "Order Assistance", "Report a Problem"],
  },
  {
    id: 4,
    label: "Facebook",
    img: "/social-media.png",
    options: ["Visit Page", "Send Message", "View Updates"],
  },
  {
    id: 5,
    label: "Instagram",
    img: "/instagram (3).png",
    options: ["Visit Profile", "Send DM", "View Posts"],
  },
];

const ContactUs = () => {
  const [openId, setOpenId] = useState<number | null>(null);

  const toggleDropdown = (id: number) => {
    setOpenId((prev) => (prev === id ? null : id));
  };
  return (
    <main className="h-screen bg-white rounded-[30px_30px_0_0]">
      <div className="bg-white rounded-[30px_30px_0_0] p-[35px_45px]">
        <div className="max-w-xl">
          <h2 className="text-xl font-semibold text-[#391713]">Contact Us</h2>
          <p className="text-[#E95322] mb-4 text-[14px]">
            How can we help you?
          </p>

          {contactOptions.map((cont) => (
            <div key={cont.id} className="mb-3">
              {/* HEADER */}
              <motion.div
                whileTap={{ scale: 0.98 }}
                onClick={() => toggleDropdown(cont.id)}
                className="flex justify-between items-center border-t border-b border-[#FFD8C7] rounded-[15px] p-[15px_10px] cursor-pointer"
              >
                <div className="flex items-center gap-[10px]">
                  <Image src={cont.img} alt="" width={30} height={30} />
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
              <AnimatePresence>
                {openId === cont.id && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.25 }}
                    className="overflow-hidden border border-t-0 border-[#FFD8C7] rounded-b-[15px] bg-[#FFF7F3]"
                  >
                    <div className="p-3">
                      {cont.options.map((opt, index) => (
                        <motion.div
                          key={index}
                          whileHover={{ x: 4 }}
                          className="py-2 px-2 hover:bg-[#FFEDE5] rounded cursor-pointer text-sm text-[#391713]"
                        >
                          {opt}
                        </motion.div>
                      ))}
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

export default ContactUs;
