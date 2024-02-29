import React, { useState, ChangeEvent, FormEvent } from "react";
import { Box, TextField, Button, Typography, Stack, Slide, Alert, Link } from "@mui/material";
import { gateway } from "../gateway";
import { AxiosError } from "axios";
import { useNavigate } from "react-router-dom";
import { updateUser } from "../redux/features/userStateSlice";
import { useDispatch } from "react-redux";
import { decodeToken } from "./validateToken";

export enum statusMessageCode {
  WARNING = "warning",
  SUCCESS = "success",
  ERROR = "error",
}

const SignInForm = () => {
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [showMessage, setShowMessage] = useState(false);
  const [message, setMessage] = useState({ status: statusMessageCode.WARNING, describe: "" });

  const [errors, setErrors] = useState({
    email: "",
    password: "",
  });

  const validateForm = () => {
    let tempErrors = { email: "", password: "" };
    let isValid = true;

    if (!credentials.email) {
      tempErrors.email = "Email is required";
      isValid = false;
    }
    if (!credentials.password) {
      tempErrors.password = "Password is required";
      isValid = false;
    }

    setErrors(tempErrors);
    return isValid;
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setCredentials({ ...credentials, [name]: value });
  };

  const handleSubmit = async (event?: FormEvent<HTMLFormElement>) => {
    event?.preventDefault();

    if (validateForm()) {
      try {
        const res = await gateway.post("/auth", credentials);

        setMessage({ status: statusMessageCode.SUCCESS, describe: "Login successful." });
        localStorage.setItem("token", res.data.data.token ?? "");
        console.log(res.data.data);

        const userInfo: any = decodeToken(res.data.data.token);
        console.log(userInfo);
        dispatch(
          updateUser({
            name: userInfo.dataValues.name,
            email: userInfo.dataValues.email,
            roleId: userInfo.dataValues.roleId,
          }),
        );
        navigate("/");
      } catch (error) {
        const axiosError = error as AxiosError;
        const message = (axiosError?.response?.data as any)?.message ?? "An error occurred during login.";
        setMessage({ status: statusMessageCode.ERROR, describe: message });
      } finally {
        setShowMessage(true);
      }
    }
  };

  return (
    <Box component="form" sx={{ m: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }} noValidate autoComplete="off" onSubmit={handleSubmit}>
      <Typography variant="h6" gutterBottom>
        Sign In
      </Typography>

      <Stack spacing={2} sx={{ mb: 2 }}>
        <TextField required id="email" label="Email" name="email" value={credentials.email} onChange={handleChange} error={!!errors.email} helperText={errors.email} />
        <TextField
          required
          id="password"
          label="Password"
          name="password"
          type="password"
          value={credentials.password}
          onChange={handleChange}
          error={!!errors.password}
          helperText={errors.password}
        />
      </Stack>

      <Button type="submit" variant="contained" sx={{ mt: 3, ml: 1 }}>
        Sign In
      </Button>

      <Button
        onClick={() => {
          navigate("/signup");
        }}
      >
        {" "}
        Don't have an account? Create one.
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

export default SignInForm;
