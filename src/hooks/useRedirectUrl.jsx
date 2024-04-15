import { useState } from "react";
import { baseUrl } from "../config";
import { toast } from "react-toastify";
import axios from "axios";

export const RedirectUrl = () => {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const redirectUrl = async (linkalias) => {
    try {
      setLoading(true);
      const options = {
        metthod: "GET",
        url: `${baseUrl}/${linkalias}`,
        headers: { "Content-Type": "application/json" },
      };
      const response = await axios.request(options);
      if (response.status === 200) {
        window.location.href = response.data.data
        toast.success("Redirecting...");
      }
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  };
  return { redirectUrl, error, loading };
};
