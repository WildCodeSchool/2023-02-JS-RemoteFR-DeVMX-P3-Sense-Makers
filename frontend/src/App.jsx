import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/header/Header";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Decision from "./pages/Decision";
import MyDecisions from "./pages/MyDecisions";
import PostDecision from "./pages/PostDecision";
import Profile from "./pages/Profile";
import WrongPage from "./pages/WrongPage";

import "./scss/styles.scss";

function App() {
  return (
    <div className="app">
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/decisions" element={<Home />} />
          <Route path="/users/:id/decisions" element={<MyDecisions />} />
          <Route path="/postdecision" element={<PostDecision />} />
          <Route path="/decisions/:id" element={<Decision />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="*" element={<WrongPage />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
