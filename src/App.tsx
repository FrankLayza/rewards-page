import { Routes, Route, Navigate, Outlet } from "react-router-dom";
import Layout from "./components/layout";
import Rewards from "./components/rewards-hub";
import Login from "./components/Login";
import SignUp from "./components/SignUp";
import { useAuth } from "./contexts/AuthContext";

// Protected Route Component
function ProtectedRoute() {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
}

function App() {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<SignUp />} />

      {/* Root redirect to login */}
      <Route path="/" element={<Navigate to="/login" replace />} />

      {/* Protected Routes */}
      <Route element={<ProtectedRoute />}>
        <Route element={<Layout />}>
          <Route path="/rewards" element={<Rewards />} />
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
