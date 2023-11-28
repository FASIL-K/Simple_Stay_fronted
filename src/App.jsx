import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AdminsRoute from "./routes/admins";
import "bootstrap/dist/css/bootstrap.min.css";
import OwnersRoutes from "./routes/Owners";
import UsersRoutes from "./routes/Users";
import UserHomePage from "./pages/User/UserHomePage";

function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<UserHomePage />} />
          <Route path="/admin/*" element={<AdminsRoute />} />
          <Route path="/customer/*" element={<OwnersRoutes />} />
          <Route path="/user/*" element={<UsersRoutes />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
