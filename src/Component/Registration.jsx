import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import "./css/register.css";
import url from "./RouteUrl";

export function Registration() {
  const [value, setValue] = useState({
    name: "",
    email: "",
    password: "",
    phone: ""
  });
  const [message, setMessage] = useState(null);
  const navigate = useNavigate();

  const handleChange = (event) => {
    setValue({ ...value, [event.target.name]: event.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(url.register, value);
      if (response.data && response.data.message) {
        setMessage(response.data.message);
        navigate("/");
      } else {
        window.alert("Registration error: " + response.data.message);
      }
    } catch (error) {
      console.error("Error:", error.message);
      window.alert("Registration error: " + error.message);
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setMessage(null);
    }, 5000); // Clear message after 5 seconds
    return () => clearTimeout(timer); // Cleanup
  }, [message]);

  return (
    <div className="registration-container">
      <div className="registration-form">
        <div style={{marginBottom: 20}}>
        <h2>Register</h2>
        </div>
        {message && <div className="message">{message}</div>}
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Name:</label>
            <input
            className="input_field"
              type="text"
              id="name"
              name="name"
              placeholder="Enter your name"
              value={value.name}
              onChange={handleChange}
            />
          </div>
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
          <div className="form-group">
            <label htmlFor="phone">Phone Number:</label>
            <input
              type="text"
              id="phone"
              name="phone"
              placeholder="Enter your phone number"
              value={value.phone}
              onChange={handleChange}
            />
          </div>
          <button type="submit">Register</button>
        </form>
        <span>
          Already have an account? <Link to="/">Login</Link>
        </span>
      </div>
    </div>
  );
}



