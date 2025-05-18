import { useAuth } from "../context/AuthContext";
import CenterContainer from "../layouts/CenterContainer";
import { LoaderPuff } from "../components/Loader";

export default function ActiveMemberRoute({ children }) {
  const { user, loading } = useAuth();
  if (loading) return <CenterContainer><LoaderPuff /></CenterContainer>;

  return user?.status === 'active' ? children : <CenterContainer><p>Oppss.. your account is not active. </p><p>You cant access this page. Please Contact Admin</p></CenterContainer>;
}
