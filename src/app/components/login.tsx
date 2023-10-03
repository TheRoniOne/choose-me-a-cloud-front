"use client";

import React from "react";
import { useFormik } from "formik";

interface Values {
  username: string;
  password: string;
}

const Login = () => {
  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },

    onSubmit: async (values: Values) => {
      const response = await fetch("http://127.0.0.1:8000/api/token/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      const json = await response.json();

      json.access && localStorage.setItem("jwt", json.access);

      console.log(json.access);
    },
  });

  return (
    <form className="space-y-4" onSubmit={formik.handleSubmit}>
      <div className="mb-3">
        <label className="label">
          <span className="text-base label-text">Username</span>
        </label>
        <input
          className="w-full input input-bordered"
          id="username"
          name="username"
          placeholder="Username"
          type="text"
          onChange={formik.handleChange}
          value={formik.values.username}
        />
      </div>

      <div className="mb-3">
        <label className="label">
          <span className="text-base label-text">Password</span>
        </label>
        <input
          className="w-full input input-bordered"
          id="password"
          name="password"
          placeholder="Password"
          type="password"
          onChange={formik.handleChange}
          value={formik.values.password}
        />
      </div>

      <button type="submit" className="btn btn-block">
        Login
      </button>
    </form>
  );
};

export default Login;
