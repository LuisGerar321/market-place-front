import React from "react";
import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { MainLayout } from "./components/layout/MainLayout";
import { Store } from "./components/Store";
import { Typography } from "@mui/material";
import { Cart } from "./components/Cart";
import { Inventory } from "./components/Inventory";
import { Provider, useSelector } from "react-redux";
import { store } from "./redux/store";
import SummanryProducts from "./components/SummanryProducts";
import UserForm from "./components/SignupForm";
import SignInForm from "./components/SigninForm";
import { ValidateToken } from "./components/validateToken";
import ProductForm from "./components/ProductForm";

function App() {
  const userState = useSelector((state: any) => state.userState);

  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <MainLayout>
                <Typography variant="h1">Welcome back!</Typography>
              </MainLayout>
            }
          />
          <Route
            path="/store"
            element={
              <MainLayout>
                <Store></Store>
              </MainLayout>
            }
          />
          <Route
            path="/shopping-cart"
            element={
              <MainLayout>
                <ValidateToken>
                  <Cart></Cart>
                </ValidateToken>
              </MainLayout>
            }
          />
          <Route
            path="/inventory"
            element={
              <MainLayout>
                <ValidateToken>{userState.roleId === 1 ? <SummanryProducts></SummanryProducts> : userState.roleId === 2 ? <ProductForm></ProductForm> : <></>}</ValidateToken>
              </MainLayout>
            }
          />

          <Route
            path="/signin"
            element={
              <MainLayout>
                <SignInForm></SignInForm>
              </MainLayout>
            }
          />
          <Route
            path="/signup"
            element={
              <MainLayout>
                <UserForm></UserForm>
              </MainLayout>
            }
          />
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
