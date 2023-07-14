import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Decision from "./pages/Decision";
import MyDecisions from "./pages/MyDecisions";
import PostDecision from "./pages/PostDecision";
import Administration from "./pages/Administration";
import WrongPage from "./pages/WrongPage";
import ResetPassword from "./pages/ResetPassword";
import "react-toastify/dist/ReactToastify.css";
import "./scss/styles.scss";
import NavLayout from "./layouts/NavLayout";
import ProtectedLayout from "./layouts/ProtectedLayout";
import MyProfil from "./pages/MyProfil";
import PrivacyPolicy from "./pages/PrivacyPolicy";

function App() {
  return (
    <div className="app">
      <Router>
        <Routes>
          {/* public routes */}
          <Route path="/" element={<Login />} />
          <Route path="*" element={<WrongPage />} />
          <Route path="/resetpassword" element={<ResetPassword />} />
          <Route path="/privacypolicy" element={<PrivacyPolicy />} />

          {/* private routes  */}
          <Route element={<ProtectedLayout />}>
            <Route path="/logged" element={<NavLayout />}>
              <Route path="decisions" element={<Home />} />
              <Route path="users/mydecisions" element={<MyDecisions />} />
              <Route path="postdecision" element={<PostDecision />} />
              <Route path="decisions/:id" element={<Decision />} />
              <Route path="administration" element={<Administration />} />
              <Route path="myprofil" element={<MyProfil />} />
            </Route>
          </Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
