import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import RegisterLoginPage from "./pages/RegisterLoginPage";
import ChatPage from "./pages/ChatPage";
import ProtectedRoute from "./components/RouteProtection";
import { MainPageProvider } from "./Context/MainPageContext";

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<RegisterLoginPage />} />
          {/* <Route path="/book/:bookName" element={<BookData />} /> */}
          <Route
            path="/chatPage"
            element={
              <ProtectedRoute>
                <MainPageProvider>
                  <ChatPage />
                </MainPageProvider>
              </ProtectedRoute>
            }
          />
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
