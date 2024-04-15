import { useState } from "react";
import axios from "axios";
import { usebackendStore } from "../store/store";
import { baseUrl } from "../config";
import { toast } from "react-toastify";

export const GetGenerateQRCode = () => {
  const accessToken = usebackendStore((state) => state.accessToken);
  const [urlLink, setUrlLink] = useState("");
  const [loadings, setLoadings] = useState(false);
  const [err, setErr] = useState(null);

  const getGenerateQrCode = async (alias) => {
    try {
      setLoadings(true);
      const options = {
        method: "GET",
        url: `${baseUrl}/link/qrimage/${alias}`,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      };
      const response = await axios.request(options);
      if (response.status === 200) {
        setUrlLink(response.data.data);
        toast.success("QR Code gotten Successfully!");
      }
      setLoadings(false);
    } catch (error) {
      setErr(error.message);
      setLoadings(false);
    }
  };
  return { urlLink, loadings, err, getGenerateQrCode };
};
