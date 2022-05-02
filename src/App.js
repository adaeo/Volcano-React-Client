import React, { useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";
import { useCookies } from "react-cookie";

// styles import
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

// component import
import Navigation from "./components/Navigation";
import Login from "./routes/Login";
import Register from "./routes/Register";
import VolcanoList from "./routes/VolcanoList";

function App() {
  const [token, setToken] = useState(null);
  const [cookies] = useCookies(["token"]);

  useEffect(() => {
    // Check login status
    if (cookies.token !== null && cookies.token !== undefined) {
      setToken(cookies.token);
    }
    // Ignore dependency error on cookies.token. This effect
    // only needs to run once on initial load of App. Token
    // updates are done elsewhere.
    // eslint-disable-next-line
  }, []);

  return (
    <BrowserRouter>
      <div className="App">
        <Navigation login={token} />
        <Routes>
          <Route path="/" element={<h1>Home</h1>} />
          <Route path="/volcano-list" element={<VolcanoList />} />
          <Route path="/register" element={<Register />} />
          <Route
            path="/login"
            element={<Login token={token} setToken={setToken} />}
          />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
