import React, { useEffect, useState } from "react";
import { Box, Stack, Typography, Paper, Divider, Avatar } from "@mui/material";
import LocalOfferIcon from "@mui/icons-material/LocalOffer";
import InventoryIcon from "@mui/icons-material/Inventory"; // Icono para la cantidad
import AttachMoneyIcon from "@mui/icons-material/AttachMoney"; // Icono para el precio
import { IProduct, Product } from "./Product";
import { gateway } from "../gateway";
import { drawerWidth } from "./Sidebar";
import { FilterBar } from "./FilterBar";
import { useSelector } from "react-redux";
import _ from "lodash";

export const Store = () => {
  const [products, setProducts] = useState<IProduct[]>([]);
  const productState = useSelector((state: any) => state.productState);
  const getProducts = async (getProducts?: Partial<IProduct>) => {
    try {
      const filteredFilter = _.pickBy(getProducts, (value: any) => value !== null && value !== undefined && value !== "");

      const products = await gateway.get(`/products`, {
        params: {
          where: JSON.stringify(filteredFilter),
        },
      });
      setProducts(products.data.data.items);
    } catch (error) {}
  };

  useEffect(() => {
    getProducts();
  }, []);

  useEffect(() => {
    getProducts(productState);
  }, [productState]);

  return (
    <Box sx={{ width: "80%", padding: 2, alignSelf: "flex-start", ml: `${drawerWidth.max}px` }}>
      <Typography variant="h3" sx={{ mb: 4 }}>
        Store
      </Typography>
      <FilterBar></FilterBar>
      <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2, justifyContent: "flex-start" }}>
        {products.map((product) => (
          <Product key={product?.sku} product={product} />
        ))}
      </Box>
    </Box>
  );
};
