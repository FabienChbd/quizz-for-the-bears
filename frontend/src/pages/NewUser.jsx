import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./NewUser.css";

export default function NewQuestion() {
  const navigate = useNavigate();
  const [pseudo, setPseudo] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const handlePost = async () => {
    const data = {
      pseudo,
      password,
    };
    if (pseudo && password) {
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/createUser`,
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
        console.info("Utilisateur créé");
        setSuccessMessage(
          "Utilisateur créé, vous allez être redirigé dans quelques secondes"
        );
        setTimeout(() => {
          navigate(`/`);
        }, 2000);
      } else if (response.status === 400) {
        try {
          const responseData = await response.json();
          console.error("Erreur de validation :", responseData.error);
        } catch (error) {
          console.error("Erreur lors de l'analyse de la réponse JSON :", error);
        }
      } else {
        setErrorMessage(
          "Veuillez remplir tous les champs ou tiliser un pseudo différent"
        );
      }
    }
  };

  return (
    <div className="nav">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handlePost();
        }}
      >
        <div className="createUserForm">
          <input
            className="inputCreateUser"
            type="text"
            name="pseudo"
            maxLength={255}
            required
            placeholder="Tape le pseudo de ton choix ici"
            value={pseudo}
            onChange={(e) => setPseudo(e.target.value)}
          />
          <input
            className="inputCreateUser"
            type="password"
            name="password"
            maxLength={255}
            required
            placeholder="Tape le mot de passe de ton choix ici"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="validCreateUserForm">
          <button type="submit" className="btnCreateUser">
            Je veux un compte !!!
          </button>
        </div>
      </form>
      <div className="msgCreateUser">
        {errorMessage && <p className="error-message">{errorMessage}</p>}
        {successMessage && <p className="success-message">{successMessage}</p>}
      </div>
    </div>
  );
}
