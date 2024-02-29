import React, { useState, ChangeEvent, FormEvent } from "react";
import { Box, TextField, Button, Typography, Stack, IconButton, Slide, Alert } from "@mui/material";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { gateway } from "../gateway";
import { AxiosError } from "axios";

export enum statusMessageCode {
  WARMING = "warning",
  SUCCESS = "success",
  ERROR = "error",
}

const token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhVmFsdWVzIjp7InVpZCI6IjY3ODUxMzNhLTE0ODQtNGFhOS1iZjFlLTJiNmUzY2E1MGIzNiIsImVtYWlsIjoibWFyaWFuYUBnbWFpbC5jb20iLCJuYW1lIjoiTWFyaWFuYSBNZW5kb3phIiwicGFzc3dvcmQiOiIkMmIkMDQkb1pKbTMzRUhCNm1QaVVBTWVENktTLlJpcjBNQ2VTUk1WNmEycTRjVTJ3dXUvNTkzMGhvdkMiLCJjcmVhdGVkQXQiOiIyMDI0LTAyLTI5VDE5OjEzOjI2LjQ2NloiLCJ1cGRhdGVkQXQiOiIyMDI0LTAyLTI5VDE5OjEzOjI2LjQ2NloiLCJyb2xlSWQiOjJ9LCJfcHJldmlvdXNEYXRhVmFsdWVzIjp7InVpZCI6IjY3ODUxMzNhLTE0ODQtNGFhOS1iZjFlLTJiNmUzY2E1MGIzNiIsImVtYWlsIjoibWFyaWFuYUBnbWFpbC5jb20iLCJuYW1lIjoiTWFyaWFuYSBNZW5kb3phIiwicGFzc3dvcmQiOiIkMmIkMDQkb1pKbTMzRUhCNm1QaVVBTWVENktTLlJpcjBNQ2VTUk1WNmEycTRjVTJ3dXUvNTkzMGhvdkMiLCJjcmVhdGVkQXQiOiIyMDI0LTAyLTI5VDE5OjEzOjI2LjQ2NloiLCJ1cGRhdGVkQXQiOiIyMDI0LTAyLTI5VDE5OjEzOjI2LjQ2NloiLCJyb2xlSWQiOjJ9LCJ1bmlxbm8iOjEsIl9jaGFuZ2VkIjp7fSwiX29wdGlvbnMiOnsiaXNOZXdSZWNvcmQiOmZhbHNlLCJfc2NoZW1hIjpudWxsLCJfc2NoZW1hRGVsaW1pdGVyIjoiIiwicmF3Ijp0cnVlLCJhdHRyaWJ1dGVzIjpbInVpZCIsImVtYWlsIiwibmFtZSIsInBhc3N3b3JkIiwiY3JlYXRlZEF0IiwidXBkYXRlZEF0Iiwicm9sZUlkIl19LCJpc05ld1JlY29yZCI6ZmFsc2UsImlhdCI6MTcwOTIzNDAyM30.onBGWVwfN_hRiqm2gdCOwRqXN8Rv8WM4acam8-enGJE";
const ProductForm = () => {
  const [product, setProduct] = useState({
    name: "",
    quantity: "",
    priceUsd: "",
  });

  const [showMessage, setShowMessage] = useState(false);
  const [message, setMessage] = useState({ status: statusMessageCode.WARMING, describe: "" });

  const [errors, setErrors] = useState({
    name: "",
    quantity: "",
    priceUsd: "",
  });

  const validateForm = () => {
    let tempErrors = { name: "", quantity: "", priceUsd: "" };

    let isValid = true;

    if (!product.name) {
      tempErrors.name = "Name is required";
      isValid = false;
    }
    if (!product.quantity) {
      tempErrors.quantity = "Quantity is required";
      isValid = false;
    }
    if (!product.priceUsd) {
      tempErrors.priceUsd = "Price is required";
      isValid = false;
    }

    setErrors(tempErrors);
    return isValid;
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setProduct({ ...product, [name]: value });
  };

  const handleSubmit = async (event?: FormEvent<HTMLFormElement>) => {
    if (event) event.preventDefault();

    if (validateForm()) {
      console.log(product);
      try {
        const res = await gateway.post("/products", product, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const dataObj = res.data.data;

        setMessage({ status: statusMessageCode.SUCCESS, describe: "Product created Sucessfully." });
      } catch (error) {
        const { message } = (error as AxiosError)?.response?.data as any;
        setMessage({ status: statusMessageCode.ERROR, describe: message ?? "Error occurs on creation" });
      } finally {
        setShowMessage(true);
      }
    }
  };

  return (
    <Box component="form" sx={{ m: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }} noValidate autoComplete="off" onSubmit={handleSubmit}>
      <Typography variant="h6" gutterBottom>
        Create a product
      </Typography>

      <Stack spacing={2} sx={{ mb: 2 }}>
        <TextField required id="name" label="Name" name="name" value={product.name} onChange={handleChange} error={!!errors.name} helperText={errors.name} />
        <TextField required id="quantity" label="Quantity" name="quantity" type="number" value={product.quantity} onChange={handleChange} error={!!errors.quantity} helperText={errors.quantity} />
        <TextField required id="priceUsd" label="Price (USD)" name="priceUsd" type="number" value={product.priceUsd} onChange={handleChange} error={!!errors.priceUsd} helperText={errors.priceUsd} />
      </Stack>

      <Button type="submit" variant="contained" sx={{ mt: 3, ml: 1 }}>
        Crear
      </Button>

      <Slide direction="left" in={showMessage} mountOnEnter unmountOnExit>
        <Alert
          severity={message.status}
          onClose={() => {
            setShowMessage(false);
          }}
          sx={{ overflow: "hidden" }}
        >
          {message.describe}
        </Alert>
      </Slide>
    </Box>
  );
};

export default ProductForm;
