import { useNavigate } from "react-router-dom";
import Img404 from "../assets/raton 1.png";
import logo from "../assets/make_sense.png";

export default function WrongPage() {
  const navigate = useNavigate();

  return (
    <>
      <div className="logo-container">
        <img src={logo} alt="logo" />
      </div>
      <div className="content-container">
        <img className="raccoon" src={Img404} alt="Raccoon" />
        <div className="text-container">
          <h1 className="wrongPage">Erreur 404</h1>
          <h2>Hey, mais qu’est-ce que tu fais là ?</h2>
          <p>
            Si tu es perdu(e), tu peux retourner sur la page principale en{" "}
            <button
              type="button"
              onClick={() => {
                setTimeout(() => {
                  navigate("/");
                }, 500);
              }}
            >
              cliquant ici !
            </button>
          </p>
        </div>
      </div>
    </>
  );
}
