import { useState, useEffect } from "react";
import axios from "axios";
import { baseUrl } from "../config";
import { usebackendStore } from "../store/store";

export const useAuthenticatedLinks = (authToken, searchQuery) => {
  const [links, setLinks] = useState([]);
  const accessToken = usebackendStore((state) => state.accessToken);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchLinks = async () => {
      try {
        const options = {
          method: "GET",
          url: `${baseUrl}/link/links`,
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
          params: {
            descriptionQ: searchQuery,
          },
        };
        const response = await axios.request(options);
        console.log(response.data.data);
        setLinks(response.data.data);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    if (authToken) {
      fetchLinks();
    }
  }, [authToken, searchQuery]);

  return { links, loading, error };
};
