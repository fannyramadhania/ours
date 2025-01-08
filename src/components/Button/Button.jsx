"use client";
import * as React from "react";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import { blue, deepOrange, grey, purple, red } from "@mui/material/colors";

const ColorButton = styled(Button)(({ theme }) => ({
  color:grey[800],
  backgroundColor:"transparent",
  "&:hover": {
    color: blue[500],
  },
}));

const ColorButton2 = styled(Button)(({ theme }) => ({
  color: theme.palette.getContrastText(red[500]),
  backgroundColor: red[700],
  "&:hover": {
    backgroundColor: red[700],
  },
}));

export default function BasicButtons({ text, context }) {

  return context == "buttonText" ? (
    <ColorButton >{text}</ColorButton>
  ) : (
    <ColorButton2 >{text}</ColorButton2>
  );
}
