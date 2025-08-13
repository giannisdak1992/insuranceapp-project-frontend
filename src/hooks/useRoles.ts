import { Role } from "@/enums/enum.ts"
import { useContext } from "react";
import { AuthContext } from "@/context/AuthContext";

export function useIsAdmin() {
    const auth = useContext(AuthContext);
    return auth?.user?.role === Role.ADMIN;
}

export function useIsCustomer() {
    const auth = useContext(AuthContext);
    return auth?.user?.role === Role.CUSTOMER;
}