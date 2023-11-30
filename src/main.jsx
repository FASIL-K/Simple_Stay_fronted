  import React from "react";
  import ReactDOM from "react-dom/client";
  import App from "./App.jsx";
  import "./index.css";
  import { GoogleOAuthProvider } from "@react-oauth/google";
  import { ThemeProvider as TailwindThemeProvider } from "@material-tailwind/react";
  import { ThemeProvider as MuiThemeProvider } from "@mui/material/styles";
  import CssBaseline from "@mui/material/CssBaseline";
  import theme from "./theme";

  ReactDOM.createRoot(document.getElementById("root")).render(
    <GoogleOAuthProvider clientId="234749252477-m0eslhuqqefrmq44rm37nqp5aedpsi8n.apps.googleusercontent.com">
      <React.StrictMode>
        <TailwindThemeProvider>
          <MuiThemeProvider theme={theme}>
            <CssBaseline />
            <App />
          </MuiThemeProvider>
        </TailwindThemeProvider>
      </React.StrictMode>
    </GoogleOAuthProvider>
  );
