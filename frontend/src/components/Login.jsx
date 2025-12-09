import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";  // <-- add this import
import "../css/Login.css";
import API from "../utils/api";
import { useUser } from "../context/UserContext";

export default function Login() {
  const {setUser} = useUser();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
      e.preventDefault();

    try {
      const res = await API.post(
        "/auth/login",
        formData,
        { withCredentials: true } // important for session cookies
      );
      setUser(res.data.user);
      navigate('/')
    } catch (err) {
      console.error(err.response?.data?.msg || "Login failed");
      alert(err.response?.data?.msg || "Login failed");
    }
  };

  return (
    <div className="login-page">
      <div className="login-container shadow-lg">
        <h2 className="text-center mb-4">Welcome Back</h2>
        <p className="text-center text-muted mb-4">
          Please sign in to continue
        </p>

        <form onSubmit={handleSubmit}>
          <div className="form-floating mb-3 w-100">
            <input
              type="email"
              className="form-control w-100"
              id="floatingEmail"
              placeholder="name@example.com"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
            <label htmlFor="floatingEmail">Email address</label>
          </div>

          <div className="form-floating mb-3 w-100">
            <input
              type="password"
              className="form-control w-100"
              id="floatingPassword"
              placeholder="Password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
            <label htmlFor="floatingPassword">Password</label>
          </div>

          <button type="submit" className="btn btn-primary w-100 login-btn">
            Login
          </button>
        </form>

        <div className="text-center mt-3">
          <small className="text-muted">
            Don’t have an account?{" "}
            <Link to="/register" className="signup-link">
              Sign up
            </Link>
          </small>
        </div>
      </div>
    </div>
  );
}
