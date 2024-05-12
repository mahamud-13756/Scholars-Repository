import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import useAuth from "../../hooks/useAuth";

const Register = () => {

    const navigate = useNavigate();
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false); 
    // useTitle('Register');
    const { createUser, updateUserProfileName } = useAuth();

    const handleRegister = async (event) => {
        event.preventDefault();
        const form = event.target;
        const name = form.name.value;
        const email = form.email.value;
        const password = form.password.value;
        const phone = form.phone.value;

        try {
            if (!/[a-zA-Z]/.test(email.split('@')[0])) {
                setError("Invalid Email Address!");
                return;
            }


            setLoading(true);

            const result = await createUser(email, password);
            const user = result.user;
            while (!user.emailVerified) {
                await new Promise(resolve => setTimeout(resolve, 5000)); // Wait for 5 seconds
                // Refresh the user object to get the latest data
                await user.reload();
            }

            setLoading(false);
            await updateUserProfileName(name);

            const newUser = {
                name: name,
                email: email,
                phone: phone,
                role: "user",
                status: "not updated",
            };


            fetch('http://localhost:5000/users', {
                method: 'POST',
                headers: {
                    'content-type': 'application/json'
                },
                body: JSON.stringify(newUser)
            })
                .then(res => res.json())
                .then(data => {
                    if (data.insertedId) {
                        form.reset();
                        Swal.fire({
                            position: 'top-end',
                            icon: 'success',
                            title: 'Registration has done successfully!',
                            showConfirmButton: false,
                            timer: 1500
                        });
                        navigate('/');
                    }
                })

            navigate('/');
            form.reset();
        } catch (error) {
            console.log(error);

            if (error.code === 'auth/email-already-in-use') {
                setError('User Already Exists!');
            } else {
                setError(error.message);
            }
        }
    };





    const LoadingModal = () => (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            {/* <div className="loader ease-linear rounded-full border-8 border-t-8 border-gray-200 h-32 w-32"> Loading...</div> */}
            <div className="min-h-[300px] min-w-[300px] rounded-lg flex items-center justify-center bg-base-300">
                <span className="loading loading-spinner loading-lg"></span>
                <h1 className='text-center'>Waiting for verification...</h1>
            </div>
        </div>
    );





    return (
        <div className="hero min-h-screen bg-base-200">
            <div className="hero-content flex-col flex-row">
                <div className="text-center lg:text-left">
                    <h1 className="text-3xl text-[#548235] font-bold">Be our member now!</h1>
                </div>
                <div className="card  w-full min-w-[400px] shadow-2xl bg-base-100">
                    <form onSubmit={handleRegister}>
                        <div className="card-body">
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Full Name</span>
                                </label>
                                <input required type="text" name="name" placeholder="enter your full name" className="input input-bordered" />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Email</span>
                                </label>
                                <input required type="email" name="email" placeholder="enter varsity mail" className="input input-bordered" />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Password</span>
                                </label>
                                <input required type="password" name="password" placeholder="password" className="input input-bordered" />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Phone</span>
                                </label>
                                <input required type="text" name="phone" placeholder="enter your phone number" className="input input-bordered" />
                            </div>
                            <div className="form-control mt-6">
                                <button className="btn bg-[#2F5597] text-white hover:bg-blue-700">Register</button>
                            </div>
                            {
                                error && <label className="text-red-500 font-bold border px-2 rounded border-red-400 bg-red-50">
                                    {error}
                                </label>
                            }
                            <label className="">Already registered?
                                <Link to={'/login'} className="label-text-alt link link-hover text-success" > Login now</Link>
                            </label>
                        </div>
                    </form>
                </div>
            </div>
            {loading && <LoadingModal />} 
        </div>
    );
};

export default Register;