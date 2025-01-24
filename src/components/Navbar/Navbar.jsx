"use client";
import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import AdbIcon from "@mui/icons-material/Adb";
import BasicButtons from "../Button/Button";
import { NoSsr } from "@mui/material";
import { Router, useRouter } from "next/navigation";
import Link from "next/link";
import { useAuthStore } from "@/hooks/useAuth";
import toast from "react-hot-toast";
import axios from "axios";
import { Logout } from "@mui/icons-material";
import { KeyboardBackspace } from "@mui/icons-material";

// For mobile and tablet screen sizes
const pages = ["History", "Wishlist", "Picture"];
const settings = ["Profile", "Account", "Dashboard", "Logout"];

function Navbar() {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const router = useRouter();
  const { clearUser } = useAuthStore();
  const logoutFunc = async (data) => {
    console.log("Data login:", data);

    let config = {
      method: "delete",
      maxBodyLength: Infinity,
      url: `${process.env.NEXT_PUBLIC_API_URL}/api/auth/login`,
    };

    // Buat promise request
    const requestPromise = axios(config);

    toast.promise(requestPromise, {
      loading: "Process for logout",
      success: (response) => {
        if (response.status === 200 || response.status === 201) {
          clearUser();
          router.push("/login");
        }

        return "Logout successful";
      },
      error: (error) => {
        console.log("error", error);
        return (
          error?.response?.data?.message ||
          "Something went wrong, please contact our team"
        );
      },
    });
  };

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <>
      <NoSsr />
      <div className="relative">
        {/* SVG background wave */}
       
        <Link href={"/"}>
          <KeyboardBackspace className="w-9 absolute top-4 left-4 text-gray-600 hover:text-black cursor-pointer" />
        </Link>

        {/* Logout icon */}

        <div onClick={() => logoutFunc()}>
          <Logout className="w-8 absolute top-4 right-4 text-red-500 hover:text-black cursor-pointer" />
        </div>
      </div>
    </>
  );
}

export default Navbar;
