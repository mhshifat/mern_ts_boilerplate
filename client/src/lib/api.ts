import { LoginFormValues } from "../components/forms/LoginForm/LoginForm";
import http from "./axios";

const API = {
  LOGIN: async (values: LoginFormValues) => http.post("/auth", values)
};

export default API;
