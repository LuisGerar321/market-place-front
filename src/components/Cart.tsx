import { Box, Button, Divider, List, ListItem, ListItemIcon, ListItemText, Typography } from "@mui/material";
import { drawerWidth } from "./Sidebar";
import { useSelector } from "react-redux";
import { IProduct } from "./Product";
import { LocalOffer } from "@mui/icons-material";

export const Cart = () => {
  const shoppingState = useSelector((state: any) => state.shoppingState);
  const totalCost = shoppingState.shoppingCart.reduce((acc: number, val: IProduct) => acc + val.priceUsd, 0);

  return (
    <Box sx={{ width: "80%", padding: 2, display: "flex", alignSelf: "flex-start", justifySelf: "flex-start", flexDirection: "column", ml: `${drawerWidth.max}px` }}>
      <Typography variant="h3" sx={{ mb: 4 }}>
        Shopping Cart
      </Typography>

      <Divider></Divider>
      <List>
        {shoppingState.shoppingCart.map((val: IProduct, index: number) => (
          <ListItem key={`shoppinProduct-${index}`}>
            <ListItemIcon>
              <LocalOffer></LocalOffer>
            </ListItemIcon>
            <ListItemText primary={val.name} secondary={`SKU: ${val.sku} - Quantity: ${val.quantity}`} />
            <Typography variant="body1" sx={{ marginLeft: "auto" }}>
              ${val.priceUsd.toFixed(2)}
            </Typography>
          </ListItem>
        ))}
      </List>
      <Divider></Divider>
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mt: 2 }}>
        <Typography variant="h6">Total Cost: ${totalCost.toFixed(2)}</Typography>
        <Button variant="contained" color="primary">
          Checkout
        </Button>
      </Box>
    </Box>
  );
};
