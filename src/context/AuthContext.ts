import { createContext } from "react";
import type { LoginFields } from "@/api/login.ts";

export type User = {
    firstname: string;
    lastname: string;
    role: string;
    username: string;
};

type AuthContextProps = {
    isAuthenticated: boolean;
    accessToken: string | null;
    user: User | null;
    loginUser: (fields: LoginFields) => Promise<void>;
    logout: () => void;
    loading: boolean;
};

export const AuthContext = createContext<AuthContextProps | undefined>(undefined);
