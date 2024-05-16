import { Link, NavLink, Outlet } from "react-router-dom";
import { FaHome, FaUser, FaUsers, FaWallet } from 'react-icons/fa';
import { LuBookPlus } from "react-icons/lu";
import { ImBooks, ImExit } from "react-icons/im";
import { BiSelectMultiple } from "react-icons/bi";
import { IoIosAlbums } from "react-icons/io";
import { GrClose } from "react-icons/gr";
import { Helmet } from "react-helmet";
import { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";
// import useAdmin from "../../hooks/useAdmin";

const Dashboard = () => {

    // const [isAdmin, isAdminLoading] = useAdmin();

    // const role = 'user';
    const [toggleMenu, setToggleMenu] = useState(true);
    const { user, logOut } = useAuth();

    // (!isAdminLoading)
    // console.log("isAdmin state: ", isAdmin);
    // console.log(user)

    const [role, setRole] = useState("");
    useEffect(() => {
        fetch(`http://localhost:5000/users/role/${user?.email}`)
            .then(res => res.json())
            .then(data => setRole(data.role))
    }, [user])
    

    console.log(role);

    // const isAdmin = false;
    // const [isAdmin] = useAdmin();
    // console.log("is Admin state : ", isAdmin);
    // const [isInstructor] = useInstructor();

    console.log("Toggle 1: ", toggleMenu);

    const toggleFunction = () => {
        if (toggleMenu) {
            setToggleMenu(false);
        }
        else {
            setToggleMenu(true)
        }
        console.log("Toggle 3: ", toggleMenu);
    }

    console.log("Toggle 2: ", toggleMenu);

    return (
        <div className="">
            <Helmet>
                <title>scholars Repository || Dashboard</title>
            </Helmet>
            <label onClick={() => toggleFunction()} className="btn bg-gradient-to-b from-green-400 to-blue-500 lg:hidden">
                {
                    toggleMenu ?
                        <GrClose></GrClose>
                        :
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                }
            </label>
            <div className="flex ">
                <div className={`bg-gradient-to-b from-green-400 to-blue-500 p-2 md:pt-10 md:mt-10 w-8/12 md:w-4/12 xl:w-3/12 2xl:w-2/12  border z-10 relative ${toggleMenu ? "" : "hidden"}`}>
                    <div className="flex flex-col mt-10 sm:mt-10 lg:flex-row sm:gap-2 items-center ps-2 p-2">
                        <label className="btn btn-circle avatar bg-blue-700 hover:bg-slate-700 text-2xl" >
                            {
                                user.photoURL ? <div><img className='rounded-full' src={user.photoURL} /></div> : <><FaUser className="text-white"></FaUser></>
                            }
                        </label>
                        <h1 className="text-center">{user?.displayName}</h1>
                    </div>
                    {
                        role === "admin" && <span className="px-2 border border-yellow-500 border-2 rounded bg-yellow-400 absolute top-2 end-2">admin</span>
                    }
                    <ul className="menu p-4 w-60 ">
                        {
                            role === "admin" ? <>
                                <div className="divider"></div>
                                <li><NavLink to="/dashboard/home"><FaHome></FaHome> Admin Home</NavLink></li>
                                <li><NavLink to="/dashboard/admin/manage-user"><FaUsers></FaUsers> Manage Users</NavLink></li>
                                {/* <li><NavLink to="/dashboard/admin/manage-blogs"><FaUsers></FaUsers> Manage Blogs</NavLink></li> */}
                                <li><NavLink to="/dashboard/admin/manage-files"><FaUsers></FaUsers> Manage Files</NavLink></li>
                                <li><NavLink to="/dashboard/admin/add-new/resource-title-info"><FaUsers></FaUsers>Add Resource Title Info</NavLink></li>

                            </>
                                :
                                role === "user" ?
                                    <>
                                        <div className="divider"></div>
                                        <li><NavLink to={`/dashboard/user/profile-update`}><BiSelectMultiple></BiSelectMultiple>Update My Profile</NavLink></li>
                                        <li><NavLink to={`/dashboard/user/my-contribution`}><BiSelectMultiple></BiSelectMultiple>My Contribution</NavLink></li>
                                        {/* <li><NavLink to={`/dashboard/user/myBlogs`}><BiSelectMultiple></BiSelectMultiple>My Blogs</NavLink></li> */}
                                    </> :
                                    <>Loading</>
                        }

                        <div className="divider"></div>
                        <li><NavLink to="/"><FaHome></FaHome>scholars Repository Home</NavLink> </li>
                        <div className="divider"></div>
                        <li className=""><a className="border w-1/2 bg-blue-500 text-white" onClick={logOut}>Logout <ImExit></ImExit> </a></li>
                    </ul>

                </div>
                <div className="w-full px-5 md:px-5 ">
                    <Outlet></Outlet>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
