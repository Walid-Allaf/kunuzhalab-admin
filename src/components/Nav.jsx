import {
  Box,
  Divider,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Typography,
} from "@mui/material";
import React from "react";
import { useNavigate } from "react-router";
import { useLocation } from "react-router-dom";
import { useStateContext } from "../contexts/ContextProvider";

const Nav = () => {
  const navigate = useNavigate();
  const param = useLocation();
  const { setToken } = useStateContext();

  const routes = [
    { title: "Home", path: "/" },
    { title: "Soaps", path: "/soaps" },
    { title: "Stories", path: "/stories" },
    { title: "Image Slider", path: "/image-slider" },
    { title: "Team Members", path: "/team-members" },
  ];

  return (
    <Box>
      <List
        sx={{ display: "flex", gap: 2, px: 4, alignItems: "center", bgcolor: "secondary.main" }}
      >
        {routes.map((route, index) => (
          <ListItem
            key={index}
            disablePadding
            onClick={() => navigate(route.path)}
            sx={{
              bgcolor: param.pathname === route.path ? "primary.main" : "",
              transition: "0.3s",
              ":hover": {
                bgcolor: "primary.main",
              },
            }}
          >
            <ListItemButton>
              <ListItemText primary={route.title} sx={{ color: "#FFF", textAlign: "center" }} />
            </ListItemButton>
          </ListItem>
        ))}
        <ListItem
          disablePadding
          // onClick={() => setToken(null)}
          sx={{
            transition: "0.3s",
            ":hover": {
              bgcolor: "primary.main",
            },
          }}
        >
          <ListItemButton onClick={() => setToken(null)}>
            <ListItemText primary={"Logout"} sx={{ color: "#FFF", textAlign: "center" }} />
          </ListItemButton>
        </ListItem>
      </List>
      <Divider />
    </Box>
  );
};

export default Nav;
