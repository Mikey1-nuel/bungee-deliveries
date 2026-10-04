"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useMutation, useQuery } from "@apollo/client/react";
import {
  CreateMenuResponse,
  CreateMenuVariables,
  GetCategoriesResponse,
  MenuForm,
  MenuType,
} from "@/app/types/type";
import { CREATE_MENU } from "@/graphql/queries/menu.queries";
import { GET_CATEGORIES } from "@/graphql/queries/category.queries";
import Image from "next/image";

interface Props {
  open: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

const INITIAL_FORM: MenuForm = {
  name: "",
  description: "",
  categoryId: "",
  basePrice: 0,
  type: "meal",
};

export default function CreateMenuModal({ open, onClose, onSuccess }: Props) {
  const [form, setForm] = useState<MenuForm>(INITIAL_FORM);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const { data: categoriesData } =
    useQuery<GetCategoriesResponse>(GET_CATEGORIES);
  const categories = categoriesData?.categories || [];

  const [createMenu] = useMutation<CreateMenuResponse, CreateMenuVariables>(
    CREATE_MENU,
  );

  // Reset form when modal opens
  useEffect(() => {
    if (open) {
      setForm(INITIAL_FORM);
      setImageFile(null);
      setImagePreview(null);
      setError(null);
    }
  }, [open]);

  // Close on Escape key
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setImageFile(file);
    setImagePreview(URL.createObjectURL(file));
  };

  const uploadImage = async (): Promise<string | null> => {
    if (!imageFile) return null;
    const fd = new FormData();
    fd.append("file", imageFile);
    const response = await fetch("http://localhost:5000/uploads?folder=menus", {
      method: "POST",
      body: fd,
    });
    if (!response.ok) throw new Error("Image upload failed");
    const data = await response.json();
    return data.imageUrl;
  };

  const handleSubmit = async () => {
    setError(null);

    if (!form.name.trim() || !form.categoryId || form.basePrice <= 0) {
      setError("Please fill all required fields correctly.");
      return;
    }

    try {
      setSubmitting(true);
      const imageUrl = await uploadImage();

      const response = await createMenu({
        variables: {
          input: {
            name: form.name,
            description: form.description,
            categoryId: form.categoryId,
            basePrice: form.basePrice,
            type: form.type,
            image: imageUrl || undefined,
          },
        },
      });

      if (!response.data?.createMenu) throw new Error("Menu creation failed");

      onSuccess();
    } catch (err: any) {
      setError(err.message || "Failed to create menu item.");
    } finally {
      setSubmitting(false);
    }
  };

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
            {/* HEADER */}
            <div className="flex justify-between items-center mb-5">
              <h2 className="text-lg font-bold text-[#391713]">
                Add Menu Item
              </h2>
              <button
                onClick={onClose}
                className="text-gray-400 hover:text-gray-600 text-xl leading-none"
              >
                ✕
              </button>
            </div>

            {/* ERROR */}
            {error && (
              <p className="text-sm text-red-500 bg-red-50 border border-red-200 rounded-lg px-3 py-2 mb-4">
                {error}
              </p>
            )}

            <div className="flex flex-col gap-3">
              {/* TYPE */}
              <div>
                <label className="text-xs text-gray-500 font-medium mb-1 block">
                  Type
                </label>
                <select
                  className="p-2 w-full bg-[#F3E9B5] rounded-xl h-[45px] text-sm"
                  value={form.type}
                  onChange={(e) =>
                    setForm((p) => ({ ...p, type: e.target.value as MenuType }))
                  }
                >
                  <option value="meal">Meal</option>
                  <option value="extra">Extra</option>
                  <option value="swallow">Swallow</option>
                </select>
              </div>

              {/* NAME */}
              <div>
                <label className="text-xs text-gray-500 font-medium mb-1 block">
                  Name <span className="text-red-400">*</span>
                </label>
                <input
                  placeholder="e.g. Jollof Rice"
                  className="p-2 w-full bg-[#F3E9B5] rounded-xl h-[45px] text-sm"
                  value={form.name}
                  onChange={(e) =>
                    setForm((p) => ({ ...p, name: e.target.value }))
                  }
                />
              </div>

              {/* DESCRIPTION */}
              <div>
                <label className="text-xs text-gray-500 font-medium mb-1 block">
                  Description
                </label>
                <textarea
                  placeholder="Brief description (optional)"
                  rows={3}
                  className="p-2 w-full bg-[#F3E9B5] rounded-xl text-sm resize-none"
                  value={form.description}
                  onChange={(e) =>
                    setForm((p) => ({ ...p, description: e.target.value }))
                  }
                />
              </div>

              {/* CATEGORY */}
              <div>
                <label className="text-xs text-gray-500 font-medium mb-1 block">
                  Category <span className="text-red-400">*</span>
                </label>
                <select
                  className="p-2 w-full bg-[#F3E9B5] rounded-xl h-[45px] text-sm"
                  value={form.categoryId}
                  onChange={(e) =>
                    setForm((p) => ({ ...p, categoryId: e.target.value }))
                  }
                >
                  <option value="">Select category</option>
                  {categories.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* PRICE */}
              <div>
                <label className="text-xs text-gray-500 font-medium mb-1 block">
                  Price (₦) <span className="text-red-400">*</span>
                </label>
                <input
                  type="number"
                  placeholder="e.g. 3500"
                  className="p-2 w-full bg-[#F3E9B5] rounded-xl h-[45px] text-sm"
                  value={form.basePrice || ""}
                  onChange={(e) =>
                    setForm((p) => ({
                      ...p,
                      basePrice: Number(e.target.value),
                    }))
                  }
                />
              </div>

              {/* IMAGE */}
              <div>
                <label className="text-xs text-gray-500 font-medium mb-1 block">
                  Image
                </label>
                <input
                  type="file"
                  accept="image/*"
                  className="text-sm text-gray-500 file:mr-3 file:py-1 file:px-3 file:rounded-full file:border-0 file:text-xs file:font-semibold file:bg-[#FFF1EB] file:text-[#E95322] hover:file:bg-orange-100"
                  onChange={handleImageChange}
                />
                {imagePreview && (
                  <div className="relative mt-2 w-24 h-24 rounded-xl overflow-hidden">
                    <Image
                      src={imagePreview}
                      alt="Preview"
                      fill
                      className="object-cover"
                    />
                  </div>
                )}
              </div>
            </div>

            {/* ACTIONS */}
            <div className="flex gap-3 mt-6">
              <button
                onClick={onClose}
                className="flex-1 py-2.5 rounded-xl border border-gray-200 text-sm text-gray-600 hover:bg-gray-50 transition"
              >
                Cancel
              </button>
              <button
                onClick={handleSubmit}
                disabled={submitting}
                className="flex-1 py-2.5 rounded-xl bg-[#E95322] text-white text-sm font-semibold hover:bg-[#d14a1e] transition disabled:opacity-50 flex items-center justify-center gap-2"
              >
                {submitting && (
                  <span className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                )}
                {submitting ? "Creating..." : "Create Item"}
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
