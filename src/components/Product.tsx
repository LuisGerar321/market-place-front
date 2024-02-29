import React, { useEffect, useRef, useState } from "react";
import { Paper, Stack, Avatar, Box, Typography, Divider, IconButton } from "@mui/material";
import LocalOfferIcon from "@mui/icons-material/LocalOffer";
import InventoryIcon from "@mui/icons-material/Inventory";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import CancelIcon from "@mui/icons-material/Cancel";
import { useDispatch } from "react-redux";
import { addToShoppingCart, removeToShoppingCart } from "../redux/features/shoppingCartStateSlice";

export interface ISeller {
  uid: string;
  email: string;
  name: string;
}
export interface IProduct {
  sku: string;
  name: string;
  quantity: number;
  priceUsd: number;
  seller: ISeller;
  createdAt: string;
  updatedAt: string;
}

interface ProductProps {
  product: IProduct;
}

export const Product: React.FC<ProductProps> = ({ product }) => {
  const [checked, setChecked] = useState<boolean | undefined>(undefined);
  const dispatch = useDispatch();
  const isFirstRender = useRef(true); // Ref para rastrear la primera renderización

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    if (checked === true) {
      dispatch(addToShoppingCart(product));
    }
    if (checked === false) {
      dispatch(removeToShoppingCart(product));
    }
  }, [checked]);

  return (
    <Paper
      elevation={2}
      sx={{
        padding: 2,
        width: {
          xs: "200px",
          md: "400px",
        },
        position: "relative",
        m: 1,
      }}
    >
      <Stack direction="row" spacing={2} alignItems="center">
        <Avatar>
          <LocalOfferIcon />
        </Avatar>
        <Box sx={{ flexGrow: 1 }}>
          <Typography variant="h6">{product.name}</Typography>
          <Typography variant="body1">SKU: {product.sku}</Typography>
          <Stack direction="row" alignItems="center" spacing={1}>
            <InventoryIcon />
            <Typography>Quantity: {product.quantity}</Typography>
          </Stack>
          <Stack direction="row" alignItems="center" spacing={1}>
            <AttachMoneyIcon />
            <Typography>Price: ${product.priceUsd}</Typography>
          </Stack>
        </Box>
      </Stack>
      <Divider sx={{ my: 1 }} />
      <Typography variant="body2" color="text.secondary">
        Listed on: {new Date(product.createdAt).toLocaleDateString()}
      </Typography>
      <IconButton
        sx={{ position: "absolute", top: 0, right: 0 }}
        onClick={() => {
          setChecked((prev) => (typeof prev !== "undefined" ? !prev : true));
        }}
      >
        {!checked ? <AddShoppingCartIcon color="primary"></AddShoppingCartIcon> : <CancelIcon></CancelIcon>}
      </IconButton>
    </Paper>
  );
};
