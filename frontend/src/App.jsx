import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Classement from "./pages/Classement";
import NewQuestion from "./pages/NewQuestion";
import NewUser from "./pages/NewUser";
import Menu from "./pages/Menu";
import Question from "./pages/Question";
import Score from "./pages/Score";
import Home from "./pages/Home";
import Header from "./components/Header";
import Footer from "./components/Footer";

import "./App.css";

function App() {

  return (
    <div className="App">
      <Header />
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/classement" element={<Classement />} />
          <Route path="/newQuestion" element={<NewQuestion />} />
          <Route path="/newUser" element={<NewUser />} />
          <Route path="/menu" element={<Menu />} />
          <Route path="/question" element={<Question />} />
          <Route path="/score" element={<Score />} />
        </Routes>
      </Router>
      <Footer />
    </div>
  );
}

export default App;
