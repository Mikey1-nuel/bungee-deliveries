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
} from "@mui/material";

import { Visibility, VisibilityOff } from "@mui/icons-material";

import { useMutation } from "@apollo/client/react";

import { SIGNUP_MUTATION } from "@/graphql/mutations/auth";

import { SignUp, SignupResponse, SignupVariables } from "../types/type";

import { useAuth } from "@/context/authContext";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

const inputSX = {
  backgroundColor: "#F3E9B5",
  borderRadius: "15px",
  color: "#391713",
  height: "45px",
  "& fieldset": { border: "none" },
  "&:hover fieldset": { border: "none" },
  "&.Mui-focused fieldset": { border: "none" },
};

const INITIAL_FORM: SignUp = {
  fullName: "",
  email: "",
  phone: "",
  password: "",
  role: "customer",
  restaurantName: "",
  restaurantLocation: "",
  restaurantImage: "",
};

export default function SignupForm() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [serverError, setServerError] = useState("");
  const [pendingApproval, setPendingApproval] = useState(false);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const [formData, setFormData] = useState<SignUp>(INITIAL_FORM);

  const [signup, { loading }] = useMutation<SignupResponse, SignupVariables>(
    SIGNUP_MUTATION,
  );
  const { login: authenticateUser } = useAuth();

  const handleChange =
    (field: keyof SignUp) => (e: React.ChangeEvent<HTMLInputElement>) => {
      setFormData((prev) => ({ ...prev, [field]: e.target.value }));
    };

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
      "https://bungee-deliveries-backend-staging.up.railway.app/uploads?folder=restaurants",
      { method: "POST", body: fd },
    );

    if (!res.ok) {
      throw new Error("Image upload failed");
    }

    const data = await res.json();
    return data.imageUrl;
  }

  const resetForm = () => {
    setFormData(INITIAL_FORM);
    setImageFile(null);
    setImagePreview(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setServerError("");

    try {
      let restaurantImage: string | null = formData.restaurantImage || null;

      // Upload the picked file, if any, before submitting the mutation —
      // this was previously defined but never actually called
      if (formData.role === "restaurant" && imageFile) {
        setUploading(true);
        try {
          restaurantImage = await uploadImage();
        } catch (uploadErr) {
          console.error("Image upload failed:", uploadErr);
          setServerError("Image upload failed. Please try again.");
          toast.error("Image upload failed. Please try again.");
          return;
        } finally {
          setUploading(false);
        }
      }

      const result = await signup({
        variables: {
          input: {
            fullName: formData.fullName,
            email: formData.email,
            phone: formData.phone,
            password: formData.password,
            role: formData.role,
            ...(formData.role === "restaurant" && {
              restaurantName: formData.restaurantName,
              restaurantLocation: formData.restaurantLocation || undefined,
              restaurantImage: restaurantImage || undefined,
            }),
          },
        },
      });

      const data = result.data;
      if (!data || !data.signup) {
        throw new Error("Signup failed");
      }

      await authenticateUser(data.signup.accessToken, data.signup.refreshToken);
    } catch (err: any) {
      // Apollo Client 4 uses `.errors`, not `.graphQLErrors` (that was v3's ApolloError shape)
      const code = err?.errors?.[0]?.extensions?.code;

      if (code === "ACCOUNT_PENDING") {
        const message =
          err.errors[0].message || "Account created — awaiting admin approval.";

        toast.success(message, { duration: 6000 });
        setPendingApproval(true);
        resetForm();
        setTimeout(() => router.push("/logIn"), 4000);
        return;
      }

      console.error("SIGNUP ERROR:", err);
      setServerError(err.message || "Something went wrong");
      toast.error(err.message || "Something went wrong");
    }
  };

  if (pendingApproval) {
    return (
      <main className="bg-white w-full max-w-[800px] mx-auto p-[40px] rounded-[15px] text-center">
        <div className="text-5xl mb-4">✅</div>
        <Typography variant="h5" fontWeight={700} color="#391713" mb={1}>
          Account created
        </Typography>
        <Typography variant="body2" color="#555" mb={3}>
          Your account is awaiting admin approval. We'll notify you as soon as
          it's approved — no need to try logging in until then.
        </Typography>
        <Typography variant="body2" color="#999">
          Taking you to the login page…
        </Typography>
      </main>
    );
  }

  return (
    <main className="bg-white w-full max-w-[800px] mx-auto p-[20px] rounded-[15px] grid grid-cols-[2fr_1fr] gap-[20px]">
      <Box component="form" onSubmit={handleSubmit}>
        <Stack spacing={2}>
          <Typography variant="h5" fontWeight={700} color="#391713">
            Create Account
          </Typography>

          <TextField
            label="Full Name"
            fullWidth
            required
            value={formData.fullName}
            onChange={handleChange("fullName")}
            InputProps={{ sx: inputSX }}
          />

          <TextField
            label="Email"
            type="email"
            fullWidth
            required
            value={formData.email}
            onChange={handleChange("email")}
            InputProps={{ sx: inputSX }}
          />

          <TextField
            label="Phone"
            fullWidth
            required
            value={formData.phone}
            onChange={handleChange("phone")}
            InputProps={{ sx: inputSX }}
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
            InputProps={{ sx: inputSX }}
          >
            <MenuItem value="customer">Customer</MenuItem>
            <MenuItem value="restaurant">Restaurant Owner</MenuItem>
            <MenuItem value="rider">Rider</MenuItem>
            <MenuItem value="logistics">Logistics Company</MenuItem>
          </TextField>

          {formData.role === "restaurant" && (
            <>
              <TextField
                label="Restaurant Name"
                fullWidth
                required
                value={formData.restaurantName ?? ""}
                onChange={handleChange("restaurantName")}
                InputProps={{ sx: inputSX }}
              />
              <TextField
                label="Location"
                fullWidth
                value={formData.restaurantLocation ?? ""}
                onChange={handleChange("restaurantLocation")}
                InputProps={{ sx: inputSX }}
              />
              <label className="text-[#391713] font-medium text-sm mt-3">
                Image
              </label>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
              />

              {imagePreview && (
                <img
                  src={imagePreview}
                  alt="preview"
                  className="mt-2 rounded w-[120px] h-[120px] object-cover"
                />
              )}
            </>
          )}

          <Button
            type="submit"
            variant="contained"
            disabled={loading || uploading}
            sx={{
              borderRadius: "999px",
              py: 1.2,
              fontWeight: 700,
              backgroundColor: "#FF642F",
              textTransform: "capitalize",
              "&:hover": { backgroundColor: "#e85a28" },
            }}
          >
            {uploading
              ? "Uploading image..."
              : loading
                ? "Creating Account..."
                : "Sign Up"}
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
