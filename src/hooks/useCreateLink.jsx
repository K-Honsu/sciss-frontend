import { useState } from "react";
import axios from "axios";
import { usebackendStore } from "../store/store";
import { baseUrl } from "../config";
import { toast } from "react-toastify";

export const CreateLink = () => {
  const accessToken = usebackendStore((state) => state.accessToken);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const createLink = async (url, description, alias) => {
    try {
      const postData = {
        url,
        description,
        ...(alias && { alias }),
      };
      setLoading(true);
      const options = {
        method: "POST",
        url: `${baseUrl}/link`,
        headers: {
          "Content-Type": "application/json",
          "User-Agent": "insomnia/8.1.0",
          Authorization: `Bearer ${accessToken}`,
        },
        data: postData,
      };
      const response = await axios.request(options);
      if (response.status === 201) {
        toast.success("Link created and shorted successfully");
        setTimeout(() => {
          window.location.href = "/app";
        }, 3000);
      }
      setLoading(false);
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  };
  return { loading, error, createLink };
};
