import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { TaskContextProvider } from "./context/TaskContext.tsx";
import { ToastProvider } from "./providers/ToastProvider.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <TaskContextProvider>
      <ToastProvider />
      <App />
    </TaskContextProvider>
  </StrictMode>
);
