import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import PropTypes from "prop-types";
import "./Score.css";

export default function Score({ score }) {
  const navigate = useNavigate();
  const { userId } = useParams();
  const [classement, setClassement] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_BACKEND_URL}/score`, {
      method: "GET",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setClassement(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Erreur lors de la récupération des scores :", error);
        setLoading(false);
      });
  }, []);

  return (
    <div className="Nav">
      <h2>Il est temps de regarder les scores !!!</h2>
      {loading ? (
        <p className="score">Chargement en cours...</p>
      ) : (
        <>
          <div>
            <p className="score">Ton score actuel : {score} </p>
          </div>
          <div>
            <div className="classement">
              <p className="classementGeneral">
                Classement général de la promo :
              </p>
            </div>
            <div className="classement">
              <p className="classementPseudoET">Pseudo</p>
              <p className="classementScoreET">Score</p>
            </div>
            {classement.map((gamer) => (
              <div className="classement" key={gamer.id}>
                <p className="classementPseudo">{gamer.pseudo}</p>
                <p className="classementScore">{gamer.score}</p>
              </div>
            ))}
          </div>
        </>
      )}
      <div className="end">
        <button
          type="button"
          className="btnEnd"
          onClick={() => {
            navigate(`/menu/${userId}`);
          }}
        >
          Revenir au menu
        </button>
      </div>
    </div>
  );
}

Score.propTypes = {
  score: PropTypes.number.isRequired,
};
