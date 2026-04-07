import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState } from "react";

import Login from "./Login";
import Signup from "./Signup";
import Dashboard from "./Dashboard";
import Trips from "./Trips";
import CreateTrip from "./CreateTrip";
import TripDetails from "./TripDetails";
import Navbar from "./Navbar";
import TravelAssistant from "./TravelAssistant";

function App() {
  const [token, setToken] = useState(localStorage.getItem("token"));

  return (
    <Router>    
  <Navbar />
  <Routes>
        <Route path="/" element={<Login setToken={setToken} />} />

        <Route path="/signup" element={<Signup />} />

        <Route
          path="/dashboard"
          element={token ? <Dashboard /> : <Login setToken={setToken} />}
        />

        <Route
          path="/trips"
          element={token ? <Trips /> : <Login setToken={setToken} />}
        />

        <Route
          path="/create-trip"
          element={token ? <CreateTrip /> : <Login setToken={setToken} />}
        />

        <Route
          path="/trips/:id"
          element={token ? <TripDetails /> : <Login setToken={setToken} />}
        />
           
           <Route
       path="/assistant"
    element={token ? <TravelAssistant /> : <Login setToken={setToken} />}
   />

      </Routes>
    </Router>
  );
}

export default App;