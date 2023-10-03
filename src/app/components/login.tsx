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

    onSubmit: (values: Values) => {
      alert(JSON.stringify(values, null, 2));
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
