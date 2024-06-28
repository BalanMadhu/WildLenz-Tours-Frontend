import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import "./css/register.css";
import url from "./RouteUrl";

export function Login() {
  const [value, setValue] = useState({
    email: "",
    password: ""
  });
  const [message, setMessage] = useState(null);
  const [disabled, setDisabled] = useState(false); // To disable login button
  const navigate = useNavigate();

  const handleChange = (event) => {
    setValue((prev) => ({ ...prev, [event.target.name]: event.target.value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(url.login, value);
      if (response.data.status === true) {
        console.log("response.data.status: ", response.data.msg);
        setMessage(response.data.msg);
        sessionStorage.setItem("token", response.data.token);
        navigate("/touristPlace");
      } else {
        window.alert("Login error: " + response.data.msg);
      }
    } catch (error) {
      window.alert("Login error: " + error.response.data.msg);
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setMessage(null);
    }, 5000); // Clear message after 5 seconds
    return () => clearTimeout(timer); // Cleanup
  }, [message]);

  useEffect(() => {
    const interceptor = axios.interceptors.response.use(
      (response) => response,
      (error) => {
        if (error.response && error.response.status === 429) {
          // Too Many Requests (rate limit exceeded)
          setDisabled(true); // Disable login button
          setMessage("Too many login attempts, please try again later.");
        }
        return Promise.reject(error);
      }
    );

    return () => {
      // Clean up the interceptor when component unmounts
      axios.interceptors.response.eject(interceptor);
    };
  }, []);

  return (
    <div className="registration-container">
      <div className="registration-form">
        <div style={{ marginBottom: 20 }}>
          <h2>Login</h2>
        </div>
        {message && <div className="message">{message}</div>}
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Enter your email"
              value={value.email}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Enter your password"
              value={value.password}
              onChange={handleChange}
            />
          </div>
          <button type="submit" disabled={disabled}>
            Login
          </button>
        </form>
        <span>
          Don't have an account? <Link to="/register">Register</Link>
        </span>
      </div>
    </div>
  );
}


