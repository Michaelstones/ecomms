import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const Login = () => {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const onChangeInp = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const loginHandler = async (e) => {
    try {
      e.preventDefault();
      await axios.post(`https://ecommerceapiiii.herokuapp.com/api/v1/login`, {
        ...user,
      });
      // console.log("ji");
      window.location.href = "/";
      localStorage.setItem("firstTimer", true);
    } catch (error) {
      alert(error.response.data.msg);
    }
  };
  return (
    <div className="login-page">
      <div>
        <h2>Login</h2>
        <form onSubmit={loginHandler}>
          <input
            name="email"
            type="email"
            autoComplete="off"
            placeholder="Email"
            required
            value={user.email}
            onChange={onChangeInp}
          />
          <input
            name="password"
            type="password"
            placeholder="Password"
            required
            value={user.password}
            autoComplete="off"
            onChange={onChangeInp}
          />
          <div className="row">
            <button type="submit">Login</button>
            <Link to="/register">register</Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
