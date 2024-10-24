import ProtectedRoute from "../components/ProtectedRoute";
import AdminDashboard from "../pages/AdminDashboard";
import LandingPage from "../pages/LandingPage";
import LoginPage from "../pages/LoginPage";

const routes = [
    {
        path: '/',
        element:
            <ProtectedRoute>
                <LandingPage />
            </ProtectedRoute>
    },
    {
        path: '/login',
        element: <LoginPage />
    },
    {
        path: '/user',
        element:
            <ProtectedRoute users={['admin']}>
                <AdminDashboard />
            </ProtectedRoute>
    },
]

export default routes;