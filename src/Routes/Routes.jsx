import {
    createBrowserRouter,
  } from "react-router-dom";
import Main from "../Layout/Main";
import ErrorPage from "../pages/shared/ErrorPage/ErrorPage";
import Home from "../pages/Home/Home/Home";
import Login from "../pages/Login/Login";
import Register from "../pages/Register/Register";
import Contribute from "../pages/Contribute/Contribute";
import FindResources from "../pages/FindResources/FindResources";
import PrivateRoute from "./PrivateRoute";
import Dashboard from "../pages/Dashboard/Dashboard";
import DashboardHome from "../pages/Dashboard/DashboardHome";
import AddResourceTitle from "../pages/Dashboard/Admin/AddResourceTitle";
import FindResourcesResult from "../pages/FindResources/FindResourcesResult";
import UpdateProfile from "../pages/Dashboard/User/UpdateProfile/UpdateProfile";
import MyContribution from "../pages/Dashboard/User/MyContribution/MyContribution";
import AllFiles from "../pages/Dashboard/Admin/AllFiles/AllFiles";
import ManageUsers from "../pages/Dashboard/Admin/ManageUsers/ManageUsers";
import LeaderBoard from "../pages/LeaderBoard/LeaderBoard";
import Winners from "../pages/Winners/Winners";
import Videos from "../pages/Videos/Videos";




  
  export const router = createBrowserRouter([
    {
      path: "/",
      element: <Main></Main> ,
      errorElement: <ErrorPage></ErrorPage>,
      children:[
        {
            path:'/',
            element: <Home></Home>
        },
        {
          path: '/login',
          element: <Login></Login>
        },
        {
          path: '/register',
          element: <Register></Register>
        },
        {
          path: '/contribute-resources',
          element: <Contribute></Contribute>
        },
        {
          path: '/find-resources',
          element: <PrivateRoute><FindResources></FindResources></PrivateRoute>
        },
        {
          path: '/find-resources-result',
          element: <FindResourcesResult></FindResourcesResult>
        },
        {
          path: '/leader-board',
          element: <LeaderBoard></LeaderBoard>
        },
        {
          path: '/winners',
          element: <Winners></Winners>
        },
        {
          path: '/videos',
          element: <Videos />
        },
        // {
        //   path: '/find-donors',
        //   element:<FindDonors></FindDonors>
        // },
        // {
        //   path: '/donate',
        //   element:<Donate></Donate>
        // },
        // {
        //   path: '/blogs',
        //   element:<Blogs></Blogs>
        // },
        // {
        //   path: '/about-us',
        //   element:<AboutUs></AboutUs>
        // },
        // {
        //   path: '/user/details/:userId',
        //   element: <SingleDetails></SingleDetails>,
        //   loader: ({params}) => fetch(`http://localhost:5000/user/details/${params.userId}`),
        // }
      ]
    },
    {
      path: '/dashboard',
      element: <PrivateRoute><Dashboard></Dashboard></PrivateRoute>,
      children: [
        {
          path:'/dashboard/home',
          element: <DashboardHome></DashboardHome>
        },
        {
          path:'/dashboard/admin/add-new/resource-title-info',
          element: <AddResourceTitle></AddResourceTitle>
        },
        {
          path:'/dashboard/user/profile-update',
          element: <UpdateProfile></UpdateProfile>
        },
        {
          path:'/dashboard/user/my-contribution',
          element: <MyContribution></MyContribution>
        },
        {
          path:'/dashboard/admin/manage-files',
          element: <AllFiles></AllFiles>
        },
        {
          path:'/dashboard/admin/manage-user',
          element: <ManageUsers></ManageUsers>
        },
      ]
    }
  ]);

  // /include-resource-title