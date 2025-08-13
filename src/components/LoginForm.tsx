import { useState, useContext } from "react";
import { AuthContext } from "@/context/AuthContext";
import { useNavigate } from "react-router-dom";

export const LoginForm = () => {
    const navigate = useNavigate();
    const auth = useContext(AuthContext);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    if (!auth) return null;

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);
        setLoading(true);

        try {
            await auth.loginUser({ username, password });
            alert("Login Successful!");
            navigate("/");
        } catch (err: any) {
            setError(err.message || "Login failed");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center px-4">
            <form
                onSubmit={handleSubmit}
                className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full"
            >
                <h2 className="text-2xl font-semibold text-blue-700 mb-6 text-center">
                    Log In
                </h2>

                {error && (
                    <p className="mb-4 text-center text-red-600 font-medium">{error}</p>
                )}

                <div className="mb-4">
                    <label
                        htmlFor="username"
                        className="block text-gray-700 font-medium mb-2"
                    >
                        Username
                    </label>
                    <input
                        id="username"
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                        autoComplete="username"
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                        placeholder="Enter your username"
                    />
                </div>

                <div className="mb-6">
                    <label
                        htmlFor="password"
                        className="block text-gray-700 font-medium mb-2"
                    >
                        Password
                    </label>
                    <input
                        id="password"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        autoComplete="current-password"
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                        placeholder="Enter your password"
                    />
                </div>

                <button
                    type="submit"
                    disabled={loading}
                    className={`w-full py-3 text-white font-semibold rounded-md transition-colors duration-200 ${
                        loading
                            ? "bg-blue-300 cursor-not-allowed"
                            : "bg-blue-700 hover:bg-blue-800"
                    }`}
                >
                    {loading ? "Logging in..." : "Login"}
                </button>
            </form>
        </div>
    );
};
