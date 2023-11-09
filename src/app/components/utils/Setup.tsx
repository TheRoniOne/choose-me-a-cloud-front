"use client";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useEffect } from "react";
import { useAppDispatch } from "@/app/redux/hooks";
import { setAuth, finishInitialLoad } from "@/app/redux/slices/authSlice";
import { useVerifyMutation } from "@/app/redux/services/authAPIService";

export default function Setup() {
  const [verify] = useVerifyMutation();
  const dispatch = useAppDispatch();

  useEffect(() => {
    verify(undefined)
      .unwrap()
      .then(() => {
        dispatch(setAuth());
      })
      .finally(() => {
        dispatch(finishInitialLoad());
      });
  }, []);

  return <ToastContainer />;
}
