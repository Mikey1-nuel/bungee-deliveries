"use client";
import React, { useState } from "react";
import Image from "next/image";
import { DeliveryAddressForm } from "@/app/types/type";
import { motion, AnimatePresence } from "framer-motion";

const DeliveryAddress = () => {
  const [addresses, setAddresses] = useState([
    { id: 1, label: "My Home", address: "778 Locust View Drive Oakland, CA" },
    {
      id: 2,
      label: "Parents' House",
      address: "123 Maple Street, San Jose, CA",
    },
    { id: 3, label: "Office", address: "456 Pine Avenue, San Francisco, CA" },
  ]);

  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState<DeliveryAddressForm>({
    name: "",
    address: "",
  });

  const handleCardClick = (id: number) => {
    setSelectedId(id);
  };

  const handleAddNew = () => {
    setForm({ name: "", address: "" });
    setShowModal(true);
  };

  const handleSaveAddress = () => {
    // Trim to avoid spaces-only values
    if (!form.name.trim() || !form.address.trim()) {
      alert("Please fill in both name and address before saving.");
      return;
    }

    const newAddress = {
      id: addresses.length + 1,
      label: form.name,
      address: form.address,
    };

    setAddresses((prev) => [...prev, newAddress]);
    setShowModal(false);
  };

  return (
    <main className="h-screen bg-white rounded-[30px_30px_0_0]">
      <div className="bg-white rounded-[30px_30px_0_0] p-[35px_45px]">
        <div className="max-w-xl flex flex-col gap-4">
          <h2 className="text-xl font-semibold mb-4 text-[#391713] text-left w-full">
            My addresses
          </h2>

          {addresses.map((addr) => (
            <motion.div
              key={addr.id}
              whileTap={{ scale: 0.97 }}
              animate={{
                backgroundColor:
                  selectedId === addr.id ? "#FFF0EB" : "transparent",
              }}
              onClick={() => setSelectedId(addr.id)}
              className="flex justify-between border-t border-b border-[#FFD8C7] rounded-[15px] p-[15px_10px] cursor-pointer"
            >
              <div className="flex items-center gap-[10px]">
                <Image src="/home (2).png" alt="" width={40} height={40} />
                <div>
                  <h5 className="font-semibold text-[#391713]">{addr.label}</h5>
                  <span className="text-sm text-gray-600">{addr.address}</span>
                </div>
              </div>

              <div className="flex justify-center items-center my-auto w-[24px] h-[24px] rounded-full border border-[#E95322]">
                <input
                  type="checkbox"
                  checked={selectedId === addr.id}
                  readOnly
                  className="appearance-none w-[14px] h-[14px] rounded-full border border-[#E95322] checked:bg-red-500 checked:border-[#E95322] cursor-pointer"
                />
              </div>
            </motion.div>
          ))}

          <button
            onClick={handleAddNew}
            className="mt-4 bg-[#FF642F] hover:bg-[#e85a28] rounded-full text-white px-4 py-2 font-[500] mx-auto"
          >
            Add New Address
          </button>
        </div>

        {/* Modal */}
        <AnimatePresence>
          {showModal && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center bg-[rgba(15,23,42,0.6)] backdrop-blur"
            >
              <motion.div
                initial={{ scale: 0.85, y: 40 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.85, y: 40 }}
                transition={{ duration: 0.25 }}
                className="bg-white rounded-2xl max-w-[800px] p-5 relative"
              >
                <h3 className="text-lg font-semibold mb-4 text-[#391713]">
                  Add Delivery Address
                </h3>

                <label className="text-[#391713] font-[500] text-[14px]">
                  Name
                </label>
                <input
                  className="border-none p-2 w-full bg-[#F3E9B5] text-[#391713] rounded-[15px] h-[45px] mb-3 outline-none"
                  value={form.name}
                  onChange={(e) =>
                    setForm((prev) => ({ ...prev, name: e.target.value }))
                  }
                />

                <label className="text-[#391713] font-[500] text-[14px]">
                  Address
                </label>
                <input
                  className="border-none p-2 w-full bg-[#F3E9B5] text-[#391713] rounded-[15px] h-[45px] mb-3 outline-none"
                  value={form.address}
                  onChange={(e) =>
                    setForm((prev) => ({ ...prev, address: e.target.value }))
                  }
                />

                <div className="flex justify-end gap-3 mt-4">
                  <button
                    onClick={() => setShowModal(false)}
                    className="px-4 py-2 rounded-full bg-[#FFDECF] text-[#E95322]"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleSaveAddress}
                    className="px-4 py-2 rounded-full bg-[#E95322] text-white"
                  >
                    Save
                  </button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </main>
  );
};

export default DeliveryAddress;
