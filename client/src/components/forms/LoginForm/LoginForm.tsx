import { useCallback } from "react";
import { useForm } from "react-hook-form";
import { useMutation } from "react-query";
import useAuth from "../../../hooks/useAuth";
import API from "../../../lib/api";

export interface LoginFormValues {
  email: string;
  password: string;
}

export default function LoginForm() {
  const { login } = useAuth();
  const { register, handleSubmit } = useForm<LoginFormValues>();
  const { mutateAsync: loginUser } = useMutation(API.LOGIN);
  const handleUserLogin = useCallback(async (values: LoginFormValues) => {
    const { data } = await loginUser(values);
    login(data?.user || null);
  }, []);

  return (
    <form onSubmit={handleSubmit(handleUserLogin)}>
      <input
        type="text"
        placeholder="Email address"
        value="user1@gmail.com"
        {...register("email")}
      />
      <input
        type="password"
        placeholder="Password"
        value="abc123"
        {...register("password")}
      />
      <button type="submit">Login</button>
    </form>
  );
}
