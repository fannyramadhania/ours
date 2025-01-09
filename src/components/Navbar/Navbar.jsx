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
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1440 320"
          className="block md:hidden"
        >
          <path
            fill="#FFDFDF"
            fillOpacity="1"
            d="M0,224L80,192C160,160,320,96,480,101.3C640,107,800,181,960,202.7C1120,224,1280,192,1360,176L1440,160L1440,0L1360,0C1280,0,1120,0,960,0C800,0,640,0,480,0C320,0,160,0,80,0L0,0Z"
          ></path>
        </svg>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1440 320"
          className="hidden md:block"
        >
          <path
            fill="#FFDFDF"
            fillOpacity="1"
            d="M0,64L80,85.3C160,107,320,149,480,149.3C640,149,800,107,960,85.3C1120,64,1280,64,1360,64L1440,64L1440,0L1360,0C1280,0,1120,0,960,0C800,0,640,0,480,0C320,0,160,0,80,0L0,0Z"
          ></path>
        </svg>
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
