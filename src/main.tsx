import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RewardsProvider } from "./contexts/RewardsContext.tsx";
import "./index.css";
import App from "./App.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RewardsProvider>
      <App />
    </RewardsProvider>
  </StrictMode>
);
