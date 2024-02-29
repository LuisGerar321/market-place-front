import { useState } from "react";
import Drawer from "@mui/material/Drawer";
import { Divider, List, IconButton, Toolbar, ListItem, ListItemButton, ListItemIcon, ListItemText } from "@mui/material";

import { ShoppingBag } from "@mui/icons-material";
import ListIcon from "@mui/icons-material/List";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import { appBarHeight } from "./AppBar";

import InventoryIcon from "@mui/icons-material/Inventory";
import StoreIcon from "@mui/icons-material/Store";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { useNavigate } from "react-router-dom";

export const drawerWidth = {
  min: 100,
  max: 220,
};

export const Sidebar = () => {
  const [open, setOpen] = useState(true);
  const navigate = useNavigate();
  let pages = [
    {
      icon: <StoreIcon></StoreIcon>,
      callback: () => {
        navigate("/store");
      },
      name: "Store",
    },

    {
      icon: <ShoppingCartIcon></ShoppingCartIcon>,
      callback: () => {
        navigate("/shopping-cart");
      },
      name: "Cart",
    },
    {
      icon: <InventoryIcon></InventoryIcon>,
      callback: () => {
        navigate("/inventory");
      },
      name: "Inventory",
    },
  ];

  return (
    <>
      <Drawer
        sx={{
          width: open ? drawerWidth.max : drawerWidth.min,
          transition: (theme) =>
            theme.transitions.create("width", {
              easing: theme.transitions.easing.sharp,
              duration: theme.transitions.duration.enteringScreen,
            }),
          flexShrink: 0,
          position: "relative",
          "& .MuiDrawer-paper": {
            width: open ? drawerWidth.max : drawerWidth.min,
            transition: (theme) =>
              theme.transitions.create("width", {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.enteringScreen,
              }),
            boxSizing: "border-box",
            backgroundColor: "whitesmoke",
            marginTop: `${appBarHeight}px`,
            top: 0,
          },
          display: {
            xs: "none",
            md: "flex",
          },
        }}
        variant="permanent"
        anchor="left"
      >
        <Toolbar>
          <IconButton
            onClick={() => setOpen(!open)}
            sx={{
              position: "absolute",
              right: 10,
              transform: !open ? "translateX(-60%)" : "translateX(10)",
              transition: (theme) =>
                theme.transitions.create("transform", {
                  easing: theme.transitions.easing.sharp,
                  duration: theme.transitions.duration.enteringScreen,
                }),
            }}
          >
            {!open ? (
              <ListIcon></ListIcon>
            ) : (
              <ArrowBackIosIcon
                // sx={{ color: "white" }}
                fontSize="small"
              ></ArrowBackIosIcon>
            )}
          </IconButton>
        </Toolbar>

        <Divider></Divider>
        <List>
          {pages.map((page, index) => (
            <ListItem key={`${"roleType"}-${index}-md-sidebar`}>
              <ListItemButton
                onClick={() => {
                  page.callback();
                }}
              >
                <ListItemIcon sx={{ color: "black" }}>{page.icon}</ListItemIcon>
                <ListItemText
                  sx={{
                    margin: 0,
                    padding: 0,
                    opacity: open ? 1 : 0,
                    color: "black",
                    transition: (theme) =>
                      theme.transitions.create("opacity", {
                        easing: theme.transitions.easing.sharp,
                        duration: theme.transitions.duration.enteringScreen,
                      }),
                    // Añadir overflow y whiteSpace para manejar el texto cuando está oculto
                    overflow: "hidden",
                    whiteSpace: "nowrap",
                  }}
                >
                  {page.name}
                </ListItemText>
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Drawer>
    </>
  );
};
