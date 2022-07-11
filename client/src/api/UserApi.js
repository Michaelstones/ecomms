import { useEffect, useState } from "react";
import axios from "axios";

const UserApi = (token) => {
  const [isLogged, setIsLogged] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [cart, setCart] = useState([]);
  const [history, setHistory] = useState([]);
  // console.log(cart.length);

  useEffect(() => {
    if (token) {
      const getcurrUser = async () => {
        try {
          const res = await axios.get(
            `https://ecommerceapiiii.herokuapp.com/api/v1/auth`,
            {
              headers: { Authorization: token },
            }
          );
          setIsLogged(true);
          res.data.role === 1 ? setIsAdmin(true) : setIsAdmin(false);
          setCart(res.data.cart);
          // console.log(cart);
        } catch (error) {
          alert(error.response.data.msg);
        }
      };
      getcurrUser();
    }
  }, [token]);

  // useEffect(() => {
  //   if (token) {
  //     const getHistory = async () => {
  //       if (isAdmin) {
  //         const res = await axios.get("https://ecommerceapiiii.herokuapp.com/api/v1/history", {
  //           headers: { Authorization: token },
  //         });
  //         setHistory(res.data);
  //       } else {
  //         const res = await axios.get("/api/v1/history", {
  //           headers: { Authorization: token },
  //         });
  //         setHistory(res.data);
  //       }
  //     };
  //     getHistory();
  //   }
  // }, [token, callback]);

  const addToCart = async (product) => {
    if (!isLogged) return alert("Please login to continue buying");

    const check = cart.every((item) => {
      return item._id !== product._id;
    });
    if (check) {
      setCart([...cart, { product, quantity: 1 }]);

      await axios.patch(
        "/api/v1/addcart",
        { cart: [...cart, { ...product, quantity: 1 }] },
        {
          headers: { Authorization: token },
        }
      );
    } else {
      alert("Item already added");
    }
  };
  return {
    isLogged: [isLogged, setIsLogged],
    isAdmin: [isAdmin, setIsAdmin],
    cartz: [cart, setCart],
    addToCart: addToCart,
    paymentHistory: [history, setHistory],
  };
};

export default UserApi;
