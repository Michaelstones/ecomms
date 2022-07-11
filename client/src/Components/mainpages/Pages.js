import { Suspense, useContext } from "react";
import { Routes, Route } from "react-router-dom";
import Register from "./auth/Register";
import Login from "./auth/Login";
import Products from "./products/Products";
import Carts from "./carts/Carts";
import ProdDetails from "./prodDetails/ProdDetails";
import Notfound from "./utils/Not-found";
import { GlobalsState } from "../../GlobalsState";
// const Cart = lazy(() => import("./carts/Carts"));

const Pages = () => {
  const state = useContext(GlobalsState);
  const { isLogged } = state?.userApi;
  const loggedIn = isLogged[0];

  return (
    <div>
      <Suspense fallback={<div>Loading</div>}>
        <Routes>
          <Route path="/" element={<Products />} />
          <Route path="/detail/:id" element={<ProdDetails />} />
          <Route path="/cart" element={<Carts />} />

          <Route path="/login" element={loggedIn ? <Notfound /> : <Login />} />
          <Route
            path="/register"
            element={loggedIn ? <Notfound /> : <Register />}
          />
          <Route path="*" element={<Notfound />} />
        </Routes>
      </Suspense>
    </div>
  );
};

export default Pages;
