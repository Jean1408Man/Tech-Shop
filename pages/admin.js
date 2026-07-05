import { useEffect } from "react";
import { useRouter } from "next/router";
import AdminDashboard from "../components/admin/AdminDashboard";
import { CatalogLoading } from "../components/catalog/CatalogFeedback";
import { useAuth } from "../hooks/useAuth";

export default function AdminPage() {
  const router = useRouter();
  const { canAccessAdmin, isAuthenticated, isHydrated } = useAuth();

  useEffect(() => {
    if (!isHydrated) {
      return;
    }

    if (!isAuthenticated) {
      router.replace("/login");
      return;
    }

    if (!canAccessAdmin) {
      router.replace("/");
    }
  }, [canAccessAdmin, isAuthenticated, isHydrated, router]);

  if (!isHydrated || !isAuthenticated || !canAccessAdmin) {
    return <CatalogLoading message="Verificando permisos..." />;
  }

  return <AdminDashboard />;
}
