import { useState } from "react";
import Dropzone from "../../../services/hookDropzone";
import Avatar0 from "../../../assets/avatar0.png";

export default function UserManagement() {
  const [dropzoneImage, setDropzoneImage] = useState([]);
  return (
    <div className="user-management">
      <div className="input-container">
        <h2 className="input-title">Ajout d'utilisateur</h2>
        <div className="input-fields">
          <label htmlFor="lastName">
            Nom <br />
            <input
              type="text"
              placeholder="Insérez votre nom"
              name="lastName"
            />
          </label>
          <label htmlFor="firstName">
            Prénom <br />
            <input type="text" placeholder="Insérez votre prénom" />
          </label>
          <label htmlFor="email">
            Email <br />
            <input
              type="email"
              className="input-email"
              placeholder="Insérez votre email"
            />
          </label>
          <label htmlFor="password">
            Mot de passe <br />
            <input type="password" placeholder="Insérez votre mot de passe" />
          </label>
          <label htmlFor="role">
            Role <br />
            <select name="role" id="select-role">
              <option value="">Sélectionne votre role</option>
              <option value="">Admin</option>
              <option value="">Utilisateur</option>
            </select>
          </label>
        </div>
      </div>
      <div className="profile-photo-container">
        <label htmlFor="profile-photo-input">
          <Dropzone
            className="dropzone"
            dropzoneImage={dropzoneImage}
            setDropzoneImage={setDropzoneImage}
          />
          <img
            src={
              dropzoneImage[0]?.preview ? dropzoneImage[0]?.preview : Avatar0
            }
            alt="profil"
          />
        </label>
      </div>
      <div className="input-buttons-container">
        <button type="button">Ajouter l'utilisateur</button>
      </div>
    </div>
  );
}
