"use client";
import React from "react";
import { useState } from "react";
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
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { LogIn } from "../types/type";

export default function LoginForm() {
  const [formData, setFormData] = useState<LogIn>({
    identifier: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);

  const handleChange =
    (field: keyof LogIn) => (e: React.ChangeEvent<HTMLInputElement>) => {
      setFormData({ ...formData, [field]: e.target.value });
    };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Login with:", formData);
  };

  const router = useRouter();
  const handleClick = () => {
    router.push("/launch/forgetPassword");
  };

  return (
    <main className="bg-white w-full max-w-[700px] mx-auto p-[20px] rounded-[15px] grid grid-cols-[2fr_1fr] gap-[20px]">
      <Box component="form" onSubmit={handleSubmit} sx={{ width: "100%" }}>
        <Stack spacing={2}>
          <Typography
            variant="h5"
            fontWeight={700}
            color="#391713"
            fontFamily={"inherit"}
          >
            Welcome Back
          </Typography>

          <Typography variant="body2" color="#252525" fontFamily={"inherit"}>
            Log in with your email or phone number
          </Typography>

          {/* Email or Phone */}
          <label
            htmlFor="email or phone Number"
            className="text-[#391713] font-[500] text-[14px]"
          >
            Email or Phone Number
            <TextField
              value={formData.identifier}
              onChange={handleChange("identifier")}
              required
              fullWidth
              autoComplete="off"
              inputProps={{
                autoComplete: "new-password",
                className: "text-[#391713]",
              }}
              InputProps={{
                sx: {
                  backgroundColor: "#F3E9B5",
                  borderRadius: "15px",
                  color: "#391713",
                  height: "45px",

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
                },
              }}
            />
          </label>

          {/* Password */}
          <label
            htmlFor="password"
            className="text-[#391713] font-[500] text-[14px]"
          >
            Password
            <TextField
              type={showPassword ? "text" : "password"}
              value={formData.password}
              onChange={handleChange("password")}
              required
              fullWidth
              autoComplete="off"
              inputProps={{
                autoComplete: "new-password",
                className: "text-[#391713]",
              }}
              InputProps={{
                sx: {
                  backgroundColor: "#F3E9B5",
                  borderRadius: "15px",
                  color: "#391713",
                  height: "45px",

                  "& fieldset": {
                    border: "none",
                    borderRadius: "20px",
                  },

                  "&:hover fieldset": {
                    border: "none",
                  },

                  "&.Mui-focused fieldset": {
                    border: "none",
                  },
                },
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => setShowPassword((prev) => !prev)}
                      edge="end"
                      aria-label="toggle password visibility"
                      className="text-[#FF642F]"
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
          <Typography
            variant="body2"
            color="#E95322"
            fontFamily={"inherit"}
            fontWeight={500}
            fontSize={12}
          >
            <button
              onClick={handleClick}
              style={{
                color: "inherit",
                textDecoration: "none",
                float: "right",
              }}
            >
              Forget Password
            </button>
          </Typography>

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
              "&:hover": {
                backgroundColor: "#e85a28",
              },
            }}
          >
            Log In
          </Button>
        </Stack>
      </Box>

      <div className="flex flex-col justify-center items-center gap-[8px]">
        <span className="text-[#252525] text-[12px] font-[500]">
          Or sign in with
        </span>
        <div className="flex justify-center items-center gap-[10px]">
          <Image src="/Google Icon.png" alt="" width={30} height={30} />
          <Image src="/Facebook Icon.png" alt="" width={30} height={30} />
        </div>

        <p className="text-[#391713] text-[13px] font-[500]">
          Don't have an account?
          <Link href="/signUp" className="text-[#E95322] ml-[5px]">
            Sign Up
          </Link>
        </p>
      </div>
    </main>
  );
}
