// import Sidebar from "@/components/sidebar";
// import Header from "@/components/header";
import Sidebar from "../components/sideBar";
import Header from "../components/header";
import Footer from "../components/footer";
import "../globals.css";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="h-screen w-full flex overflow-hidden">
      <Sidebar />
      <div className="flex flex-col flex-1 h-full overflow-hidden">
        <Header />
        <main className="main-panel bg-[#F5CB58] pt-6 flex-1 overflow-y-auto">{children}</main>
        <Footer />
      </div>
    </div>
  );
}
