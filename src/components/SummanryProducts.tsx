import * as React from "react";
import { useEffect, useState } from "react";
import { Box, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TablePagination, Typography, Stack } from "@mui/material";
import { IProduct } from "./Product";
import { AxiosResponse } from "axios";
import { gateway } from "../gateway";
import _ from "lodash";
import { useSelector } from "react-redux";
import { FilterBar } from "./FilterBar";
import { drawerWidth } from "./Sidebar";

export default function DenseTable() {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [productData, setProductData] = useState({ items: [], totalItems: 0, totalPages: 0 });
  const productState = useSelector((state: any) => state.productState);

  const getProducts = async (getProducts?: Partial<IProduct>, page?: number, pageSize?: number) => {
    try {
      const filteredFilter = _.pickBy(getProducts, (value: any) => value !== null && value !== undefined && value !== "");

      const products = await gateway.get(`/products`, {
        params: {
          where: JSON.stringify(filteredFilter),
          page,
          pageSize,
        },
      });

      setProductData(products.data.data);
    } catch (error) {}
  };

  useEffect(() => {
    getProducts(productState, page + 1, rowsPerPage);
  }, []);

  useEffect(() => {
    getProducts(productState, page + 1, rowsPerPage);
  }, [productState, page, rowsPerPage]);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <Box sx={{ width: "80%", padding: 2, display: "flex", alignSelf: "flex-start", justifySelf: "flex-start", flexDirection: "column", ml: `${drawerWidth.max}px` }}>
      <Typography variant="h3" sx={{ mb: 4 }}>
        {" "}
        Inventory
      </Typography>

      <Stack sx={{ width: "100%" }} spacing={4}>
        <FilterBar></FilterBar>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 500 }} aria-label="a dense table">
            <TableHead>
              <TableRow>
                <TableCell>Product Name</TableCell>
                <TableCell align="right">Product Quantity</TableCell>
                <TableCell align="right">Product Price USD</TableCell>
                <TableCell align="right">Seller Name</TableCell>
                <TableCell align="right">Seller Email</TableCell>
                <TableCell align="right">Created At</TableCell>
                <TableCell align="right">Updated At</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {productData.items.map((row: IProduct) => (
                <TableRow key={row.sku}>
                  <TableCell component="th" scope="row">
                    {row.name}
                  </TableCell>
                  <TableCell align="right">{row.quantity}</TableCell>
                  <TableCell align="right">{row.priceUsd}</TableCell>
                  <TableCell align="right">{row.seller.name}</TableCell>
                  <TableCell align="right">{row.seller.email}</TableCell>
                  <TableCell align="right">{row.createdAt}</TableCell>
                  <TableCell align="right">{row.updatedAt}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={productData.totalItems}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Stack>
    </Box>
  );
}
