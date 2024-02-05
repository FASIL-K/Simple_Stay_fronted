import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AdminsRoute from "./routes/admins";
import "bootstrap/dist/css/bootstrap.min.css";
import OwnersRoutes from "./routes/Owners";
import UsersRoutes from "./routes/Users";
import UserType from "./components/User/login/UserType";
import PrivateRoute from "./ProtectedRoutes/PrivateRoute";
import UserLoginPage from "./pages/User/UserLoginPage";
import UserSignupPage from "./pages/User/UserSignupPage";
import EmailCheck from "./components/User/login/EmailCheck";
import Map from "./pages/Test";
import NearbyRestaurantsMap from "./pages/User/MapComponet";
import LocationSearch from "./pages/User/MapComponet";
import UserChat from "./components/Chat/ChatList";

function App() {
  return (
    <div>
      <Router>
        <Routes>


          <Route element={<PrivateRoute />}>
            <Route path="/" exact element={<UserLoginPage />} />
            <Route path="/map" exact element={<NearbyRestaurantsMap/>} />
            <Route path="/login/" exact element={<UserLoginPage />} />
            <Route path="/signup/" exact element={<UserSignupPage />} />
            <Route path="/usertype/" exact element={<UserType />} />
            <Route path="/emailcheck/" exact element={ <EmailCheck/>  } />
            
          </Route>

          <Route path="/admin/*" element={<AdminsRoute />} />
          <Route path="/owner/*" element={<OwnersRoutes />} />
          <Route path="/user/*" element={<UsersRoutes />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
