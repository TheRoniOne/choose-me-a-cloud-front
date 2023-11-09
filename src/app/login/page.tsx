import React from "react";
import { Metadata } from "next";
import { LoginForm } from "@/app/components/Forms";

export const metadata: Metadata = {
  title: "Login",
  description: "Choose me a cloud login page",
};

const LoginPage = () => {
  return (
    <div className="relative flex flex-col justify-center h-screen overflow-hidden">
      <div className="w-full p-6 m-auto bg-white rounded-md shadow-md ring-2 ring-gray-800/50 lg:max-w-lg">
        <h1 className="text-3xl font-semibold text-center text-gray-700">
          Choose me a cloud
        </h1>
        <LoginForm />
      </div>
    </div>
  );
};

export default LoginPage;
