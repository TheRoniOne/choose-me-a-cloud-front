"use client";

import { useAppDispatch } from "@/redux/hooks";
import { LoginArgs, useLoginMutation } from "@/redux/services/authAPIService";
import { setAuth } from "@/redux/slices/authSlice";
import { useRouter } from "next/navigation";
import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-toastify";

const LoginForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginArgs>();

  const [login, { isLoading }] = useLoginMutation();
  const router = useRouter();
  const dispatch = useAppDispatch();

  const onSubmit: SubmitHandler<LoginArgs> = (data) =>
    login(data)
      .unwrap()
      .then(() => {
        dispatch(setAuth());
        toast.success("Login successful");
        router.push("/");
      })
      .catch(() => {
        toast.error("Login failed");
      });

  return (
    <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
      <div className="mb-3">
        <label className="label">
          <span className="text-base label-text">Username</span>
        </label>
        <input
          {...register("username", { required: true })}
          className="w-full input input-bordered"
          placeholder="Username"
          type="text"
        />
        {errors.username && (
          <span className="text-red-500">This field is required</span>
        )}
      </div>

      <div className="mb-3">
        <label className="label">
          <span className="text-base label-text">Password</span>
        </label>
        <input
          {...register("password", { required: true })}
          className="w-full input input-bordered"
          placeholder="Password"
          type="password"
        />
        {errors.password && (
          <span className="text-red-500">This field is required</span>
        )}
      </div>

      <button type="submit" className="btn btn-block">
        Login
      </button>
    </form>
  );
};

export default LoginForm;
