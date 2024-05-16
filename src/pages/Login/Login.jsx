import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

const Login = () => {
    const [error, setError] = useState("");
    const { logIn } = useAuth();
    const location = useLocation();
    const navigate = useNavigate();
    const from = location.state?.from?.pathname || '/';
    console.log("from come: " ,from);

    const handleLogin = event => {
        event.preventDefault();
        const form = event.target;
        const email = form.email.value;
        const password = form.password.value;

        logIn(email, password)
            .then(result => {
                const user = result.user;
                form.reset();
                console.log(user);
                navigate(from, { replace: true })
            })
            .catch(error => {
                console.log(error.message);
                setError(error.message)
            })

    }

    return (
        <div className="hero min-h-screen bg-gradient-to-b from-green-400 to-blue-500 flex justify-center items-center">
            <div className="w-full max-w-md">
                <h1 className="text-3xl text-center text-white font-bold mb-6">Login now!</h1>
                <div className="bg-base-100 shadow-md rounded px-8 pt-6 pb-8 mb-4">
                    <form onSubmit={handleLogin}>
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                                Email
                            </label>
                            <input type="email" name="email" placeholder="Enter your email here" className="input input-bordered w-full" />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                                Password
                            </label>
                            <input type="password" name="password" placeholder="Password" className="input input-bordered w-full" />
                        </div>
                        <div className="flex items-center justify-between">
                            <button className="btn bg-blue-600 text-white hover:bg-blue-700" type="submit">Login</button>
                            <Link to="/register" className="text-sm text-success">Not registered? Register now</Link>
                        </div>
                        {error && <p className="text-red-500 text-xs italic mt-4">{error}</p>}
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Login;
