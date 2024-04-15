import { useState } from "react";
import axios from "axios";
import { baseUrl } from "../config";
import { toast } from "react-toastify";

export const CreateLink = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState("");

  const AnonCreateLink = async (url, alias) => {
    try {
      const postData = {
        url,
        ...(alias && { alias }),
      };
      setLoading(true);
      const options = {
        method: "POST",
        url: `${baseUrl}/link/anons/create`,
        headers: {
          "Content-Type": "application/json",
        },
        data: postData,
      };
      const response = await axios.request(options);
      if (response.status === 201) {
        toast.success("Link created and shorted successfully");
        setData(response.data.data.linkUrl);
      }
      setLoading(false);
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  };
  return { loading, error, AnonCreateLink, data };
};
