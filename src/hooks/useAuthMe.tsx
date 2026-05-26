import { useEffect, useState } from "react";
import axios from "axios";
const API_URL = (import.meta as any).VITE_API_URL;

export default function useAuthMe() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    axios
      .get(`${API_URL}/api/auth/me`, { withCredentials: true })
      .then((res) => {
        setUser(res.data.user);
        setError(null);
      })
      .catch((err) => {
        setUser(null);
        setError(err.response?.data?.message || "Not authenticated");
      })
      .finally(() => setLoading(false));
  }, []);

  return { user, loading, error };
}
