import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useCookies } from "react-cookie";

// styles import
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

// component import
import Navigation from "./components/Navigation";
import Login from "./routes/Login";
import Home from "./routes/Home";
import Register from "./routes/Register";
import VolcanoList from "./routes/VolcanoList";
import Volcano from "./routes/Volcano";
import Footer from "./components/Footer";

function App() {
  const [cookies, setCookie, removeCookie] = useCookies(["token"]);

  return (
    <BrowserRouter>
      <div className="App">
        <Navigation cookies={cookies} />
        <div className="content">
          <Routes>
            <Route path="/" element={<Home cookies={cookies} />} />
            <Route
              path="/volcano-list"
              element={<VolcanoList cookies={cookies} />}
            />
            <Route path="/volcano" element={<Volcano cookies={cookies} removeCookie={removeCookie}/>} />
            <Route path="/register" element={<Register />} />
            <Route
              path="/login"
              element={
                <Login
                  cookies={cookies}
                  setCookie={setCookie}
                  removeCookie={removeCookie}
                />
              }
            />
          </Routes>
        </div>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
