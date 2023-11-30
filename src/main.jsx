import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { ThemeProvider } from "@material-tailwind/react";

ReactDOM.createRoot(document.getElementById("root")).render(
  <GoogleOAuthProvider clientId="234749252477-m0eslhuqqefrmq44rm37nqp5aedpsi8n.apps.googleusercontent.com">
    <React.StrictMode>
      <ThemeProvider>
        <App />
      </ThemeProvider>
    </React.StrictMode>
  </GoogleOAuthProvider>
);
