"use client";

import React, { useState } from "react";

import Link from "next/link";

import Image from "next/image";

import {
  Box,
  Button,
  TextField,
  Typography,
  Stack,
  InputAdornment,
  IconButton,
  Alert,
} from "@mui/material";

import { Visibility, VisibilityOff } from "@mui/icons-material";

import { useMutation } from "@apollo/client/react";

import { LOGIN_MUTATION } from "@/graphql/mutations/auth";

import { LoginResponse, LoginVariables } from "../types/type";

import { useAuth } from "@/context/authContext";
import toast from "react-hot-toast";

const inputSX = {
  backgroundColor: "#F3E9B5",

  borderRadius: "15px",

  color: "#391713",

  height: "45px",

  "& fieldset": {
    border: "none",
  },

  "&:hover fieldset": {
    border: "none",
  },

  "&.Mui-focused fieldset": {
    border: "none",
  },
};

export default function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);

  const [formData, setFormData] = useState({
    identifier: "",
    password: "",
  });

  const [serverError, setServerError] = useState("");

  const [login, { loading }] = useMutation<LoginResponse, LoginVariables>(
    LOGIN_MUTATION,
    {
      errorPolicy: "all",
    },
  );
  const { login: authenticateUser } = useAuth();

  const handleChange =
    (field: "identifier" | "password") =>
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setServerError("");

      setFormData((prev) => ({
        ...prev,
        [field]: e.target.value,
      }));
    };

  if (loading) return;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setServerError("");

    try {
      const result = await login({
        variables: {
          input: {
            identifier: formData.identifier,
            password: formData.password,
          },
        },
      });

      // GraphQL returned errors
      if (result.error) {
        const message = result.error.message || "Unable to login.";

        setServerError(message);
        toast.error(message);
        return;
      }

      if (!result.data?.login) {
        throw new Error("Login failed");
      }

      await authenticateUser(
        result.data.login.accessToken,
        result.data.login.refreshToken,
      );

      toast.success(`Welcome back ${result.data.login.user.fullName}!`);
    } catch (error: any) {
      const message =
        error?.graphQLErrors?.[0]?.message ||
        error?.networkError?.message ||
        error?.message ||
        "Something went wrong.";

      console.error(error);

      setServerError(message);

      toast.error(message);
    }
  };

  return (
    <main className="bg-white w-full max-w-[700px] mx-auto p-[20px] rounded-[15px] grid grid-cols-[2fr_1fr] gap-[20px]">
      <Box component="form" onSubmit={handleSubmit}>
        <Stack spacing={2}>
          <Typography variant="h5" fontWeight={700} color="#391713">
            Welcome Back
          </Typography>
          <Typography variant="body2" color="#252525">
            Log in with your email or phone
          </Typography>
          {serverError && <Alert severity="error">{serverError}</Alert>}
          {/* IDENTIFIER */}
          <label
            htmlFor="email or phone Number"
            className="text-[#391713] font-[500] text-[14px]"
          >
            {" "}
            Email or Phone number{" "}
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
                  "&:hover fieldset": { border: "none", height: "20px" },
                  "&.Mui-focused fieldset": { border: "none" },
                },
              }}
            />{" "}
          </label>{" "}
          {/* Password */}{" "}
          <label
            htmlFor="password"
            className="text-[#391713] font-[500] text-[14px]"
          >
            {" "}
            Password{" "}
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
                  "& fieldset": { border: "none", borderRadius: "20px" },
                  "&:hover fieldset": { border: "none" },
                  "&.Mui-focused fieldset": { border: "none" },
                },
                endAdornment: (
                  <InputAdornment position="end">
                    {" "}
                    <IconButton
                      onClick={() => setShowPassword((prev) => !prev)}
                      edge="end"
                      aria-label="toggle password visibility"
                      className="text-[#FF642F]"
                    >
                      {" "}
                      {showPassword ? (
                        <VisibilityOff className="text-[#FF642F]" />
                      ) : (
                        <Visibility className="text-[#FF642F]" />
                      )}{" "}
                    </IconButton>{" "}
                  </InputAdornment>
                ),
              }}
            />{" "}
          </label>{" "}
          <Typography
            variant="body2"
            color="#E95322"
            fontFamily={"inherit"}
            fontWeight={500}
            fontSize={12}
          >
            {" "}
            <button
              style={{
                color: "inherit",
                textDecoration: "none",
                float: "right",
              }}
            >
              {" "}
              Forget Password{" "}
            </button>{" "}
          </Typography>
          <Button
            type="submit"
            variant="contained"
            disabled={loading}
            sx={{
              borderRadius: "999px",

              py: 1.2,

              fontWeight: 700,

              backgroundColor: "#FF642F",

              textTransform: "capitalize",

              "&:hover": {
                backgroundColor: "#e85a28",
              },
            }}
          >
            {loading ? "Logging in..." : "Log In"}
          </Button>
        </Stack>
      </Box>

      {/* SIDE */}

      <div className="flex flex-col justify-center items-center gap-[8px]">
        <span className="text-[#252525] text-[12px] font-[500]">
          Or sign in with
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
          Don't have an account?
          <Link href="/signUp" className="text-[#E95322] ml-[5px]">
            Sign Up
          </Link>
        </p>
      </div>
    </main>
  );
}
