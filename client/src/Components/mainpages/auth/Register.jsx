import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const Register = () => {
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
  });

  const onChangeInp = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const regHandler = async (e) => {
    try {
      e.preventDefault();
      await axios.post("api/v1/register", { ...user });
      localStorage.setItem("firstTimer", true);
      window.location.href = "/";
    } catch (error) {
      alert(error.response.data.msg);
    }
  };
  return (
    <div className="login-page">
      <div>
        <h2>Register</h2>
        <form onSubmit={regHandler}>
          <input
            name="name"
            type="text"
            placeholder="Name"
            required
            value={user.name}
            onChange={onChangeInp}
            autoComplete="off"
          />
          <input
            name="email"
            type="email"
            placeholder="Email"
            required
            value={user.email}
            onChange={onChangeInp}
            autoComplete="on"
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
            <button type="submit">Register</button>
            <Link to="/login">Login</Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
