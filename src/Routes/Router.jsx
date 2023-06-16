import { createBrowserRouter } from "react-router-dom";
import Home from "../Page/Home/Home/Home";
import Main from "../Layout/Main";
import SingUp from "../Page/SingUp/SingUp";
import Login from "../Page/Login/Login";
import ErrorPage from "../components/ErrorPage";
import PrivateRoute from "./PrivateRoute";
import AdminDashBoard from "../Layout/AdminDashBoard";
import ManageUsers from "../Page/Dashboard/ManageUsers";
import AddAClass from "../Page/Dashboard/AddAClass";
import MyClasses from "../Page/Dashboard/MyClasses";
import AdminRoutes from "./AdminRoutes";
import ManageClasses from "../Page/Dashboard/ManageClasses";
import InstructorDashBoard from "../Layout/InstructorDashBoard";
import StudentDashboard from "../Layout/StudentDashboard";
import Class from "../Page/Class/Class";
import Instructors from "../Page/Instructors/Instructors";
import InstructorRoute from "./InstructorRoute";
import UpdateClass from "../Page/Dashboard/UpdateClass";
import MySelectedClassesPage from "../Page/Dashboard/MySelectedClassesPage";
import Payment from "../Page/Dashboard/Payment";
import MyEnrolledClasses from "../Page/Dashboard/MyEnrolledClasses";
import PaymtHistory from "../Page/Dashboard/PaymtHistory";
export const router = createBrowserRouter([
  {
    path: "/",
    errorElement: <ErrorPage />,
    element: <Main />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/class",
        element: <Class />,
      },
      {
        path: "/instructors",
        element: <Instructors />,
      },
      {
        path: "/singup",
        element: <SingUp />,
      },
      {
        path: "/login",
        element: <Login />,
      },
    ],
  },
  {
    path: "/admin-dashBoard",
    element: (
      <PrivateRoute>
        <AdminRoutes>
          <AdminDashBoard />
        </AdminRoutes>
      </PrivateRoute>
    ),
    children: [
      {
        path: "manage-class",
        element: <ManageClasses />,
      },
      {
        path: "manage-users",
        element: <ManageUsers />,
      },
    ],
  },
  {
    path: "/instructor-dashBoard",
    element: (
      <PrivateRoute>
        <InstructorRoute>
          <InstructorDashBoard />
        </InstructorRoute>
      </PrivateRoute>
    ),
    children: [
      {
        path: "add-class",
        element: <AddAClass />,
      },

      {
        path: "my-class",
        element: <MyClasses />,
      },
      {
        path: "update-class/:id",
        element: <UpdateClass />,
        loader: ({ params }) =>
          fetch(`${import.meta.env.VITE_API_URL}/update-class/${params.id}`),
      },
    ],
  },
  {
    path: "/student-dashBoard",
    element: (
      <PrivateRoute>
        <StudentDashboard />
      </PrivateRoute>
    ),
    children: [
      {
        path: "my-selected-class",
        element: <MySelectedClassesPage />,
      },
      {
        path: "my-enrolled-classes",
        element: <MyEnrolledClasses />,
      },
      {
        path: "payments",
        element: <Payment />,
      },
      {
        path: "payment-history",
        element: <PaymtHistory />,
      },
    ],
  },
]);
