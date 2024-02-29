import React, { useState, ChangeEvent, FormEvent } from "react";
import { Box, TextField, Button, Typography, Stack, Slide, Alert } from "@mui/material";
import { gateway } from "../gateway";
import { AxiosError } from "axios";
import { useNavigate } from "react-router-dom";

export enum statusMessageCode {
  WARNING = "warning",
  SUCCESS = "success",
  ERROR = "error",
}

const UserForm = () => {
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    passwordRepeat: "",
  });

  const navigate = useNavigate();

  const [showMessage, setShowMessage] = useState(false);
  const [message, setMessage] = useState({ status: statusMessageCode.WARNING, describe: "" });

  const [errors, setErrors] = useState({
    name: "",
    email: "",
    password: "",
    passwordRepeat: "",
  });

  const validateForm = () => {
    let tempErrors = { ...errors, name: "", email: "", password: "", passwordRepeat: "" };
    let isValid = true;

    // Validaciones básicas
    if (!user.name) {
      tempErrors.name = "Name is required";
      isValid = false;
    }
    if (!user.email) {
      tempErrors.email = "Email is required";
      isValid = false;
    }
    if (!user.password) {
      tempErrors.password = "Password is required";
      isValid = false;
    }
    if (!user.passwordRepeat || user.password !== user.passwordRepeat) {
      tempErrors.passwordRepeat = "Passwords must match";
      isValid = false;
    }

    setErrors(tempErrors);
    return isValid;
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setUser({ ...user, [name]: value });
  };

  const handleSubmit = async (event?: FormEvent<HTMLFormElement>) => {
    event?.preventDefault();

    if (validateForm()) {
      try {
        const res = await gateway.post("/users", { name: user.name, email: user.email, password: user.password });

        setMessage({ status: statusMessageCode.SUCCESS, describe: "User created successfully." });
      } catch (error) {
        const axiosError = error as AxiosError;
        const message = (axiosError?.response?.data as any)?.message ?? "Error occurs on creation";
        setMessage({ status: statusMessageCode.ERROR, describe: message });
      } finally {
        setShowMessage(true);
      }
    }
  };

  return (
    <Box component="form" sx={{ m: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }} noValidate autoComplete="off" onSubmit={handleSubmit}>
      <Typography variant="h6" gutterBottom>
        Create a User Account
      </Typography>

      <Stack spacing={2} sx={{ mb: 2 }}>
        <TextField required id="name" label="Name" name="name" value={user.name} onChange={handleChange} error={!!errors.name} helperText={errors.name} />
        <TextField required id="email" label="Email" name="email" value={user.email} onChange={handleChange} error={!!errors.email} helperText={errors.email} />
        <TextField required id="password" label="Password" name="password" type="password" value={user.password} onChange={handleChange} error={!!errors.password} helperText={errors.password} />
        <TextField
          required
          id="passwordRepeat"
          label="Repeat Password"
          name="passwordRepeat"
          type="password"
          value={user.passwordRepeat}
          onChange={handleChange}
          error={!!errors.passwordRepeat}
          helperText={errors.passwordRepeat}
        />
      </Stack>

      <Button type="submit" variant="contained" sx={{ mt: 3, ml: 1 }}>
        Create
      </Button>
      <Button
        onClick={() => {
          navigate("/signin");
        }}
      >
        or Sigin with account credentials.
      </Button>
      <Slide direction="up" in={showMessage} mountOnEnter unmountOnExit>
        <Alert
          severity={message.status}
          onClose={() => {
            setShowMessage(false);
          }}
          sx={{ width: "100%" }}
        >
          {message.describe}
        </Alert>
      </Slide>
    </Box>
  );
};

export default UserForm;
