import RoleLayout from "../components/layouts/RoleLayout";
import ProtectedRoute from "../components/protectedRoute";
import "../globals.css";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ProtectedRoute>
      <RoleLayout>{children}</RoleLayout>
    </ProtectedRoute>
  );
}
