import axios from "axios";
import { createContext, useEffect, useState } from "react";
import ProductsApi from "./api/ProductsApi";
import UserApi from "./api/UserApi";
import CategoryApi from "./api/CategoryApi";

export const GlobalsState = createContext();

export const DataProvider = ({ children }) => {
  const [token, setToken] = useState(false);

  useEffect(() => {
    const first = localStorage.getItem("firstTimer");
    if (first) {
      const refreshToken = async () => {
        const res = await axios.get(
          `https://ecommerceapiiii.herokuapp.com/api/v1/refresh_token`
        );
        setToken(res.data.accesstoken);
      };
      setTimeout(() => {
        refreshToken();
      }, 600 * 1000);
      refreshToken();
    }
  }, []);
  const state = {
    token: [token, setToken],
    products: ProductsApi(),
    userApi: UserApi(token),
    CategoryApi: CategoryApi(),
  };
  return (
    <GlobalsState.Provider value={state}>{children}</GlobalsState.Provider>
  );
};
