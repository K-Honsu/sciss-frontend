import { useState, useEffect } from "react";
import { usebackendStore } from "../store/store";
import { baseUrl } from "../config";
export const useLogin = () => {
  const setAuth = usebackendStore((state) => state.setAuth);
  const setEmail = usebackendStore((state) => state.setEmail);
  const setUserName = usebackendStore((state) => state.setUserName);

  const login = async (email, password) => {
    try {
      const postData = {
        email,
        password,
      };

      const res = await fetch(`${baseUrl}/auth`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(postData),
      });

      const data = await res.json();

      if (data.status === "success") {
        setEmail(data.data.email);
        setUserName(data.data.username);
        setAuth(data.data._id, data.token);
      }
      if (data.status === "error") {
        setError(data.message);
      }
      if (data.message) {
        console.log(data.message);
      }
    } catch {
      if (!iscancelled) {
        setError("Unknown Error occured");
      }
    }
  };

  return { login };
};
