"use client";

import { useState } from "react";
import { TextField, Button } from "@mui/material";
import { useRouter } from "next/navigation";

export default function ForgotPasswordPage() {
  const router = useRouter();

  const [identifier, setIdentifier] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // TEMP: UI-only flow
    router.push("/launch/resetPassword");
  };

  return (
    <main className="min-h-screen bg-[#F5CB58] flex items-center justify-center px-6">
      <form
        onSubmit={handleSubmit}
        className="bg-white w-full max-w-md rounded-2xl p-6 space-y-5"
      >
        <h1 className="text-xl font-bold text-[#391713]">Forgot Password</h1>

        <p className="text-sm text-[#252525]">
          Enter your email or phone number to reset your password.
        </p>

        <TextField
          value={identifier}
          onChange={(e) => setIdentifier(e.target.value)}
          placeholder="Email or Phone Number"
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
              fontFamily: "Montserrat",

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
              "& .MuiInputBase-input::placeholder": {
                color: "#beaba9ff",
                fontSize: "12px",
                fontFamily: "Montserrat",
                opacity: 1,
              },
            },
          }}
        />

        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{
            backgroundColor: "#FF642F",
            color: "#fff",
            fontFamily: "inherit",
            textTransform: "capitalize",
            "&:hover": { backgroundColor: "#e85a28" },
            borderRadius: "9999px",
            paddingY: "10px",
            fontWeight: 700,
          }}
        >
          Continue
        </Button>
      </form>
    </main>
  );
}
