// hooks/useAuth.ts
"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";

export function useAuth(required: boolean = true) {
  const router = useRouter();
  const pathname = usePathname();
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    const checkAuth = () => {
      const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";

      const protectedRoutes = [
        "/admin/adminAdd",
        "/admin/adminProducts/face",
        "/admin/adminProducts/body",
        "/admin/adminProducts/decor",
        "/admin/adminProducts/hair",
        "/admin/adminProducts/oils",
      ];

      const isProtectedRoute = protectedRoutes.some((route) =>
        pathname?.startsWith(route)
      );

      if (isProtectedRoute && !isLoggedIn) {
        console.log("Доступ заборонено, перенаправляємо на /admin");
        router.replace("/admin");
        return;
      }

      if (isLoggedIn && pathname === "/admin") {
        router.replace("/admin/adminAdd");
        return;
      }

      setIsChecking(false);
    };

    checkAuth();

    const handleStorageChange = () => {
      checkAuth();
    };

    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, [router, pathname, required]);

  return { isChecking };
}
