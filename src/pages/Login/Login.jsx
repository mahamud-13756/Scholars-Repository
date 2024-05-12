import {  useState } from "react";
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
        <div>
            <div className="hero min-h-screen bg-base-200">
                <div className="hero-content flex-col flex-row">
                    <div className="text-center lg:text-left">
                        <h1 className="text-3xl text-[#548235] font-bold">Login now!</h1>
                    </div>
                    <div className="card w-full min-w-[400px] shadow-2xl bg-base-100">
                        <form onSubmit={handleLogin}>
                            <div className="card-body">
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text">Email</span>
                                    </label>
                                    <input type="email" name="email" placeholder="enter your email here" className="input input-bordered" />
                                </div>
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text">Password</span>
                                    </label>
                                    <input type="password" name="password" placeholder="password" className="input input-bordered" />
                                    {/* <label className="label">
                                        <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
                                    </label> */}
                                </div>
                                <div className="form-control mt-6">
                                    <button className="btn bg-blue-600 bg-[#2F5597] text-white hover:bg-blue-700">Login</button>
                                </div>
                                <label className="">Not registered?
                                    <Link to={'/register'} className="label-text-alt link link-hover text-success" > Register now</Link>
                                </label>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;