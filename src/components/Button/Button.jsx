"use client";
import * as React from "react";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import { blue, deepOrange, grey, purple } from "@mui/material/colors";

const ColorButton = styled(Button)(({ theme }) => ({
  color:grey[800],
  backgroundColor:"transparent",
  "&:hover": {
    color: blue[500],
  },
}));

const ColorButton2 = styled(Button)(({ theme }) => ({
  color: theme.palette.getContrastText(blue[500]),
  backgroundColor: blue[500],
  "&:hover": {
    backgroundColor: blue[700],
  },
}));
export default function BasicButtons({ text, context }) {

  return context == "buttonText" ? (
    <ColorButton >{text}</ColorButton>
  ) : (
    <ColorButton2 >{text}</ColorButton2>
  );
}
