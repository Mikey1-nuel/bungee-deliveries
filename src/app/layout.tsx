import "./globals.css";

import { Montserrat } from "next/font/google";

import { Toaster } from "react-hot-toast";

import { Providers, ApProviders } from "./providers";

import { AuthProvider } from "@/context/authContext";

import { CartProvider } from "./components/cartContext";

import NotificationProvider from "@/providers/NotificationProvider";

const montserrat = Montserrat({
  subsets: ["latin"],

  weight: ["300", "400", "500", "600", "700"],

  variable: "--font-montserrat",
});

export const metadata = {
  title: "Bungee Deliveries",

  description:
    "Fast food delivery to your doorstep",

  manifest: "/manifest.json",
};

export const viewport = {
  themeColor: "#FF6B00",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={
          montserrat.className
        }
      >
        <ApProviders>
          <Providers>
            <AuthProvider>
              <CartProvider>
                <NotificationProvider>
                  <Toaster position="top-right" />

                  {children}
                </NotificationProvider>
              </CartProvider>
            </AuthProvider>
          </Providers>
        </ApProviders>
      </body>
    </html>
  );
}
