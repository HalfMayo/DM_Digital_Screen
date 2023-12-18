import React from "react";
import ReactDOM from "react-dom/client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import InitiativeOrder from "./components/InitiativeOrder";
import "./index.css";
import { FightersProvider } from "./contexts/FightersContext";
import Sidebar from "./components/Sidebar";

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <Sidebar />
      <FightersProvider>
        <InitiativeOrder />
      </FightersProvider>
    </QueryClientProvider>
  </React.StrictMode>
);
