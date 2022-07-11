import { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { GlobalsState } from "./../../../GlobalsState";

const OrderHistory = () => {
  const state = useContext(GlobalsState);
  const { paymentHistory } = state?.userApi;
  const history = paymentHistory[0].history;
  const { isAdmin } = state.userApi;
  const admin = isAdmin[0];
  const token = state.token[0];
  const setHistory = paymentHistory[1];

  // console.log(setHistory);

  useEffect(() => {
    if (token) {
      const getHistory = async () => {
        if (admin) {
          const res = await axios.get(
            `https://ecommerceapiiii.herokuapp.com/api/v1/history`,
            {
              headers: { Authorization: token },
            }
          );
          setHistory(res.data);
        } else {
          const res = await axios.get(
            `https://ecommerceapiiii.herokuapp.com/api/v1/history`,
            {
              headers: { Authorization: token },
            }
          );
          setHistory(res.data);
        }
      };
      getHistory();
    }
  }, [token, admin, setHistory]);
  return (
    <div className="history-page">
      <h2>History</h2>
      <h4>you have {history?.length} ordered</h4>
      <table>
        <thead>
          <tr>
            <th>Payment ID</th>
            <th>Date Purchased</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {history?.map((item) => {
            return (
              <tr key={item._id}>
                <td>{item.paymentID}</td>
                <td>{new Date(item.createdAt).toLocaleDateString()}</td>
                <td>
                  <Link to={`/history/${item._id}`}>Views</Link>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default OrderHistory;
