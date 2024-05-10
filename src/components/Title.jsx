import { Typography } from "@mui/material";
import React from "react";

const Title = ({ text }) => {
  return (
    <Typography
      sx={{ padding: "15px 0px", fontSize: "1.5rem", fontWeight: "600" }}
    >
      {text}
    </Typography>
  );
};

export default Title;
