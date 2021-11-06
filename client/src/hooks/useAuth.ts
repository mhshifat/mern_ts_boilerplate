import { useContext } from "react";
import { AuthContext } from "../providers/AuthProvider";

export default function useAuth() {
  const auth = useContext(AuthContext);
  if (!auth) throw new Error();
  return auth;
}
