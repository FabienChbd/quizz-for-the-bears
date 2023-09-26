import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {  toast } from 'react-toastify';

export default function Home() {
  const navigate = useNavigate();
  const [pseudo, setPseudo] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    const data = {
      pseudo,
      password,
    };

    if (pseudo || password) {
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
        navigate("/menu");
      } else if (response.status === 400) {
        try {
          const responseData = await response.json();
          console.error("Erreur de validation :", responseData.error);
        } catch (error) {
          console.error("Erreur lors de l'analyse de la réponse JSON :", error);
        }
      } else {
        alert("Erreur dans le pseudo ou mot de passe");
      }
    } else {alert("Veuillez remplir tous les champs")}
  };

  return (
    <header className="App-header">

      <h2>Qui es tu ?</h2>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleLogin();
        }}
      >
        <input
          type="text"
          name="pseudo"
          placeholder="Tape ton pseudo ici"
          value={pseudo}
          onChange={(e) => setPseudo(e.target.value)}
        />
        <input
          type="password"
          name="password"
          placeholder="Tape ton password ici"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">C'est Parti !!!</button>
      </form>
      <button
        type="button"
        onClick={() => {
          navigate("/newUser");
        }}
      >
        J'ai pas de compte !!!
      </button>
    </header>
  );
}
