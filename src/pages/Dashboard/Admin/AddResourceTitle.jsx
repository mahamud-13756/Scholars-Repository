import React from 'react';
import Swal from 'sweetalert2';

const AddResourceTitle = () => {

    const handleSubmit = event => {
        event.preventDefault();
        const form = event.target;
        const varsityName = form.varsityName.value;
        const departmentName = form.departmentName.value;
        const courseTitle = form.courseTitle.value;

        const newDoc = { varsityName, departmentName, courseTitle}
        fetch('http://localhost:5000/admin/include-resource-title', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(newDoc)
        })
            .then(res => res.json())
            .then(data => {
                if (data.insertedId) {
                    form.reset();
                    Swal.fire({
                        position: 'top-end',
                        icon: 'success',
                        title: 'Data inserted successfully.',
                        showConfirmButton: false,
                        timer: 1500
                    });
                }
            })
        form.reset();

    }

    return (
        <div className="hero min-h-screen bg-base-200">
            <div className="hero-content flex-col flex-row">
                <div className="text-center lg:text-left">
                    <h1 className="text-3xl text-[#548235] font-bold">Add New Resource Title</h1>
                </div>
                <div className="card  w-full min-w-[400px] shadow-2xl bg-base-100">
                    <form onSubmit={handleSubmit}>
                        <div className="card-body">
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">University Name</span>
                                </label>
                                <input type="text" name="varsityName" placeholder="enter your full name" className="input input-bordered" />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Department Name</span>
                                </label>
                                <input type="text" name="departmentName" placeholder="enter department name" className="input input-bordered" />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Course Title</span>
                                </label>
                                <input type="text" name="courseTitle" placeholder="enter course title here" className="input input-bordered" />
                            </div>
                            <div className="form-control mt-6">
                                <button className="btn bg-[#2F5597] text-white hover:bg-blue-700">Submit</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default AddResourceTitle;