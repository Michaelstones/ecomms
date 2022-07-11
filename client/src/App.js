import { useContext } from "react";
import { GlobalsState } from "./GlobalsState";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./Components/headers/Header";
// import Pages from "./Components/mainpages/Pages";
import Carts from "./Components/mainpages/carts/Carts";
import ProdDetails from "./Components/mainpages/prodDetails/ProdDetails";
import Register from "./Components/mainpages/auth/Register";
import Login from "./Components/mainpages/auth/Login";
import Notfound from "./Components/mainpages/utils/Not-found";
import Products from "./Components/mainpages/products/Products";
import OrderHistory from "./Components/mainpages/OrderHistory/orderHistory";
import OrderDetails from "./Components/mainpages/OrderHistory/orderDetails";
import Category from "./Components/mainpages/category/Category";
import Createproduct from "./Components/mainpages/CreateProduct/createproduct";

function App() {
  const state = useContext(GlobalsState);
  const { isLogged } = state?.userApi;
  const loggedIn = isLogged[0];
  const admin = isLogged[1];
  return (
    <div className="App">
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Products />} />
          <Route path="/login" element={loggedIn ? <Notfound /> : <Login />} />
          <Route
            path="/register"
            element={loggedIn ? <Notfound /> : <Register />}
          />
          <Route path="/detail/:id" element={<ProdDetails />} />
          <Route path="/cart" element={<Carts />} />

          <Route
            path="/history"
            element={loggedIn ? <OrderHistory /> : <Notfound />}
          />
          <Route
            path="/history/:id"
            element={loggedIn ? <OrderDetails /> : <Notfound />}
          />
          <Route
            path="/category"
            element={admin ? <Category /> : <Notfound />}
          />
          <Route
            path="/products"
            element={admin ? <Createproduct /> : <Notfound />}
          />
          <Route
            path="/edit_product/:id"
            element={admin ? <Createproduct /> : <Notfound />}
          />

          <Route path="*" element={<Notfound />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
