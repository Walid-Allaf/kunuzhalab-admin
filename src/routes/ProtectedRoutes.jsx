import { Outlet, useNavigate } from "react-router";
import { useEffect } from "react";
import { Nav } from "../components";
import { CssBaseline } from "@mui/material";
import { useStateContext } from "../contexts/ContextProvider";

const ProtectedRoutes = () => {
  const { token } = useStateContext();
  const navigate = useNavigate();

  useEffect(() => {
    console.log(token);
    if (!token) {
      navigate("/login");
    }
  }, [token]);

  return (
    <div>
      <CssBaseline />
      <Nav />
      <Outlet />
    </div>
  );
};

export default ProtectedRoutes;
