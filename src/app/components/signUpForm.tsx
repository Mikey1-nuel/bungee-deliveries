"use client";

import React, { useState } from "react";
import {
  Box,
  Button,
  TextField,
  Typography,
  Stack,
  InputAdornment,
  IconButton,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import Image from "next/image";
import Link from "next/link";
import { SignUp } from "../types/type";

export default function SignupForm() {
  const [formData, setFormData] = useState<SignUp>({
    fullName: "",
    email: "",
    phone: "",
    dob: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);

  const handleChange =
    (field: keyof SignUp) => (e: React.ChangeEvent<HTMLInputElement>) => {
      setFormData({ ...formData, [field]: e.target.value });
    };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Sign up with:", formData);
  };

  const inputSX = {
    backgroundColor: "#F3E9B5",
    borderRadius: "15px",
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
      color: "#391713",
      fontFamily: "Montserrat",
      opacity: 1, // ensures custom color is applied
    },

    // icon color (calendar picker icon)
    "& .MuiSvgIcon-root": {
      color: "#E95322", // customize icon color
    },
  };

  return (
    <main className="bg-white w-full max-w-[800px] mx-auto p-[20px] rounded-[15px] grid grid-cols-[2fr_1fr] gap-[20px]">
      <Box component="form" onSubmit={handleSubmit}>
        <Stack spacing={2}>
          <Typography variant="h5" fontWeight={700} color="#391713" fontFamily={"inherit"}>
            Create Account
          </Typography>

          <Typography variant="body2" color="#252525" fontFamily={"inherit"}>
            Sign up to start ordering your favorite meals
          </Typography>

          {/* Full Name */}
          <label className="text-[#391713] font-[500] text-[14px]">
            Full Name
            <TextField
              value={formData.fullName}
              onChange={handleChange("fullName")}
              fullWidth
              required
              autoComplete="off"
              inputProps={{ className: "text-[#391713]" }}
              InputProps={{ sx: inputSX }}
            />
          </label>

          {/* Email */}
          <label className="text-[#391713] font-[500] text-[14px]">
            Email Address
            <TextField
              type="email"
              value={formData.email}
              onChange={handleChange("email")}
              fullWidth
              required
              autoComplete="off"
              inputProps={{ className: "text-[#391713]" }}
              InputProps={{ sx: inputSX }}
            />
          </label>

          {/* Phone */}
          <label className="text-[#391713] font-[500] text-[14px]">
            Phone Number
            <TextField
              type="tel"
              value={formData.phone}
              onChange={handleChange("phone")}
              fullWidth
              required
              autoComplete="off"
              inputProps={{ className: "text-[#391713]" }}
              InputProps={{ sx: inputSX }}
            />
          </label>

          {/* Date of Birth */}
          <label className="text-[#391713] font-[500] text-[14px]">
            Date of Birth
            <TextField
              type="date"
              value={formData.dob}
              onChange={handleChange("dob")}
              fullWidth
              required
              InputLabelProps={{ shrink: true }}
              InputProps={{ sx: inputSX }}
            />
          </label>

          {/* Password */}
          <label className="text-[#391713] font-[500] text-[14px]">
            Password
            <TextField
              type={showPassword ? "text" : "password"}
              value={formData.password}
              onChange={handleChange("password")}
              fullWidth
              required
              autoComplete="off"
              inputProps={{ className: "text-[#391713]" }}
              InputProps={{
                sx: inputSX,
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => setShowPassword((prev) => !prev)}
                    >
                      {showPassword ? (
                        <VisibilityOff className="text-[#FF642F]" />
                      ) : (
                        <Visibility className="text-[#FF642F]" />
                      )}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          </label>

          <Button
            type="submit"
            variant="contained"
            size="large"
            sx={{
              borderRadius: "999px",
              py: 1.2,
              fontWeight: 700,
              backgroundColor: "#FF642F",
              color: "#fff",
              fontFamily: "inherit",
              textTransform: "capitalize",
              "&:hover": { backgroundColor: "#e85a28" },
            }}
          >
            Sign Up
          </Button>
        </Stack>
      </Box>

      {/* Social signup */}
      <div className="flex flex-col justify-center items-center gap-[8px]">
        <span className="text-[#252525] text-[12px] font-[500] text-center">
          By continuing, you agree to{" "}
          <span className="text-[#e85a28]">Terms of Use</span> and{" "}
          <span className="text-[#e85a28]">Privacy Policy.</span>
        </span>
        <span className="text-[#252525] text-[12px] font-[500]">
          Or sign up with
        </span>

        <div className="flex gap-[10px]">
          <Image src="/Google Icon.png" alt="Google" width={30} height={30} />
          <Image
            src="/Facebook Icon.png"
            alt="Facebook"
            width={30}
            height={30}
          />
        </div>

        <p className="text-[#391713] text-[13px] font-[500]">
          Already have an account?
          <Link href="/logIn" className="text-[#E95322] ml-[5px]">
            Log In
          </Link>
        </p>
      </div>
    </main>
  );
}
