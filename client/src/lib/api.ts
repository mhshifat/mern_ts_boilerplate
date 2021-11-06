import { LoginFormValues } from "../components/forms/LoginForm";
import http from "./axios";

const API = {
  // Auth...
  LOGIN: async (values: LoginFormValues) => http.post("/auth", values)
};

export default API;
