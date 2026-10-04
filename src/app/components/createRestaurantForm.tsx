"use client";

import { useState } from "react";
import { useMutation } from "@apollo/client/react";
import { CREATE_RESTAURANT } from "@/graphql/mutations/create-restaurant";
import {
  RestaurantForm,
  CreateRestaurantResponse,
  CreateRestaurantVariables,
} from "../types/type";

export default function CreateRestaurantForm() {
  const initialForm: RestaurantForm = {
    name: "",
    location: "",
  };

  const [form, setForm] = useState(initialForm);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const [createRestaurant] = useMutation<
    CreateRestaurantResponse,
    CreateRestaurantVariables
  >(CREATE_RESTAURANT);

  function handleImageChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    setImageFile(file);
    setImagePreview(URL.createObjectURL(file));
  }

  async function uploadImage(): Promise<string | null> {
    if (!imageFile) return null;

    const fd = new FormData();
    fd.append("file", imageFile);

    const res = await fetch(
      "http://localhost:5000/uploads?folder=restaurants",
      {
        method: "POST",
        body: fd,
      },
    );

    if (!res.ok) {
      throw new Error("Image upload failed");
    }

    const data = await res.json();
    return data.imageUrl;
  }

  async function handleSubmit() {
    if (!form.name.trim()) {
      alert("Restaurant name is required");
      return;
    }

    try {
      setSubmitting(true);

      let imageUrl: string | null = null;

      if (imageFile) {
        try {
          imageUrl = await uploadImage();
        } catch (uploadError) {
          console.error("Image upload failed:", uploadError);
          throw new Error("Image upload failed. Please try again.");
        }
      }

      const { data } = await createRestaurant({
        variables: {
          input: {
            name: form.name.trim(),
            location: form.location.trim() || undefined,
            image: imageUrl || undefined,
          },
        },
      });

      if (!data || !data.createRestaurant) {
        throw new Error("Restaurant creation failed");
      }

      alert(data.createRestaurant.message || "Restaurant created successfully");

      // RESET FORM
      setForm(initialForm);
      setImageFile(null);
      setImagePreview(null);
    } catch (err: any) {
      console.error("CREATE RESTAURANT ERROR:", err);

      const message =
        err?.graphQLErrors?.[0]?.message ||
        err?.networkError?.message ||
        err?.message ||
        "Failed to create restaurant";

      alert(message);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <main className="h-screen bg-white rounded-[30px_30px_0_0]">
      <div className="p-[35px_45px] flex flex-col w-full">
        <div className="max-w-xl">
          <h2 className="text-xl font-semibold mb-4 text-[#391713]">
            Create Restaurant
          </h2>

          <label className="text-[#391713] font-medium text-sm">
            Restaurant Name
          </label>
          <input
            className="p-2 w-full bg-[#F3E9B5] rounded-[15px] h-[45px]"
            value={form.name}
            onChange={(e) =>
              setForm((prev) => ({
                ...prev,
                name: e.target.value,
              }))
            }
          />

          <label className="text-[#391713] font-medium text-sm mt-3">
            Location
          </label>
          <input
            className="p-2 w-full bg-[#F3E9B5] rounded-[15px] h-[45px]"
            value={form.location}
            onChange={(e) =>
              setForm((prev) => ({
                ...prev,
                location: e.target.value,
              }))
            }
          />

          <label className="text-[#391713] font-medium text-sm mt-3">
            Image
          </label>
          <input type="file" accept="image/*" onChange={handleImageChange} />

          {imagePreview && (
            <img
              src={imagePreview}
              alt="preview"
              className="mt-2 rounded w-[120px] h-[120px] object-cover"
            />
          )}

          <button
            onClick={handleSubmit}
            disabled={submitting}
            className="bg-[#FF642F] mt-5 rounded-full text-white py-3 w-full disabled:opacity-50"
          >
            {submitting ? "Creating..." : "Create Restaurant"}
          </button>
        </div>
      </div>
    </main>
  );
}
