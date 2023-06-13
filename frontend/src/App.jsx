import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/header/Header";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Decision from "./pages/Decision";
import MyDecisions from "./pages/MyDecisions";
import PostDecision from "./pages/PostDecision";
import Profil from "./pages/Profil";
import WrongPage from "./pages/WrongPage";

import "./scss/styles.scss";

function App() {
  return (
    <div className="app">
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/alldecisions" element={<Home />} />
          <Route path="/decision" element={<Decision />} />
          <Route path="/mydecisions" element={<MyDecisions />} />
          <Route path="/postdecision" element={<PostDecision />} />
          <Route path="/profil" element={<Profil />} />
          <Route path="*" element={<WrongPage />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
