import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import CenterContainer from "../layouts/CenterContainer";
import { LoaderPuff } from "../components/Loader";

export default function AdminRoute({ children }) {
  const { user, loading } = useAuth();

  if (loading) return <CenterContainer><LoaderPuff /></CenterContainer>;

  return user.role === 'admin' ? children : <CenterContainer><p>Oppss.. your not an admin</p><p>You cant access this page</p></CenterContainer>;
}
