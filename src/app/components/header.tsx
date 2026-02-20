"use client";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  TextField,
  IconButton,
  InputAdornment,
} from "@mui/material";
import FilterListIcon from "@mui/icons-material/FilterList";
import CartIcon from "./cartIcon";

export default function Header() {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState(false);

  return (
    <header className="w-full grid grid-cols-[1.3fr_2fr_1fr] items-center gap-[20px] bg-[#F5CB58] p-[15px_45px] shadow dark:border-gray-800">
      <h1 className="text-white text-[20px] font-[700] leading-none">Good Morning, <span>Emmanuel</span></h1>

      <TextField
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        fullWidth
        required
        autoComplete="off"
        placeholder="Search..."
        inputProps={{ className: "text-[#391713]" }}
        InputProps={{
                sx: {
                  backgroundColor: "#fff",
                  borderRadius: "25px",
                  color: "#391713",
                  height: "45px",
                fontFamily: "Montserrat",

                  "& fieldset": {
                    border: "none",
                    borderRadius: "20px",
                    height: "20px",
                  },

                  "&:hover fieldset": {
                    border: "none",
                    height: "20px",
                  },

                  "&.Mui-focused fieldset": {
                    border: "none",
                  },
                  "& input::placeholder": {
      color: "#676767",
      fontFamily: "Montserrat",
      fontSize: "14px",
      opacity: 1, // ensures custom color is applied
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

      <div className="flex justify-end items-center gap-x-4">
        <CartIcon />

        <Link href="#">
          <div className="bg-white dark:border-white rounded-[13px] p-2 relative">
            <div className="w-[9px] h-[9px] bg-orange-600 rounded-full absolute top-0 right-0"></div>
            <Image src="/bell (2).png" alt="Notifications" width={20} height={20} />
          </div>
        </Link>

        <Link href="#" className="flex gap-x-2 items-center text-[12px]">
          <div className="bg-white dark:border-white rounded-[13px] p-2">
            <Image src="/user (1).png" alt="User" width={20} height={20} />
          </div>
        </Link>
      </div>
    </header>
  );
}
