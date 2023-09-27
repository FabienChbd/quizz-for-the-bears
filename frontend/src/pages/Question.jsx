import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import PropTypes from "prop-types";
import "./Question.css";

export default function Questions({ score, setScore }) {
  const navigate = useNavigate();
  const { userId } = useParams();
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [reponseGoodMessage, setGoodReponseMessage] = useState("");
  const [reponseBadMessage, setBadReponseMessage] = useState(null);
  const [showResult, setShowResult] = useState(false);
  // const [timer, setTimer] = useState(15);
  let timerInterval;

  useEffect(() => {
    fetch(`${import.meta.env.VITE_BACKEND_URL}/questions`, {
      method: "GET",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setQuestions(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Erreur lors de la récupération des questions :", error);
        setLoading(false);
      });
  }, []);

  // useEffect(() => {
  //   if (timer > 0 && !showResult) {
  //     timerInterval = setInterval(() => {
  //       setTimer((prevTimer) => prevTimer -1 );
  //     }, 1500);
  //   } else if (timer <= 0 && !showResult) {
  //     setBadReponseMessage("Temps écoulé !!!");
  //     setShowResult(true);

  //     setTimeout(() => {
  //       setCurrentQuestionIndex(currentQuestionIndex + 1);
  //       setShowResult(false);
  //       setGoodReponseMessage(null);
  //       setBadReponseMessage(null);
  //     }, 2000);
  //   }
  // }, [timer, showResult]);

  const verifyQuestion = (selectedAnswer) => {
    const currentQuestion = questions[currentQuestionIndex];
    if (selectedAnswer === currentQuestion.goodReponse) {
      setScore(score + 1);
      setGoodReponseMessage("Bonne réponse !!!");
    } else {
      setBadReponseMessage("Mauvaise réponse !!!");
    }
    setShowResult(true);
    clearInterval(timerInterval);

    setTimeout(() => {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setShowResult(false);
      setGoodReponseMessage(null);
      setBadReponseMessage(null);
    }, 1000);
  };

  const updateUserScore = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/users/update/${userId}`,
        {
          method: "PUT",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ score }),
        }
      );

      if (response.ok) {
        console.info("Score mis à jour avec succès !");
      } else {
        console.error("Erreur lors de la mise à jour du score.");
      }
    } catch (error) {
      console.error("Erreur lors de la mise à jour du score :", error);
    }
  };

  return (
    <div className="nav">
      <h2>Il est temps de vérifier tes connaissances !!!</h2>{" "}
      <div className="quizzBox">
        {loading && <p className="question">Chargement en cours...</p>}
        {!loading && currentQuestionIndex < questions.length && (
          <div>
            <p className="score">Ton score actuel : {score} </p>
            {/* <p>Temps : {timer} </p> */}

            <p className="question">
              Question {currentQuestionIndex + 1} : <br />
              {questions[currentQuestionIndex].quest}
            </p>
            <div className="reponsesBox">
              <button
                className="reponse"
                type="submit"
                onClick={() => verifyQuestion("repA")}
                disabled={showResult}
              >
                {questions[currentQuestionIndex].repA}
              </button>
              <button
                className="reponse"
                type="submit"
                onClick={() => verifyQuestion("repB")}
                disabled={showResult}
              >
                {questions[currentQuestionIndex].repB}
              </button>
              <button
                className="reponse"
                type="submit"
                onClick={() => verifyQuestion("repC")}
                disabled={showResult}
              >
                {questions[currentQuestionIndex].repC}
              </button>
              <button
                className="reponse"
                type="submit"
                onClick={() => verifyQuestion("repD")}
                disabled={showResult}
              >
                {questions[currentQuestionIndex].repD}
              </button>{" "}
            </div>
            {reponseGoodMessage && (
              <p className="reponse-good-message">{reponseGoodMessage}</p>
            )}
            {reponseBadMessage && (
              <p className="reponse-bad-message">{reponseBadMessage}</p>
            )}
          </div>
        )}
        {!loading && currentQuestionIndex >= questions.length && (
          <div className="scoreBox">
            <p className="end">Fin des questions</p>
            <button
              type="button"
              className="btnScore"
              onClick={async () => {
                await updateUserScore();
                navigate(`/score/${userId}`);
              }}
            >
              Voir mon score !!!
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

Questions.propTypes = {
  score: PropTypes.number.isRequired,
  setScore: PropTypes.func.isRequired,
};
