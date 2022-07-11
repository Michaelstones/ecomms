import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { GlobalsState } from "../../../GlobalsState";
import PaypalButton from "./PaypalButton";

const Carts = () => {
  const [total, setTotal] = useState(0);
  const state = useContext(GlobalsState);
  const { cartz } = state?.userApi;
  const { token } = state;
  const toke = token[0];
  const cart = cartz[0];
  const setCart = cartz[1];

  const addToCart = async (cart) => {
    try {
      await axios.patch(
        "/api/v1/addcart",
        { cart },
        {
          headers: { Authorization: toke },
        }
      );
    } catch (error) {
      alert("there was an error");
    }
    // console.log("hi");
  };

  // sum up the total cost
  useEffect(() => {
    const getTotal = () => {
      const total = cart.reduce((a, item) => {
        return a + item?.price * item?.quantity;
      }, 0);
      setTotal(total);
    };
    getTotal();
  }, [cart]);
  // increase inventry

  const incre = (id) => {
    cart.forEach((element) => {
      if (element?._id === id) {
        element.quantity += 1;
      }
      setCart([...cart]);
      addToCart(cart);
    });
  };
  // decrease inventry
  const decre = (id) => {
    cart.forEach((element) => {
      if (element?._id === id) {
        element?.quantity === 1
          ? (element.quantity = 1)
          : (element.quantity -= 1);
      }
      setCart([...cart]);
      addToCart(cart);
    });
  };

  // remove from cart
  const removeItem = (id) => {
    if (window.confirm("Are you sure you want to remove from cart")) {
      cart.forEach((item, i) => {
        if (item?._id === id) {
          return cart.splice(i, 1);
        }
      });
      setCart([...cart]);
      addToCart(cart);
    }
  };

  const tranSuccess = async (payment) => {
    const { paymentID, address } = payment;
    // console.log("hi1");
    await axios.post(
      "/api/v1/payment",
      { cart, paymentID, address },
      {
        headers: { Authorization: toke },
      }
    );
    setCart([]);
    addToCart([]);
    alert("You have successfully placed an order.");
    // setCallback(!callback);
  };

  if (cart.length === 0)
    return (
      <h2 style={{ textAlign: "center", fontSize: "5rem" }}>Cart Empty</h2>
    );

  return (
    <div>
      {cart?.map((item, i) => (
        <div className="detail cart" key={i}>
          <img src={item?.images?.url} alt="" className="img_container" />
          <div className="box-detail">
            <h2>{item?.title}</h2>

            <span>$ {item?.price * item?.quantity}</span>
            <p>{item?.description}</p>
            <p>{item?.content}</p>
            <div className="amount">
              <button onClick={() => decre(item?._id)}> - </button>
              <span>{item?.quantity}</span>
              <button onClick={() => incre(item?._id)}> + </button>
            </div>
            <div className="delete" onClick={() => removeItem(item?._id)}>
              X
            </div>
          </div>
        </div>
      ))}
      <div className="total">
        <h3>Total: $ {total}</h3>
        <PaypalButton total={total} tranSuccess={tranSuccess} />
      </div>
    </div>
  );
};

export default Carts;
