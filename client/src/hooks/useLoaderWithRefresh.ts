import { useEffect, useState } from "react";
import http from "../lib/axios";
import useAuth from "./useAuth";

export default function useLoaderWithRefresh() {
  const [loading, setLoading] = useState(true);
  const { login } = useAuth();

  useEffect(() => {
    http
      .get("/auth")
      .then(({ data }) => login(data?.user || null))
      .finally(() => setLoading(false));
  }, []);

  return { loading };
}
