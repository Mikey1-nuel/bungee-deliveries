"use client";

import { useAuth } from "@/context/authContext";
import CustomerSidebar from "../sidebars/CustomerSidebar";
import RestaurantSidebar from "../sidebars/RestaurantSidebar";
import RiderSidebar from "../sidebars/RiderSidebar";
import AdminSidebar from "../sidebars/AdminSidebar";
import LogisticsSidebar from "../sidebars/LogisticsSidebar";
import Header from "../header";
import Footer from "../footer";

const getSidebar = (role: string) => {
  switch (role) {
    case "restaurant":
      return <RestaurantSidebar />;
    case "rider":
      return <RiderSidebar />;
    case "logistics":
      return <LogisticsSidebar />;
    case "admin":
      return <AdminSidebar />;
    default:
      return <CustomerSidebar />;
  }
};

export default function RoleLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user } = useAuth();
  const role = user?.role ?? "customer";

  return (
    <div className="h-screen w-full flex overflow-hidden">
      {getSidebar(role)}

      <div className="flex flex-col flex-1 h-full overflow-hidden">
        <Header />

        <main className="main-panel bg-[#F5CB58] pt-6 flex-1 overflow-y-auto">
          {children}
        </main>

        {role === "customer" && <Footer />}
      </div>
    </div>
  );
}
