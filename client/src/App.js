import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import LoginRegisterPage from "./pages/LoginRegisterPage";
import RegisterLoginPage from "./pages/RegisterLoginPage";
import ChatPage from "./pages/ChatPage";

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          {/* <Route path="/" element={<LoginRegisterPage />} /> */}
          <Route path="/" element={<RegisterLoginPage />} />
          {/* <Route path="/book/:bookName" element={<BookData />} /> */}
          {/* <Route path="/chatPage" element={<ChatPage />} /> */}
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
