import { redirect, useLocation, useNavigate, useParams } from "react-router-dom";
import { gateway } from "../gateway";
import React, { useEffect, useState } from "react";
import { updateUser } from "../redux/features/userStateSlice";
import { useDispatch } from "react-redux";
import { jwtDecode } from "jwt-decode";
import { update } from "lodash";

export const decodeToken = (token: string) => {
  try {
    const decoded = jwtDecode(token);
    return decoded;
  } catch (error) {
    // Manejo de errores en caso de que el token sea inválido o haya expirado
    console.error("Error al decodificar el token:", error);
    throw error;
  }
};

export const ValidateToken: React.FC<any> = ({ children }) => {
  const token = localStorage.getItem("token");
  const [isValidToken, setIsValidToken] = useState(false);

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const validateToken = async (token: string) => {
    console.log("input token: ", token);
    try {
      const response = await gateway.get(`/tokens/validate`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      console.log(response.data);

      if (response.data?.status === 200) {
        const userInfo: any = decodeToken(token);
        dispatch(
          updateUser({
            name: userInfo.dataValues.name,
            email: userInfo.dataValues.email,
            roleId: userInfo.dataValues.roleId,
          }),
        );
        console.log(userInfo);
      }
    } catch (error) {
      console.log(error);
      navigate("/signin");
    }
  };

  useEffect(() => {
    if (token) {
      validateToken(token).then(() => {
        setIsValidToken(true);
      });
    }
  }, []);

  return <>{isValidToken ? children : <></>}</>;
};
