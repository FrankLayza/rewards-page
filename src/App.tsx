import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Layout from "./components/layout";
import Rewards from "./components/rewards-hub";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Routes (like Login) would go here */}

        {/* Protected Routes wrapped in Layout */}
        <Route element={<Layout />}>
          <Route path="/" element={<Navigate to="/rewards" replace />} />
          <Route path="/rewards" element={<Rewards />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
