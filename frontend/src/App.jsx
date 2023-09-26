import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import React, { useState } from "react";
import NewQuestion from "./pages/NewQuestion";
import NewUser from "./pages/NewUser";
import Menu from "./pages/Menu";
import Question from "./pages/Question";
import Score from "./pages/Score";
import Home from "./pages/Home";
import Header from "./components/Header";

import "./App.css";

function App() {
  const [score, setScore] = useState(0);
  return (
    <>
      <Header />
      <div className="Nav">
        <Router>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/newQuestion/:userId" element={<NewQuestion />} />
            <Route path="/newUser" element={<NewUser />} />
            <Route path="/menu/:userId" element={<Menu />} />
            <Route
              path="/question/:userId"
              element={<Question score={score} setScore={setScore} />}
            />
            <Route path="/score/:userId" element={<Score score={score} />} />
          </Routes>
        </Router>
      </div>
    </>
  );
}

export default App;
