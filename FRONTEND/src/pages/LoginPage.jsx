import { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { useAuthStore } from '../store/useAuthStore';

const LoginPage = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const { setUser } = useAuthStore();

    const handleLogin = async (e) => {

        try {
            setLoading(true);
            e.preventDefault();
            const response = await axios.post("http://localhost:8000/api/auth/login", {
                username,
                password,
            });
            toast.success(response.data.message);
            console.log(response.data);
            setUser(response.data.user);
            localStorage.setItem("token", response.data.token);
        }
        catch (error) {
            console.log(error);
            if (error.response) {
                toast.error(error.response.data);
            }
            else {
                toast.error("Network Error");
            }
        }
        finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex items-center justify-center h-screen bg-gray-700">
            <div className="w-full max-w-md p-8 space-y-6 bg-gray-800 border-4 border-gray-600 rounded shadow-md">
                <h2 className="text-2xl font-bold text-white text-center">Login</h2>
                <form className="space-y-6" onSubmit={handleLogin}>
                    <div>
                        <label htmlFor="username" className="block text-sm font-medium text-gray-300">
                            Username
                        </label>
                        <input
                            type="text"
                            id="username"
                            name="username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            className="w-full px-3 py-2 mt-1 border rounded-md text-gray-900 shadow-sm bg-gray-200 focus:ring-blue-500 focus:border-blue-500 sm:text-sm placeholder-gray-400"
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-gray-300">
                            Password
                        </label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full px-3 py-2 mt-1 border rounded-md text-gray-900 shadow-sm bg-gray-200 focus:ring-blue-500 focus:border-blue-500 sm:text-sm placeholder-gray-400"
                            required
                        />
                    </div>
                    <div>
                        <button
                            disabled={loading}
                            type="submit"
                            className="w-full px-4 py-2 text-white bg-gray-600 rounded-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        >
                            {loading ? "Logging In..." : "Login"}
                        </button>
                    </div>
                    <div className="text-center">
                        <span className="text-sm text-gray-400">Not already registered? </span>
                        <a
                            href="/signup"
                            className="text-sm text-gray-400 hover:text-white"
                        >
                            Sign up
                        </a>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default LoginPage;