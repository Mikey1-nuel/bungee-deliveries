"use client";
import { MyProfileForm } from "@/app/types/type";
import React, { useState, useEffect } from "react";
import { useAuth } from "@/context/authContext";
import Image from "next/image";

const initialForm: MyProfileForm = {
  fullName: "",
  dob: "",
  email: "",
  phoneNumber: "",
  profilePhoto: "",

  currentPassword: "",
  newPassword: "",
  confirmPassword: "",

  accountDeactivation: false,
};

const MyProfile = () => {
   const { user } = useAuth();

  const [form, setForm] = useState<MyProfileForm>(initialForm);

  // Fill form from logged in user
  useEffect(() => {
    if (user) {
      setForm((prev) => ({
        ...prev,
        fullName: user.fullName || "",
        email: user.email || "",
        phoneNumber: user.phone || "",
      }));
    }
  }, [user]);

  const handleToggleAccountStatus = async () => {
    setForm((prev) => ({
      ...prev,
      accountDeactivation: !prev.accountDeactivation,
    }));
  };

  return (
    <main className="h-screen bg-white rounded-[30px_30px_0_0]">
      <div className="bg-white rounded-[30px_30px_0_0] p-[35px_45px] flex flex-col w-full">
        <form className="max-w-xl flex flex-col items-center">
          <h2 className="text-xl font-semibold mb-4 text-[#391713] text-left w-full">
            My profile
          </h2>
          <div className="relative w-[200px] h-[200px] bg-gray-50 rounded-xl overflow-hidden">
            <Image
              src="/Rectangle 128.jpg"
              alt=""
              width={300}
              height={300}
              className="object-contain w-full"
            />
          </div>

          {/* Full Name */}
          <label className="text-[#391713] font-[500] text-[14px] text-left w-full">
            Full Name
          </label>
          <input
            className="border p-2 w-full bg-[#F3E9B5] text-[#391713] rounded-[15px] h-[45px] border-none outline-none"
            value={form.fullName}
            onChange={(e) =>
              setForm((prev) => ({ ...prev, fullName: e.target.value }))
            }
          />

          {/* Date of Birth */}
          <label className="text-[#391713] font-[500] text-[14px] text-left w-full">
            Date of Birth
          </label>
          <input
            className="border p-2 w-full bg-[#F3E9B5] text-[#391713] rounded-[15px] h-[45px] border-none outline-none"
            type="date"
            value={form.dob}
            onChange={(e) =>
              setForm((prev) => ({ ...prev, dob: e.target.value }))
            }
          />

          {/* Email */}
          <label className="text-[#391713] font-[500] text-[14px] text-left w-full">
            Email
          </label>
          <input
            className="border p-2 w-full bg-[#F3E9B5] text-[#391713] rounded-[15px] h-[45px] border-none outline-none"
            type="email"
            value={form.email}
            onChange={(e) =>
              setForm((prev) => ({ ...prev, email: e.target.value }))
            }
          />

          {/* Phone Number */}
          <label className="text-[#391713] font-[500] text-[14px] text-left w-full">
            Phone Number
          </label>
          <input
            className="border p-2 w-full bg-[#F3E9B5] text-[#391713] rounded-[15px] h-[45px] border-none outline-none"
            value={form.phoneNumber}
            onChange={(e) =>
              setForm((prev) => ({ ...prev, phoneNumber: e.target.value }))
            }
          />

          {/* Profile Photo */}
          <label className="text-[#391713] font-[500] text-[14px] text-left w-full">
            Profile Photo URL
          </label>
          <input
            className="border p-2 w-full bg-[#F3E9B5] text-[#391713] rounded-[15px] h-[45px] border-none outline-none"
            value={form.profilePhoto}
            onChange={(e) =>
              setForm((prev) => ({ ...prev, profilePhoto: e.target.value }))
            }
          />

          {/* Current Password */}
          <label className="text-[#391713] font-[500] text-[14px] text-left w-full">
            Current Password
          </label>
          <input
            className="border p-2 w-full bg-[#F3E9B5] text-[#391713] rounded-[15px] h-[45px] border-none outline-none"
            type="password"
            value={form.currentPassword}
            onChange={(e) =>
              setForm((prev) => ({ ...prev, currentPassword: e.target.value }))
            }
          />

          {/* New Password */}
          <label className="text-[#391713] font-[500] text-[14px] text-left w-full">
            New Password
          </label>
          <input
            className="border p-2 w-full bg-[#F3E9B5] text-[#391713] rounded-[15px] h-[45px] border-none outline-none"
            type="password"
            value={form.newPassword}
            onChange={(e) =>
              setForm((prev) => ({ ...prev, newPassword: e.target.value }))
            }
          />

          {/* Confirm Password */}
          <label className="text-[#391713] font-[500] text-[14px] text-left w-full">
            Confirm New Password
          </label>
          <input
            className="border p-2 w-full bg-[#F3E9B5] text-[#391713] rounded-[15px] h-[45px] border-none outline-none"
            type="password"
            value={form.confirmPassword}
            onChange={(e) =>
              setForm((prev) => ({ ...prev, confirmPassword: e.target.value }))
            }
          />


          <div className="w-full flex justify-between">
            <button
              type="submit"
              className="float-center mt-4 bg-[#FF642F] hover:bg-[#e85a28] rounded-full text-white px-4 py-2 font-[500]"
            >
              Update profile
            </button>

          <button
              type="button"
              onClick={handleToggleAccountStatus}
              className="mt-4 bg-red-500 hover:bg-red-600 rounded-full text-white px-4 py-2 font-[500]"
            >
              {form.accountDeactivation
                ? "Reactivate Account"
                : "Deactivate Account"}
            </button>
          </div>
        </form>
      </div>
    </main>
  );
};

export default MyProfile;
