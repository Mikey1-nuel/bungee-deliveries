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
  MenuItem,
  Alert,
} from "@mui/material";

import { Visibility, VisibilityOff } from "@mui/icons-material";

import { useMutation } from "@apollo/client/react";

import { SIGNUP_MUTATION } from "@/graphql/mutations/auth";

import { SignUp, SignupResponse, SignupVariables } from "../types/type";

import { useAuth } from "@/context/authContext";

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

export default function SignupForm() {
  const [showPassword, setShowPassword] = useState(false);

  const [serverError, setServerError] = useState("");

  const [formData, setFormData] = useState<SignUp>({
    fullName: "",
    email: "",
    phone: "",
    password: "",
    role: "customer",
  });

  const [signup, { loading }] = useMutation<SignupResponse, SignupVariables>(
    SIGNUP_MUTATION,
  );
  const { login: authenticateUser } = useAuth();

  const handleChange =
    (field: keyof SignUp) => (e: React.ChangeEvent<HTMLInputElement>) => {
      setFormData((prev) => ({
        ...prev,

        [field]: e.target.value,
      }));
    };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setServerError("");

    try {
      const result = await signup({
        variables: {
          input: {
            fullName: formData.fullName,

            email: formData.email,

            phone: formData.phone,

            password: formData.password,

            role: formData.role,
          },
        },
      });

      const data = result.data;

      if (!data || !data.signup) {
        throw new Error("Signup failed");
      }

      //
      // SAVE TOKENS
      //

      await authenticateUser(data.signup.accessToken, data.signup.refreshToken);

      //
      // DO NOT REDIRECT
      //
      // AuthProvider handles redirect
      //
    } catch (err: any) {
      console.error("SIGNUP ERROR:", err);

      setServerError(err.message || "Something went wrong");
    }
  };

  return (
    <main className="bg-white w-full max-w-[800px] mx-auto p-[20px] rounded-[15px] grid grid-cols-[2fr_1fr] gap-[20px]">
      <Box component="form" onSubmit={handleSubmit}>
        <Stack spacing={2}>
          <Typography variant="h5" fontWeight={700} color="#391713">
            Create Account
          </Typography>

          {serverError && <Alert severity="error">{serverError}</Alert>}

          <TextField
            label="Full Name"
            fullWidth
            required
            value={formData.fullName}
            onChange={handleChange("fullName")}
            InputProps={{
              sx: inputSX,
            }}
          />

          <TextField
            label="Email"
            type="email"
            fullWidth
            required
            value={formData.email}
            onChange={handleChange("email")}
            InputProps={{
              sx: inputSX,
            }}
          />

          <TextField
            label="Phone"
            fullWidth
            required
            value={formData.phone}
            onChange={handleChange("phone")}
            InputProps={{
              sx: inputSX,
            }}
          />

          <TextField
            label="Password"
            fullWidth
            required
            type={showPassword ? "text" : "password"}
            value={formData.password}
            onChange={handleChange("password")}
            InputProps={{
              sx: inputSX,

              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={() => setShowPassword((prev) => !prev)}>
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

          <TextField
            select
            label="Account Type"
            value={formData.role}
            onChange={handleChange("role")}
            InputProps={{
              sx: inputSX,
            }}
          >
            <MenuItem value="customer">Customer</MenuItem>

            <MenuItem value="restaurant">Restaurant Owner</MenuItem>

            <MenuItem value="rider">Rider</MenuItem>

            <MenuItem value="logistics">Logistics Company</MenuItem>
          </TextField>

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
            {loading ? "Creating Account..." : "Sign Up"}
          </Button>
        </Stack>
      </Box>

      {/* SIDE */}

      <div className="flex flex-col justify-center items-center gap-[8px]">
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
