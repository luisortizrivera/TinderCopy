// import "./App.css";

import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginRegisterPage from "./components/LoginRegisterPage";

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<LoginRegisterPage />} />
          {/* <Route path="/book/:bookName" element={<BookData />} /> */}
          <Route
            path="*"
            element={
              <div>404 - This is not the webpage you are looking for</div>
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
