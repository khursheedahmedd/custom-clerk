// components/ProtectedRoute.jsx
import { motion } from "framer-motion";
import { useUser, useAuth } from "@clerk/clerk-react"; // Added useAuth
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function ProtectedRoute({ children }) {
  const { isLoaded, isSignedIn, user } = useUser();
  const { getToken, signOut } = useAuth(); // Added auth functions
  const [userRole, setUserRole] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuthState = async () => {
      try {
        if (!isLoaded) return;

        // Clerk state check
        if (!isSignedIn) {
          navigate("/login");
          return;
        }

        // Get fresh token
        const token = await getToken();
        console.log("Token:", token);

        // Fetch user role
        const response = await axios.get("http://localhost:5000/api/users/me", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        // Handle role data
        if (!response.data?.role) {
          throw new Error("Role not found in response");
        }

        setUserRole(response.data.role);
      } catch (error) {
        console.error("Role check failed:", error);
        // await signOut();
        // navigate("/login");
      }
    };

    // Add delay for session propagation
    const timer = setTimeout(checkAuthState, 500);
    return () => clearTimeout(timer);
  }, [isLoaded, isSignedIn]);

  useEffect(() => {
    if (user) {
      console.log("Clerk user session:", {
        id: user.id,
        session: user.sessions,
        lastSignIn: user.lastSignInAt,
      });
    }
  }, [user]);

  if (!isLoaded || !userRole) {
    console.log("Rendering loading state", { isLoaded, userRole });
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="min-h-screen flex items-center justify-center"
      >
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
      </motion.div>
    );
  }

  console.log("Rendering protected content", { userRole });
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {children}
    </motion.div>
  );
}
