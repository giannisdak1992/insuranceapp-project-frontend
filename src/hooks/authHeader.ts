import {getCookie} from "@/utils/cookies.ts";

export  function getAuthHeaders(): HeadersInit {
    const token = getCookie("access_token");
    return {
        "Content-Type": "application/json",
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
    };
}
