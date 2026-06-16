/* import { StrictMode } from "react"; */
import { createRoot } from "react-dom/client";
import "bootstrap-icons/font/bootstrap-icons.css";
import App from "./App.tsx";
import { Buffer } from "buffer";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "./index.css";

window.Buffer = Buffer;

//Query Client
const queryClient = new QueryClient();

createRoot(document.getElementById("root")!).render(
  <QueryClientProvider client={queryClient}>
    <App />
  </QueryClientProvider>,
);
