import React from "react";
import ReactDOM from "react-dom";
import { QueryClientProvider } from "react-query";
import { BrowserRouter } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { queryClient } from "./lib/reactQuery";
import Providers from "./providers";
import Routes from "./routes";
import "./styles/index.scss";

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <Providers>
          <Routes />
        </Providers>
      </QueryClientProvider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);
