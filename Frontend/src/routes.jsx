import { createBrowserRouter } from "react-router-dom";

// Layouts
import PublicLayout from "./Layouts/PublicLayout";
import DashboardLayout from './Components/ServiceConsumers/DashboardLayout.jsx';

// Wrappers
import HomePageWrapper from "./WrapperContainers/HomePageWrapper";

// Pages
import StudentDashboard from "./Components/ServiceConsumers/StudentDashboard.jsx";
import OwnerDashboard from "./Components/ServiceProviders/OwnerDashboard.jsx";

// Components
import AboutCampusCove from "./Components/LandingPage/AboutCampusCove.jsx";
import MessBookingInfo from "./Components/LandingPage/MessBookingInfo.jsx";
import OtherInfos from "./Components/LandingPage/OtherInfos.jsx";
import FacilitiesList from "./Components/LandingPage/FacilitiesList.jsx";
import MovingSlogan from "./Components/LandingPage/MovingSlogan.jsx";
import HostelBookingInfo from "./Components/LandingPage/HostelBookingInfo.jsx";
import FAQ from "./Components/LandingPage/FAQs.jsx";
import Contact from "./Components/LandingPage/Contact.jsx";
import Login from "./Components/Auth/Login.jsx";
import Register from "./Components/Auth/Register.jsx";
import VerifyEmail from "./Components/Auth/VerifyEmail.jsx";
import ErrorBoundary from "./Components/ErrorBoundary.jsx";
import Profile from "./Components/Profile.jsx";
import StudentProfile from "./Components/StudentProfile";
import OwnerProfile from "./Components/OwnerProfile";

// Components
import AllCustomers from "./Components/ServiceProviders/AllCustomers.jsx";
import Bookings from "./Components/ServiceProviders/Bookings.jsx";
import Revenew from "./Components/ServiceProviders/Revenew.jsx";
import ServiceManagement from "./Components/ServiceProviders/ServiceManagement.jsx";

// Protected Routes
import ProtectedRoute from "./Components/Protected/ProtectedRoute";

// ServiceConsumer Components
import Hostels from "./Components/ServiceConsumers/Hostels.jsx";
import MessServices from "./Components/ServiceConsumers/MessServices.jsx";
import Gym from "./Components/ServiceConsumers/Gym.jsx";
import MyBookings from "./Components/ServiceConsumers/MyBookings.jsx";

export const router = createBrowserRouter([
  {
    element: <PublicLayout />,
    errorElement: <ErrorBoundary />,
    children: [
      {
        path: "/",
        element: (
          <HomePageWrapper>
            <FacilitiesList />
            <HostelBookingInfo />
            <MovingSlogan />
            <MessBookingInfo />
            <OtherInfos />
          </HomePageWrapper>
        ),
      },
      {
        path: "/about",
        element: <AboutCampusCove />,
      },
      {
        path: "/faq",
        element: <FAQ />,
      },
      {
        path: "/contact",
        element: <Contact />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/register",
        element: <Register />,
      },
      {
        path: "/verify-email",
        element: <VerifyEmail />,
      },
    ],
  },
  {
    path: "/dashboard",
    element: (
      <ProtectedRoute allowedRoles={['student']}>
        <DashboardLayout />
      </ProtectedRoute>
    ),
    children: [
      {
        path: "",
        element: <StudentDashboard />
      },
      {
        path: "hostels",
        element: <Hostels />
      },
      {
        path: "mess",
        element: <MessServices />
      },
      {
        path: "gym",
        element: <Gym />
      },
      {
        path: "my-bookings",
        element: <MyBookings />
      },
      {
        path: "profile",
        element: <Profile />
      },
      {
        path: "enhanced-profile",
        element: <StudentProfile />
      }
      // Add other student routes
    ]
  },
  {
    path: "/owner-dashboard",
    element: (
      <ProtectedRoute allowedRoles={['hostelOwner', 'messOwner', 'gymOwner']}>
        <DashboardLayout />
      </ProtectedRoute>
    ),
    children: [
      {
        path: "",
        element: <OwnerDashboard />
      },
      {
        path: "profile",
        element: <OwnerProfile />
      },
      {
        path: "all-customers",
        element: <AllCustomers />
      },
      {
        path: "bookings",
        element: <Bookings />
      },
      {
        path: "revenew",
        element: <Revenew />
      },
      {
        path: "services",
        element: <ServiceManagement />
      }
      // Add other owner routes
    ]
  },
]);