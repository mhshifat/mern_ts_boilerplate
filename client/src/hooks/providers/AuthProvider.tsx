import React, { createContext, useCallback, useState } from "react";
import http from "../../lib/axios";

export interface UserDocument {
  email: string;
  createdAt: string;
}

interface AuthState {
  isAuth: boolean;
  user: UserDocument | null;
}

interface AuthContextProps {
  authState: AuthState;
  login: (user: AuthState["user"]) => void;
  logout: () => Promise<void>;
}

interface AuthProviderProps {
  children: React.ReactNode;
}

export const AuthContext = createContext<AuthContextProps | null>(null);

export default function AuthProvider({ children }: AuthProviderProps) {
  const [authState, setAuthState] = useState<AuthState>({
    isAuth: false,
    user: null
  });

  const login = useCallback((user: AuthState["user"]) => {
    setAuthState({ user, isAuth: !!user });
  }, []);

  const logout = useCallback(async () => {
    await http.delete("/auth");
    setAuthState({ user: null, isAuth: false });
  }, []);

  return (
    <AuthContext.Provider value={{ authState, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
