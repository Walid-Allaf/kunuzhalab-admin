import { Navigate, Outlet } from "react-router-dom";
import { useStateContext } from "../contexts/ContextProvider";

const PublicRoutes = () => {
  const { token } = useStateContext();

  if (token) {
    return <Navigate to="/" />;
  }

  return (
    <div id="guestLayout">
      <Outlet />
    </div>
  );
};

export default PublicRoutes;
