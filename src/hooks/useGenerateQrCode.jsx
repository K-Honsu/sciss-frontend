import { useState } from "react";
import axios from "axios";
import { usebackendStore } from "../store/store";
import { baseUrl } from "../config";
import { toast } from "react-toastify";

export const GenerateQRCode = () => {
  const accessToken = usebackendStore((state) => state.accessToken);
  const [data, setData] = useState("")
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const generateQrCode = async (alias) => {
    try {
      setLoading(true);
      const options = {
        method: "POST",
        url: `${baseUrl}/link/${alias}`,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      };
      const response = await axios.request(options);
      if (response.status === 200) {
        setData(response.data.data)
        toast.success("Generated QR Code Successfully!");
      }
      setLoading(false);
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  };
  return { data, loading, error, generateQrCode };
};
