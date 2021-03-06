import { useContext, useEffect, useState } from "react";
import { GlobalsState } from "./../../../GlobalsState";
import { useParams } from "react-router-dom";

const OrderDetails = () => {
  const { id } = useParams();
  const state = useContext(GlobalsState);
  const [orderDetails, setOrderDetails] = useState([]);
  const { paymentHistory } = state.userApi;
  const history = paymentHistory[0].history;

  useEffect(() => {
    if (id) {
      history?.forEach((item) => {
        if (item._id === id) setOrderDetails(item);
      });
    }
  }, [id, history]);
  if (orderDetails.length === 0) return null;
  return (
    <div className="history-page">
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Address</th>
            <th>Postal Code</th>
            <th>Country Code</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{orderDetails.address.recipient_name}</td>
            <td>
              {orderDetails.address.line1 + " - " + orderDetails.address.city}
            </td>
            <td>{orderDetails.address.postal_code}</td>
            <td>{orderDetails.address.country_code}</td>
          </tr>
        </tbody>
      </table>

      <table style={{ margin: "30px 0px" }}>
        <thead>
          <tr>
            <th></th>
            <th>Products</th>
            <th>Quantity</th>
            <th>Price</th>
          </tr>
        </thead>
        <tbody>
          {orderDetails.cart.map((item) => (
            <tr key={item._id}>
              <td>
                <img src={item.images.url} alt="" />
              </td>
              <td>{item.title}</td>
              <td>{item.quantity}</td>
              <td>$ {item.price * item.quantity}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default OrderDetails;
