import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import LandingScreen from "./screens/LandingScreen/LandingScreen";
import PatientLisingScreen from "./screens/PatientLisingScreen/PatientListingScreen";
import PatientDetailScreen from "./screens/PatientDetailScreen/PatientDetailScreen";
function App() {
  return (
    <div>
      <Router basename="/AliveCor">
        <Route path="/" component={LandingScreen} exact />
        <Route path="/patients" component={PatientLisingScreen} exact />
        <Route path="/patients/:id" component={PatientDetailScreen} exact />
      </Router>
    </div>
  );
}

export default App;
