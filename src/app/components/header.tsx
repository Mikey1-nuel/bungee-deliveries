"use client";

import { useState } from "react";

import Image from "next/image";

import Link from "next/link";

import { TextField, IconButton, InputAdornment } from "@mui/material";

import FilterListIcon from "@mui/icons-material/FilterList";

import CartIcon from "./cartIcon";

import { useAuth } from "@/context/authContext";

import { useNotificationStore } from "@/app/store/notificationStore";

export default function Header() {
  const { user } = useAuth();

  //
  // GLOBAL NOTIFICATION STORE
  //

  const { unreadCount } = useNotificationStore();

  //
  // SEARCH
  //

  const [search, setSearch] = useState("");

  const [filter, setFilter] = useState(false);

  return (
    <header
      className="
        w-full
        grid
        grid-cols-[1.3fr_2fr_1fr]
        items-center
        gap-[20px]
        bg-[#F5CB58]
        p-[15px_45px]
        shadow
      "
    >
      {/* GREETING */}

      <h1 className="text-white text-[20px] font-[700] leading-none">
        Good Morning, <span>{user?.fullName || "User"}</span>
      </h1>

      {/* SEARCH */}

      <TextField
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        fullWidth
        autoComplete="off"
        placeholder="Search..."
        inputProps={{
          className: "text-[#391713]",
        }}
        InputProps={{
          sx: {
            backgroundColor: "#fff",

            borderRadius: "25px",

            color: "#391713",

            height: "45px",

            fontFamily: "Montserrat",

            "& fieldset": {
              border: "none",
            },

            "&:hover fieldset": {
              border: "none",
            },

            "&.Mui-focused fieldset": {
              border: "none",
            },

            "& input::placeholder": {
              color: "#676767",

              fontFamily: "Montserrat",

              fontSize: "14px",

              opacity: 1,
            },
          },

          endAdornment: (
            <InputAdornment position="end">
              <IconButton onClick={() => setFilter((prev) => !prev)}>
                <FilterListIcon
                  className={filter ? "text-[#FF642F]" : "text-gray-500"}
                />
              </IconButton>
            </InputAdornment>
          ),
        }}
      />

      {/* ACTIONS */}

      <div className="flex justify-end items-center gap-x-4">
        <CartIcon />

        {/* NOTIFICATIONS */}

        <Link href="/dashboard/notifications">
          <div className="bg-white rounded-[13px] p-2 relative">
            {unreadCount > 0 && (
              <span
                className="
                  absolute
                  -top-1
                  -right-1
                  bg-red-500
                  text-white
                  text-xs
                  w-5
                  h-5
                  flex
                  items-center
                  justify-center
                  rounded-full
                "
              >
                {unreadCount}
              </span>
            )}

            <Image
              src="/bell (2).png"
              alt="Notifications"
              width={20}
              height={20}
            />
          </div>
        </Link>

        {/* PROFILE */}

        <Link
          href="/dashboard/myProfile"
          className="
            flex
            gap-x-2
            items-center
            text-[12px]
          "
        >
          <div className="bg-white rounded-[13px] p-2">
            <Image src="/user (1).png" alt="User" width={20} height={20} />
          </div>
        </Link>
      </div>
    </header>
  );
}
