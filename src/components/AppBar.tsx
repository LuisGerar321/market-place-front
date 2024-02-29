import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Avatar from "@mui/material/Avatar";
import Stack from "@mui/material/Stack";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

export const appBarHeight = 64;

export default function NavBarApp() {
  const navigate = useNavigate();
  const userState = useSelector((state: any) => state.userState);

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="fixed" sx={{ height: `${appBarHeight}px`, backgroundColor: "blueviolet" }}>
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Market Place App
          </Typography>
          {userState.roleId >= 1 ? (
            <Button
              color="inherit"
              onClick={() => {
                localStorage.removeItem("token");
                navigate("/");
                window.location.reload();
              }}
            >
              <Stack direction="row" spacing={2} alignItems="center">
                <Avatar src="/path/to/your/generic/image.jpg" />
                <Typography>{userState.name}: Log out</Typography>
              </Stack>
            </Button>
          ) : (
            <Button
              color="inherit"
              onClick={() => {
                navigate("/signin");
              }}
            >
              <Stack direction="row" spacing={2} alignItems="center">
                <Avatar src="/path/to/your/generic/image.jpg" />
                <Typography>Sign In</Typography>
              </Stack>
            </Button>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
}
