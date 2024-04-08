import { useState } from "react";
import axios from "axios";
import { usebackendStore } from "../store/store";
import { useNavigate } from "react-router-dom";
import { baseUrl } from "../config";
import { toast } from "react-toastify";

export const DeleteLink = () => {
  const accessToken = usebackendStore((state) => state.accessToken);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const [data, setData] = useState("");

  const deleteLink = async (id) => {
    try {
      setLoading(true);
      const options = {
        method: "DELETE",
        url: `${baseUrl}/link/${id}`,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      };
      const response = await axios.request(options);
      if (response.status === 200) {
        setData(response.data.message);
        toast.success("Link Deleted Successfully");
        setTimeout(() => {
          window.location.href = "/app";
        });
      }
      setLoading(false);
    } catch (error) {
      setError(error.message);
      toast.error(error.message);
      setLoading(false);
    }
  };
  return { loading, error, data, deleteLink };
};
