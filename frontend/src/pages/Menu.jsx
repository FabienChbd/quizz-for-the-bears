import { useNavigate, useParams } from "react-router-dom";
import "./Menu.css";

export default function Menu() {
  const navigate = useNavigate();
  const { userId } = useParams();
  return (
    <div className="nav">
      <h2>Que veux tu faire ?</h2>
      <div className="choice">
        <button
          className="btnChoice"
          type="button"
          onClick={() => {
            navigate(`/question/${userId}`);
          }}
        >
          Faire le quizz !!!
        </button>
        <button
          className="btnChoice"
          type="button"
          onClick={() => {
            navigate(`/newQuestion/${userId}`);
          }}
        >
          Proposer une (ou plusieurs) questions !!!
        </button>
      </div>
    </div>
  );
}
