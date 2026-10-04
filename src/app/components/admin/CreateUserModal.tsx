// src/app/components/admin/CreateUserModal.tsx
"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useMutation, useQuery } from "@apollo/client/react";
import {
  ADMIN_CREATE_USER,
  GET_ADMIN_LOGISTICS,
} from "@/graphql/queries/admin.queries";
import {
  CreateUserForm,
  AdminLogisticsResponse,
  AdminCreateUserResponse,
} from "@/app/types/type";
import toast from "react-hot-toast";

interface Props {
  open: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

const INITIAL: CreateUserForm = {
  fullName: "",
  email: "",
  phone: "",
  password: "",
  role: "customer",
};

const ROLES = [
  { value: "customer", label: "Customer" },
  { value: "restaurant", label: "Restaurant Owner" },
  { value: "rider", label: "Rider" },
  { value: "logistics", label: "Logistics Company" },
  { value: "admin", label: "Admin" },
];

export default function CreateUserModal({ open, onClose, onSuccess }: Props) {
  const [form, setForm] = useState<CreateUserForm>(INITIAL);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const { data: logisticsData } = useQuery<AdminLogisticsResponse>(
    GET_ADMIN_LOGISTICS,
    { variables: { page: 1, limit: 100 }, skip: !open },
  );
  const logisticsCompanies = logisticsData?.getAdminLogistics?.logistics ?? [];

  const [createUser] = useMutation<AdminCreateUserResponse>(ADMIN_CREATE_USER);

  useEffect(() => {
    if (open) {
      setForm(INITIAL);
      setError(null);
    }
  }, [open]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose]);

  const set = (key: keyof CreateUserForm, val: string) =>
    setForm((p) => ({ ...p, [key]: val }));

  const handleSubmit = async () => {
    setError(null);
    if (!form.fullName || !form.email || !form.phone || !form.password) {
      setError("All base fields are required.");
      return;
    }
    if (form.role === "restaurant" && !form.restaurantName) {
      setError("Restaurant name is required.");
      return;
    }
    if (form.role === "logistics" && !form.companyName) {
      setError("Company name is required.");
      return;
    }

    try {
      setSubmitting(true);
      const { data } = await createUser({ variables: form });
      if (!data?.adminCreateUser?.success) throw new Error("Creation failed");
      toast.success(data.adminCreateUser.message);
      onSuccess();
    } catch (e: any) {
      setError(e.message);
    } finally {
      setSubmitting(false);
    }
  };

  const input = (
    label: string,
    key: keyof CreateUserForm,
    type = "text",
    placeholder = "",
  ) => (
    <div>
      <label className="text-xs text-gray-500 font-medium mb-1 block">
        {label}
      </label>
      <input
        type={type}
        placeholder={placeholder}
        value={(form[key] as string) ?? ""}
        onChange={(e) => set(key, e.target.value)}
        className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#E95322]/30"
      />
    </div>
  );

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.85, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.85, opacity: 0 }}
            transition={{ type: "spring", damping: 20, stiffness: 300 }}
            className="bg-white rounded-2xl w-full max-w-md mx-4 p-6 max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center mb-5">
              <h2 className="text-lg font-bold text-[#391713]">
                Create New User
              </h2>
              <button
                onClick={onClose}
                className="text-gray-400 hover:text-gray-600 text-xl"
              >
                ✕
              </button>
            </div>

            {error && (
              <p className="text-sm text-red-500 bg-red-50 border border-red-200 rounded-xl px-3 py-2 mb-4">
                {error}
              </p>
            )}

            <div className="flex flex-col gap-3">
              {/* ROLE */}
              <div>
                <label className="text-xs text-gray-500 font-medium mb-1 block">
                  Role
                </label>
                <select
                  value={form.role}
                  onChange={(e) => set("role", e.target.value)}
                  className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none"
                >
                  {ROLES.map((r) => (
                    <option key={r.value} value={r.value}>
                      {r.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* BASE FIELDS */}
              {input("Full Name *", "fullName", "text", "e.g. John Doe")}
              {input("Email *", "email", "email", "e.g. john@example.com")}
              {input("Phone *", "phone", "tel", "e.g. +2348000000000")}
              {input("Password *", "password", "password", "Min 8 characters")}

              {/* RESTAURANT-SPECIFIC */}
              {form.role === "restaurant" && (
                <>
                  <div className="border-t border-gray-100 pt-3 mt-1">
                    <p className="text-xs font-semibold text-gray-400 uppercase mb-2">
                      Restaurant Details
                    </p>
                  </div>
                  {input(
                    "Restaurant Name *",
                    "restaurantName",
                    "text",
                    "e.g. Mama Put",
                  )}
                  {input(
                    "Location",
                    "restaurantLocation",
                    "text",
                    "e.g. Enugu",
                  )}
                </>
              )}

              {/* RIDER-SPECIFIC */}
              {form.role === "rider" && (
                <>
                  <div className="border-t border-gray-100 pt-3 mt-1">
                    <p className="text-xs font-semibold text-gray-400 uppercase mb-2">
                      Rider Details
                    </p>
                  </div>
                  <div>
                    <label className="text-xs text-gray-500 font-medium mb-1 block">
                      Logistics Company (optional)
                    </label>
                    <select
                      value={form.logisticsCompanyId ?? ""}
                      onChange={(e) =>
                        set("logisticsCompanyId", e.target.value)
                      }
                      className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none"
                    >
                      <option value="">No company (independent rider)</option>
                      {logisticsCompanies.map((lc) => (
                        <option key={lc.id} value={lc.id}>
                          {lc.name}
                        </option>
                      ))}
                    </select>
                  </div>
                </>
              )}

              {/* LOGISTICS-SPECIFIC */}
              {form.role === "logistics" && (
                <>
                  <div className="border-t border-gray-100 pt-3 mt-1">
                    <p className="text-xs font-semibold text-gray-400 uppercase mb-2">
                      Company Details
                    </p>
                  </div>
                  {input(
                    "Company Name *",
                    "companyName",
                    "text",
                    "e.g. Swift Logistics",
                  )}
                  {input(
                    "Company Phone",
                    "companyPhone",
                    "tel",
                    "e.g. +2348000000000",
                  )}
                </>
              )}
            </div>

            <div className="flex gap-3 mt-6">
              <button
                onClick={onClose}
                className="flex-1 border rounded-xl py-2.5 text-sm hover:bg-gray-50 transition"
              >
                Cancel
              </button>
              <button
                onClick={handleSubmit}
                disabled={submitting}
                className="flex-1 bg-[#E95322] text-white rounded-xl py-2.5 text-sm font-semibold hover:bg-[#d14a1e] transition disabled:opacity-50 flex items-center justify-center gap-2"
              >
                {submitting && (
                  <span className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                )}
                {submitting ? "Creating..." : "Create Account"}
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
