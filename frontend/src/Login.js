import axios from "axios";

import React, { useState } from "react";

import { Link, useNavigate } from "react-router-dom";

import Validation from "./LoginValidation";

function Login() {
  const [values, setValues] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  const [errors, setErrors] = useState({});
  // const [backendError, setBackendError] = useState([]);
  const handleInput = (event) => {
    setValues((prev) => ({...prev,[event.target.name]: [event.target.value]}))
  }
  const handleSubmit = async (event) => {
    event.preventDefault();
    const err = Validation(values);
    setErrors(err);
  
    // Check if there are no validation errors
    if (!err.email && !err.password) {
      try {
        const res = await axios.post("http://localhost:8081/login", values);
  
        if (res.status === 200) {
          // Successful login
          navigate("/home");
        } else if (res.status === 401) {
          // Failed login (Unauthorized)
          alert("Invalid credentials");
        } else {
          // Handle other status codes if needed
          console.log("Unexpected status code:", res.status);
        }
      } catch (error) {
        console.error("Error during login request:", error);
      }
    }
  };
  

  return (
    <div className="d-flex justify-content-center align-items-center bg-primary vh-100">
      <div className="bg-white p-3 rounded w-25">
        {" "}
        <h2>Log-in</h2>{" "}
        <p></p>
        {/* {backendError ? (
          backendError.map((e) => <p className="text-danger">{e.msg}</p>)
        ) : ( */}
          <span></span>
        {" "}
        <form action="" onSubmit={handleSubmit}>
          {" "}
          <div className="mb-3">
            {" "}
            <label htmlFor="email">
              <strong>Email</strong>
            </label>{" "}
            <input
              type="email"
              placeholder="Enter Email"
              name="email"
              onChange={handleInput}
              className="form-control rounded-0"
            />{" "}
            {errors.email && (
              <span className="text-danger"> {errors.email}</span>
            )}{" "}
          </div>{" "}
          <div className="mb-3">
            {" "}
            <label htmlFor="password">
              <strong>Password</strong>
            </label>{" "}
            <input
              type="password"
              placeholder="Enter Password"
              name="password"
              onChange={handleInput}
              className="form-control rounded-0"
            />{" "}
            {errors.password && (
              <span className="text-danger"> {errors.password}</span>
            )}{" "}
          </div>{" "}
          <button type="submit" className="btn btn-success w-100 rounded-0">
            {" "}
            Log in
          </button>{" "}
          <p>You agree to our terms and policies</p>{" "}
          <Link
            to="/signup"
            className="btn btn-default border w-100 bg-light rounded-0 text-decoration-none"
          >
            Create Account
          </Link>{" "}
        </form>{" "}
      </div>{" "}
    </div>
  );
}
export default Login;
