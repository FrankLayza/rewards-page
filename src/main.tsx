import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext.tsx";
import { RewardsProvider } from "./contexts/RewardsContext.tsx";
import "./index.css";
import App from "./App.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <RewardsProvider>
          <App />
        </RewardsProvider>
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>
);
