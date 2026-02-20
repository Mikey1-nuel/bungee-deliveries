"use client";

import { useState } from "react";
import { TextField, Button, IconButton, InputAdornment } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useRouter } from "next/navigation";

export default function ResetPasswordPage() {
  const router = useRouter();

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    // TEMP: UI-only success
    router.push("/logIn");
  };

  return (
    <main className="min-h-screen bg-[#F5CB58] flex items-center justify-center px-6">
      <form
        onSubmit={handleSubmit}
        className="bg-white w-full max-w-md rounded-2xl p-6 space-y-5"
      >
        <h1 className="text-xl font-bold text-[#391713]">Reset Password</h1>

        <TextField
          placeholder="New Password"
          type={showPassword ? "text" : "password"}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          fullWidth
          required
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
              "& .MuiInputBase-input::placeholder": {
                color: "#beaba9ff",
                fontSize: "12px",
                fontFamily: "Montserrat",
                opacity: 1,
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

        <TextField
          placeholder="Confirm Password"
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          fullWidth
          required
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
          Reset Password
        </Button>
      </form>
    </main>
  );
}
