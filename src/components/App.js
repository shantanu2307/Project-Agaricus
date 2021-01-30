import React from "react";
import Signup from "./SignUp";
import { AuthProvider } from "../contexts/AuthContext";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Dashboard from "./Dashboard";
import Login from "./Login";
import PrivateRoute from "./PrivateRoute";
import ForgotPassword from "./ForgotPassword";
import UpdateProfile from "./UpdateProfile";
import LandingPage from "./LandingPage";
import Seller from './Seller';
import SellerView from './SellerView'
function App() {
  return (
    <div className="w-100">
      <Router>
        <AuthProvider>
          <Switch>
            <Route exact path="/" component={LandingPage}></Route>
            <PrivateRoute exact path="/dashboard" component={Dashboard} />
            <PrivateRoute exact path="/seller" component={Seller} />
            <PrivateRoute exact path="/view-listings" component={SellerView} />
            <PrivateRoute path="/updateprofile" component={UpdateProfile} />
            <Route path="/signup" component={Signup} />
            <Route path="/login" component={Login} />
            <Route path="/forgot-password" component={ForgotPassword} />
          </Switch>
        </AuthProvider>
      </Router>
    </div>
  );
}

export default App;
