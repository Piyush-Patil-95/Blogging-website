import { Navigate } from "react-router-dom";
import { useUser } from "../context/UserContext"; // adjust path if needed

export default function ProtectedRoute({ children }) {
  const { user } = useUser();

  // if user is not logged in, redirect to login page
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return children;
}
