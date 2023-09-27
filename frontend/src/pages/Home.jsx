import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Home.css";

export default function Home() {
  const navigate = useNavigate();
  const [pseudo, setPseudo] = useState(null);
  const [password, setPassword] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

  const handleLogin = async () => {
    const data = {
      pseudo,
      password,
    };

    if (pseudo && password) {
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/users/login`,
        {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );
      if (response.status === 200) {
        console.info("Connexion réussie");
        const responseData = await response.json();
        const { userId } = responseData;
        console.info(responseData);
        navigate(`/menu/${userId}`);
      } else if (response.status === 400) {
        try {
          const responseData = await response.json();
          console.error("Erreur de validation :", responseData.error);
        } catch (error) {
          console.error("Erreur lors de l'analyse de la réponse JSON :", error);
        }
      } else {
        setErrorMessage("Erreur dans le pseudo ou mot de passe");
      }
    } else {
      setErrorMessage("Veuillez remplir tous les champs");
    }
  };

  return (
    <div className="nav">
      <h2>Qui es tu ?</h2>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleLogin();
        }}
      >
        <div className="loginForm">
          <input
            className="loginInput"
            type="text"
            name="pseudo"
            required
            placeholder="Tape ton pseudo ici"
            value={pseudo}
            onChange={(e) => setPseudo(e.target.value)}
          />
          <input
            className="loginInput"
            type="password"
            name="password"
            required
            placeholder="Tape ton password ici"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="validForm">
          <button className="btnLogin" type="submit">
            C'est Parti !!!
          </button>
        </div>
      </form>
      {errorMessage && <p className="error-message">{errorMessage}</p>}
      <div className="noAccount">
        <button
          className="btnLogin"
          type="button"
          onClick={() => {
            navigate("/newUser");
          }}
        >
          J'ai pas de compte !!!
        </button>
      </div>
    </div>
  );
}
