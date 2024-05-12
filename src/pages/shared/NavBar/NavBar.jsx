import React from 'react';
import { Link } from "react-router-dom";
import { FaAngleDown, FaUser } from 'react-icons/fa';
import useAuth from "../../../hooks/useAuth";
import { useEffect, useState } from "react";
import { BsFillCartCheckFill } from "react-icons/bs";

import logo from '../../../assets/logo.png'

const NavBar = () => {
    const { user, logOut, cartCount } = useAuth();
    const navOptions = <>
        <li className="text-xl me-3 text-black font-bold"><Link to={'/'}>Home</Link></li>
        <li className="text-xl me-3 text-black font-bold"><Link to={'/contribute-resources'}>Upload</Link></li>
        <li className="text-xl me-3 text-black font-bold"><Link to={'/find-resources'}>Find Resources</Link></li>
        <li className="text-xl me-3 text-black font-bold"><Link to={'/videos'}>Videos</Link></li>
        <li className="text-xl me-3 text-black font-bold"><Link to={'/leader-board'}>Points</Link></li>
        <li className="text-xl me-3 text-black font-bold"><Link to={'/winners'}>Highest Contributor</Link></li>
    </>
    return (
        <div className="w-full bg-green-500 mt-5"> {/* Change bg-white-500 to bg-green-500 */}
            <div className="container mx-auto">
                <div className="navbar">
                    <div className="navbar-start">
                        <div className="dropdown">
                            <label tabIndex={0} className="btn btn-ghost lg:hidden">
                                {/* <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg> */}
                            </label>
                            <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 p-2 shadow bg-white z-10 rounded-box w-52">
                                {navOptions}
                            </ul>
                        </div>
                        <Link to={'/'}><img src={logo} alt="" className="h-[100px]" /></Link>
                    </div>
                    <div className="navbar-center hidden lg:flex">
                        <ul className="menu menu-horizontal px-1">
                            {navOptions}
                        </ul>
                    </div>
                    <div className="navbar-end">
                        {
                            user ? <div className="flex items-center gap-4">
                                <div className="dropdown dropdown-end">
                                    <div tabIndex={0}>
                                        <label className="btn btn-circle avatar bg-[#548235] hover:bg-[#2F5597] text-2xl" >
                                            {
                                                user.photoURL ? <img className='rounded-full' src={user.photoURL} alt="" /> : <><FaUser className="text-white"></FaUser></>
                                            }
                                        </label>
                                    </div>
                                    <ul tabIndex={0} className="menu menu-sm dropdown-content mt-1 p-2 shadow bg-gradient-to-l from-slate-300 to-base-300 rounded w-52 z-10">
                                        {
                                            user && <li className="border-b-2 border-[#2F5597] font-bold text-lg hover:bordered hover: hover:bg-slate-300"><Link to={'/dashboard/home'}>Go to Dashboard</Link></li>
                                        }
                                        <li className="font-bold text-lg hover:bordered hover: hover:bg-slate-300"><a onClick={logOut}>Logout</a></li>
                                    </ul>
                                </div>
                            </div> : <ul className="menu menu-horizontal px-1">
                                <li><Link to={'/login'}>Login</Link></li>
                            </ul>
                        }
                    </div>
                </div>
            </div>
        </div>
    );
};

export default NavBar;
