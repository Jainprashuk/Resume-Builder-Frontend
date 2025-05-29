"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { verifyToken } from "../services/Auth/Auth";
import { toast } from "react-toastify";
import Loader from "@/components/Loader";

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        toast.error("Authentication failed. Please log in.");
        setIsAuthenticated(false);
        router.push("/login");
        return;
      }

      try {
        const response = await verifyToken(token);
        if (response.status === 200) {
          toast.success("Authentication successful!");
          setIsAuthenticated(true);
        } else {
          toast.error("Authentication failed. Token Invalid");
          setIsAuthenticated(false);
          router.push("/login");
        }
      } catch (error) {
        toast.error("Authentication failed. Please try again.");
        setIsAuthenticated(false);
        router.push("/login");
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, [router]);

  if (isLoading) {
    return <Loader />;
  }

  if (!isAuthenticated) {
    return null; // or a fallback
  }

  return <>{children}</>;
};

export default ProtectedRoute;
