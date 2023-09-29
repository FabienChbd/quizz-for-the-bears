import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./NewQuestion.css";

export default function NewQuestion() {
  const navigate = useNavigate();
  const [quest, setQuest] = useState("");
  const [repA, setRepA] = useState("");
  const [repB, setRepB] = useState("");
  const [repC, setRepC] = useState("");
  const [repD, setRepD] = useState("");
  const [goodReponse, setGoodReponse] = useState("");
  const [errorMessage, setErrorMessage] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const { userId } = useParams();
  const authorId = userId;
  const handlePost = async () => {
    const data = {
      quest,
      repA,
      repB,
      repC,
      repD,
      goodReponse,
      authorId,
    };
    if (quest && repA && repB && goodReponse) {
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/createQuest/${authorId}`,
        {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );

      if (response.status === 201) {
        console.info("Question soumise");
        setSuccessMessage("Question envoyée");
      } else if (response.status === 400) {
        try {
          const responseData = await response.json();
          console.error("Erreur de validation :", responseData.error);
        } catch (error) {
          console.error("Erreur lors de l'analyse de la réponse JSON :", error);
        }
      } else {
        setErrorMessage("Veuillez remplir tous les champs");
      }
    }
  };

  return (
    <div className="nav">
      <div className="createBox">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handlePost();
          }}
        >
          <input
            className="questionC"
            type="text"
            name="quest"
            maxLength={255}
            required
            placeholder="Tape ta question ici"
            value={quest}
            onChange={(e) => setQuest(e.target.value)}
          />
          <div className="reponsesBox">
            <input
              className="reponse"
              type="text"
              name="repA"
              maxLength={255}
              required
              placeholder="Tape la première réponse ici"
              value={repA}
              onChange={(e) => setRepA(e.target.value)}
            />
            <input
              className="reponse"
              type="text"
              name="repB"
              maxLength={255}
              required
              placeholder="Tape la deuxième réponse ici"
              value={repB}
              onChange={(e) => setRepB(e.target.value)}
            />
            <input
              className="reponse"
              type="text"
              name="repC"
              maxLength={255}
              placeholder="Tape la troisième réponse ici"
              value={repC}
              onChange={(e) => setRepC(e.target.value)}
            />
            <input
              className="reponse"
              type="text"
              name="repD"
              maxLength={255}
              placeholder="Tape la quatrième réponse ici"
              value={repD}
              onChange={(e) => setRepD(e.target.value)}
            />{" "}
          </div>
          <div className="boxGoodReponse">
            <select
              className="goodReponse"
              name="goodReponse"
              required
              value={goodReponse} // Assurez-vous de contrôler la valeur sélectionnée
              onChange={(e) => setGoodReponse(e.target.value)}
            >
              <option value="">---Choisissez la bonne réponse ?---</option>
              {repA && repB && (
                <option className="goodChoice" value="repA">
                  {repA}
                </option>
              )}
              {repA && repB && (
                <option className="goodChoice" value="repB">
                  {repB}
                </option>
              )}
              {repA && repB && repC && (
                <option className="goodChoice" value="repC">
                  {repC}
                </option>
              )}
              {repA && repB && repD && (
                <option className="goodChoice" value="repD">
                  {repD}
                </option>
              )}
              {(!repA || !repB) && (
                <option className="goodChoice" value="">
                  Veuillez saisir d'abord une réponse A et B
                </option>
              )}
            </select>
          </div>
          <div className="boxEnvoi">
            <button className="btnEnvoi" type="submit">
              J'envoi !!!
            </button>
          </div>
        </form>
      </div>
      {errorMessage && <p className="error-message">{errorMessage}</p>}
      {successMessage && <p className="error-message">{successMessage}</p>}
      <div className="returnBox">
        <button
          className="btnMenu"
          type="button"
          onClick={() => {
            navigate(`/menu/${userId}`);
          }}
        >
          Retour au menu
        </button>
      </div>
    </div>
  );
}
