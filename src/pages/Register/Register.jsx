import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import useAuth from "../../hooks/useAuth";

const Register = () => {
    const navigate = useNavigate();
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false); 
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
            <div className="min-h-[300px] min-w-[300px] rounded-lg flex items-center justify-center bg-base-300">
                <span className="loading loading-spinner loading-lg"></span>
                <h1 className='text-center'>Waiting for verification...</h1>
            </div>
        </div>
    );

    return (
        <div className="hero min-h-screen bg-gradient-to-b from-green-400 to-blue-500 flex justify-center items-center">
            <div className="w-full max-w-md">
                <h1 className="text-3xl text-center text-white font-bold mb-6">Be our member now!</h1>
                <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                    <form onSubmit={handleRegister}>
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
                                Full Name
                            </label>
                            <input required type="text" name="name" placeholder="Enter your full name" className="input input-bordered w-full" />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                                Email
                            </label>
                            <input required type="email" name="email" placeholder="Enter varsity mail" className="input input-bordered w-full" />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                                Password
                            </label>
                            <input required type="password" name="password" placeholder="Password" className="input input-bordered w-full" />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="phone">
                                Phone
                            </label>
                            <input required type="text" name="phone" placeholder="Enter your phone number" className="input input-bordered w-full" />
                        </div>
                        <div className="flex items-center justify-between">
                            <button className="btn bg-blue-500 text-white hover:bg-blue-700" disabled={loading}>Register</button>
                            <Link to="/login" className="text-sm text-green-700">Already registered? Login now</Link>
                        </div>
                        {error && <p className="text-red-500 text-xs italic mt-4">{error}</p>}
                    </form>
                </div>
            </div>
            {loading && <LoadingModal />} 
        </div>
    );
};

export default Register;
