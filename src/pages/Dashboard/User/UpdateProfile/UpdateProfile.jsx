import React from 'react';
import useAuth from '../../../../hooks/useAuth';
import { useQuery } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import Swal from 'sweetalert2';

const image_hosting_token = import.meta.env.VITE_IMAGE_UPLOAD_TOKEN;

const UpdateProfile = () => {
    const { updateUserProfileName, updateUserProfilePhoto } = useAuth();

    const {
        register,
        formState: { errors },
        handleSubmit,
        reset,
    } = useForm();

    const image_hoisting_url = `https://api.imgbb.com/1/upload?key=${image_hosting_token}`;

    const { user } = useAuth();

    const { isPending, isError, error, refetch, data: userDb } = useQuery({
        queryKey: ['userDb'],
        queryFn: async () => {
            const res = await fetch(`http://localhost:5000/user/${user?.email}`);
            return res.json();
        }
    })






    const onSubmit = (data) => {
        const formData = new FormData();
        formData.append("image", data.photoURL[0]);
        fetch(image_hoisting_url, {
            method: "POST",
            body: formData,
        })
            .then((res) => res.json())
            .then((imageData) => {
                if (imageData.success) {
                    console.log("hosting image url : ", imageData.data.display_url);
                    const updateData = {
                        photoURL: imageData.data.display_url,
                        name: data.name,
                    };
                    updateUserProfileName(data.name);
                    updateUserProfilePhoto(imageData.data.display_url)
                        .then(() => {
                            fetch(`http://localhost:5000/users/profile-update/${user.email}`, {
                                method: 'PATCH',
                                headers: {
                                    'content-type': 'application/json'
                                },
                                body: JSON.stringify(updateData)
                            })
                                .then(res => res.json())
                                .then(data => {
                                    if (data.modifiedCount) {
                                        reset();
                                        Swal.fire({
                                            position: 'top-end',
                                            icon: 'success',
                                            title: 'Profile Updated Successfully!',
                                            showConfirmButton: false,
                                            timer: 1600
                                        });
                                        refetch();
                                    }
                                })
                        })
                        .catch(error => console.log(error))
                }
            })
    };

    return (
        <div className='w-full mt-10'>
            <div className='container mx-auto '>
                <div className=' flex flex-col items-center gap-2 border p-5 rounded'>
                    <img src={userDb?.photoURL} alt="" className='border h-[100px] w-[100px]' />
                    <h1 className='text-xl font-mono font-bold border rounded px-3 py-1'>{userDb?.name}</h1>
                    <h1 className=' font-mono px-3 py-1'>{userDb?.email}</h1>
                </div>
                <div className='border p-5 rounded mt-5'>
                    <div className="card w-8/12 mx-auto  shadow-2xl">
                        <form
                            onSubmit={handleSubmit(onSubmit)}
                            className=" border bg-blue-200  p-10 rounded space-y-3 shadow"
                        >
                            <h3 className="text-center text-2xl font-semibold"> Update Your Profile</h3>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Your Name</span>
                                </label>
                                <input
                                    defaultValue={user.displayName}
                                    type="text"
                                    className="input input-bordered"
                                    {...register("name", { required: true })}
                                />
                                {/* TODO: error and required message show incomplete */}
                            </div>
                            <div className="form-control w-full pb-3">
                                <label className="label">
                                    <span className="label-text">Choose Profile Photo*</span>
                                </label>
                                <input
                                    type="file"
                                    className="file-input w-full "
                                    {...register("photoURL", { required: true })}
                                />
                            </div>
                            <input
                                type="submit"
                                className="btn bg-[#2F5597] hover:bg-blue-800 border text-white w-32 hover:font-bold p-2"
                                value="Update"
                            />
                        </form>
                    </div>
                </div>
            </div>

        </div>
    );
};

export default UpdateProfile;