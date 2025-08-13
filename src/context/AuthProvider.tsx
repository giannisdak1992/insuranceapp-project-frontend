import { useState, useEffect } from "react";
import {jwtDecode} from "jwt-decode";
import { getCookie, setCookie, deleteCookie } from "@/utils/cookies.ts";
import { login, type LoginFields } from "@/api/login.ts";
import { AuthContext, type User } from "./AuthContext";

type JwtPayload = {
    sub?: string;
    role?: string;
    iat?: number;
    exp?: number;
};

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [accessToken, setAccessToken] = useState<string | null>(null);
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const token = getCookie("access_token");
        setAccessToken(token ?? null);
        if (token) {
            try {
                const decoded = jwtDecode<JwtPayload>(token);
                const firstname = localStorage.getItem("firstname") ?? "";
                const lastname = localStorage.getItem("lastname") ?? "";
                setUser({
                    firstname,
                    lastname,
                    role: decoded.role ?? "",
                    username: decoded.sub ?? "",
                });
            } catch {
                setUser(null);
            }
        } else {
            setUser(null);
        }
        setLoading(false);
    }, []);

    const loginUser = async (fields: LoginFields) => {
        const res = await login(fields);

        setCookie("access_token", res.token, {
            expires: 1,
            sameSite: "Lax",
            secure: true, // βάλτο true σε production με https
            path: "/",
        });

        localStorage.setItem("firstname", res.firstname);
        localStorage.setItem("lastname", res.lastname);

        setAccessToken(res.token);

        try {
            const decoded = jwtDecode<JwtPayload>(res.token);
            setUser({
                firstname: res.firstname,
                lastname: res.lastname,
                role: decoded.role ?? "",
                username: decoded.sub ?? "",
            });
        } catch {
            setUser(null);
        }
    };

    const logoutUser = () => {
        deleteCookie("access_token");
        localStorage.removeItem("firstname");
        localStorage.removeItem("lastname");
        setAccessToken(null);
        setUser(null);
    };

    return (
        <AuthContext.Provider
            value={{
                isAuthenticated: !!accessToken,
                accessToken,
                user,
                loginUser,
                logout: logoutUser,
                loading,
            }}
        >
            {loading ? null : children}
        </AuthContext.Provider>
    );
};
