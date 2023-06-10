import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Login from "./pages/Login";
import Decision from "./pages/Decision";
import MyDecisions from "./pages/MyDecisions";
import PostDecision from "./pages/PostDecision";
import Profil from "./pages/Profil";
import WrongPage from "./pages/WrongPage";

import "./scss/styles.scss";

function App() {
  return (
    <div className="app">
      <Header />
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/decision" element={<Decision />} />
          <Route path="/myDecisions" element={<MyDecisions />} />
          <Route path="/postDecision" element={<PostDecision />} />
          <Route path="/profil" element={<Profil />} />
          <Route path="*" element={<WrongPage />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
