import { useSelector } from "react-redux";
import { AppStore } from "../redux/store";
import { Navigate } from "react-router-dom";

interface ProtectedRouteProps {
  children: JSX.Element | JSX.Element[];
}

export function ProtectedRoute(props: ProtectedRouteProps) {
  const user = useSelector((state: AppStore) => state.user);
  
  if (!user.roles || user.roles.length === 0) {
    return <Navigate to="/login" />;
  }
  
  return <>{props.children}</>;
}

export default ProtectedRoute;
