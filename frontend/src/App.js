
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState } from "react";
import { GlobalProvider } from "./context/globalContext";
import { GlobalStyle } from "./styles/GlobalStyle";
import Login from "./Components/login";
import Signup from "./Components/sigup";
import Home from "./Components/home";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route
            path="/home"
            element={
              <>
                <GlobalStyle />
                <GlobalProvider>
                  <Home />
                </GlobalProvider>
              </>
            }
          />
        </Routes>
      </Router>
    </div>
  );
}
export default App;

