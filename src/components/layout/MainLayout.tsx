import { AppBar, Box } from "@mui/material";
import React, { ReactNode } from "react";
import NavBarApp, { appBarHeight } from "../AppBar";
import { Sidebar } from "../Sidebar";

interface MainLayoutProps {
  children?: ReactNode;
}

export const MainLayout = ({ children }: MainLayoutProps) => {
  return (
    <Box sx={{ width: "100vw", height: "100vh", display: "flex", flexDirection: "column", marginTop: `${appBarHeight}px` }}>
      <NavBarApp></NavBarApp>
      <Sidebar></Sidebar>
      <Box sx={{ width: "100%", height: "100%", display: "flex", justifyContent: "center", alignItems: "center" }}>{children}</Box>
    </Box>
  );
};
