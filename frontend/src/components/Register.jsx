import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../css/Login.css"; // using same styling as login for consistency
import API from "../utils/api";

export default function Register() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async(e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }
    try {
       const res = await API.post("/auth/register", formData, { withCredentials: true });
        alert("🎉 Registered successfully!");
        navigate("/login");
    } catch (err) {
      console.error("Registration error:", err.response?.data || err.message);
      alert(err.response?.data?.msg || "Registration failed");
    }
    
  };

  return (
    <div className="login-page">
      <div className="login-container shadow-lg">
        <h2 className="text-center mb-4">Create Account</h2>
        <p className="text-center text-muted mb-4">
          Join us and start your blogging journey!
        </p>

        <form onSubmit={handleSubmit}>
          <div className="form-floating mb-3 w-100">
            <input
              type="text"
              className="form-control w-100"
              id="floatingName"
              placeholder="Full Name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
            <label htmlFor="floatingName">Full Name</label>
          </div>

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

          <div className="form-floating mb-4 w-100">
            <input
              type="password"
              className="form-control w-100"
              id="floatingConfirmPassword"
              placeholder="Confirm Password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
            />
            <label htmlFor="floatingConfirmPassword">Confirm Password</label>
          </div>

          <button type="submit" className="btn btn-primary w-100 login-btn">
            Sign Up
          </button>
        </form>

        <div className="text-center mt-3">
          <small className="text-muted">
            Already have an account?{" "}
            <Link to="/login" className="signup-link">
              Login
            </Link>
          </small>
        </div>
      </div>
    </div>
  );
}
