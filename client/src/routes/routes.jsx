import ProtectedRoute from "../components/ProtectedRoute";
import AdminDashboard from "../pages/AdminDashboard";
import ChatPage from "../pages/ChatPage";
import LandingPage from "../pages/LandingPage";
import LoginPage from "../pages/LoginPage";

const routes = [
    {
        path: '/login',
        element: <LoginPage />
    },
    {
        path: '/',
        element:
            <ProtectedRoute>
                <ChatPage />
            </ProtectedRoute>
    },
]

export default routes;