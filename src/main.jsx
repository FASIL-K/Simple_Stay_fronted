import React from "react";
import ReactDOM from "react-dom";
import App from "./App.jsx";
import "./index.css";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { ThemeProvider as TailwindThemeProvider } from "@material-tailwind/react";
import { ThemeProvider as MuiThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import theme from "./theme";
import { Provider } from "react-redux";
import { Store, persistor } from "./redux/Store.jsx";
import { PersistGate } from "redux-persist/integration/react";


ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={Store}>
    <PersistGate loading={null} persistor={persistor}>
      <GoogleOAuthProvider clientId="234749252477-m0eslhuqqefrmq44rm37nqp5aedpsi8n.apps.googleusercontent.com">
          <TailwindThemeProvider>
            <MuiThemeProvider theme={theme}>
              <CssBaseline />
              <App />
            </MuiThemeProvider>
          </TailwindThemeProvider>
      </GoogleOAuthProvider>
    </PersistGate>
  </Provider>
);
