// Landing Page Components
export { default as AboutCampusCove } from "./Components/LandingPage/AboutCampusCove";
export { default as MessBookingInfo } from "./Components/LandingPage/MessBookingInfo";
export { default as OtherInfos } from "./Components/LandingPage/OtherInfos";
export { default as FacilitiesList } from "./Components/LandingPage/FacilitiesList";
export { default as MovingSlogan } from "./Components/LandingPage/MovingSlogan";
export { default as HostelBookingInfo } from "./Components/LandingPage/HostelBookingInfo";
export { default as FAQ } from "./Components/LandingPage/FAQs";
export { default as Contact } from "./Components/LandingPage/Contact";

// Auth Components
export { default as Login } from "./Components/Auth/Login";
export { default as Register } from "./Components/Auth/Register";
export { default as VerifyEmail } from "./Components/Auth/VerifyEmail";

// Common Components
export { default as ErrorBoundary } from "./Components/ErrorBoundary";
export { default as Profile } from "./Components/Profile";
export { default as ProfileSetup } from "./Components/ProfileSetup";

// Protected Routes
export { default as ProtectedRoute } from "./Components/Protected/ProtectedRoute";

// Context
export { AuthProvider, useAuth } from "./Context/AuthContext";
export { StudentProfileProvider } from "./Context/StudentProfileContext";
export { OwnerProfileProvider } from "./Context/OwnerProfileContext";