import React from "react";
import ReactDOM from "react-dom/client";
import { QueryClient, QueryClientProvider } from "react-query";
import InitiativeOrder from "./components/InitiativeOrder";
import "./index.css";
import { FightersProvider } from "./contexts/FightersContext";

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <FightersProvider>
        <InitiativeOrder />
      </FightersProvider>
    </QueryClientProvider>
  </React.StrictMode>,
);
