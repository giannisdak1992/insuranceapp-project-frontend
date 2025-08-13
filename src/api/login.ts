export type LoginFields = {
    username: string;
    password: string;
}

export type LoginResponse = {
    firstname: string;
    lastname: string;
    token: string;
}

const API_URL = "http://localhost:8080/api";

export async function login({
                                username,
                                password,
                            }: LoginFields): Promise<LoginResponse> {
    console.log("Calling login API with:", username, password);
    const res = await fetch(`${API_URL}/auth/authenticate`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
    });

    if (!res.ok) {
        let detail = "Login failed.";
        try {
            const data = await res.json();
            if (typeof data?.detail === "string") detail = data.detail;
        } catch (error) {
            console.error(error);
        }
        throw new Error(detail);
    }

    return await res.json();
}
