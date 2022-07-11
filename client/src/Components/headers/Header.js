import { useContext, useState } from "react";
import { GlobalsState } from "./../../GlobalsState";
import { Link } from "react-router-dom";
import menu from "./icons/menu.svg";
import close from "./icons/close.svg";
import carts from "./icons/carts.svg";
import axios from "axios";

const Header = () => {
  const state = useContext(GlobalsState);
  const [toggle, setToggle] = useState(false);
  const { cartz } = state?.userApi;
  const cart = cartz[0];

  const { isAdmin } = state.userApi;
  const admin = isAdmin[0];

  const { isLogged } = state?.userApi;
  const logged = isLogged[0];

  const refresh = () => {
    setTimeout(() => {
      window.location.reload();
    }, 1500);
  };

  const logOutHandler = async () => {
    await axios.get("/api/v1/logout");
    localStorage.removeItem("firstTimer");
    window.location.href = "/";
  };

  const isAdminRoute = () => {
    return (
      <>
        <li>
          <Link to="/products">create products</Link>
        </li>
        <li>
          <Link to="/category">create category</Link>
        </li>
      </>
    );
  };

  const loggedRoute = () => {
    return (
      <>
        <li>
          <Link to="/history">History</Link>
        </li>
        <li>
          <Link to="/" onClick={logOutHandler}>
            Logout
          </Link>
        </li>
      </>
    );
  };

  const toggleMenu = () => {
    return setToggle(!toggle);
  };
  const styleMenu = { left: toggle ? 0 : "-100%" };
  return (
    <header>
      <div className="menu" onClick={() => setToggle(!toggle)}>
        <img src={menu} width="30" alt="menu" />
      </div>
      <div className="logo">
        <h1>
          <Link to="/">{admin ? "Admin" : `King's Shop`}</Link>
        </h1>
      </div>
      <ul style={styleMenu}>
        <li>
          <Link to="/">{admin ? "Products" : "Shop"}</Link>
        </li>
        {admin && isAdminRoute()}
        {logged ? (
          loggedRoute()
        ) : (
          <li>
            <Link to="/login">Login ✥ Register</Link>
          </li>
        )}
        <li onClick={() => setToggle(!toggle)}>
          <img src={close} alt="close" width="30" className="menu" />
        </li>
      </ul>
      {admin ? (
        ""
      ) : (
        <div className="cart-icons">
          <span>{cart?.length || 0}</span>
          <Link to="/cart" onClick={refresh}>
            <img src={carts} alt="cart" width="30" />
          </Link>
        </div>
      )}
    </header>
  );
};

export default Header;
