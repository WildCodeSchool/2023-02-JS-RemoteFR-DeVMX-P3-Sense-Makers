import { useState } from "react";
// import axios from "axios";
import Dropzone from "../../../services/hookDropzone";
import isValidEmail from "../../../services/isValidEmail";
import Avatar0 from "../../../assets/avatar0.png";

export default function UserManagement() {
  const [dropzoneImage, setDropzoneImage] = useState([]);
  // const [isExpert, setIsExpert] = useState(false);
  const [targetValues, setTargetValues] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    photo: dropzoneImage[0]?.preview,
    role: 0,
    roleExpert: false,
  });

  const update = (event) => {
    const target = event.currentTarget;

    setTargetValues({
      ...targetValues,
      [target.name]: target.type === "checkbox" ? target.checked : target.value,
    });
  };

  const isValidPhoto = () => {
    if (dropzoneImage.length === 0) return false;
    return true;
  };

  const validationRules = {
    firstName:
      !!targetValues.firstName && targetValues.firstName.match(/^ *$/) === null,
    lastName:
      !!targetValues.lastName && targetValues.lastName.match(/^ *$/) === null,
    email: isValidEmail(targetValues.email),
    password:
      !!targetValues.password &&
      targetValues.password.length > 8 &&
      targetValues.password.match(/^ *$/) === null,
    photo: isValidPhoto(),
    role: targetValues.role !== "0",
    roleExperts: true,
  };
  // console.log("🚀 - validationRules:", validationRules);
  // console.log("🚀 - targetValues.role:", targetValues.role);

  const submit = (event) => {
    event.preventDefault();

    const isValidForm = Object.values(validationRules).every((key) => key);

    if (isValidForm) {
      console.info("✅ Submitting form with state:", targetValues);
    } else {
      console.info("XXX Submitting form with state:", targetValues);
    }
  };
  // const handleAddNewUserButton = (
  //   userFirstName,
  //   userLastName,
  //   userPhoto,
  //   userEmail,
  //   userPassword,
  //   userRole,
  //   userIsExpert
  // ) => {
  //   axios
  //     .post(`${import.meta.env.VITE_BACKEND_URL}/users`, {
  //       firstname: userFirstName,
  //       lastname: userLastName,
  //       photo: userPhoto,
  //       email: userEmail,
  //       password: userPassword,
  //       role_id: parseInt(userRole, 10),
  //       is_expert: parseInt(userIsExpert, 10),
  //       creation_date: new Date().toJSON().slice(0, 10),
  //     })
  //     .catch((err) => console.error(err));
  // };

  return (
    <form className="user-management" onSubmit={submit}>
      <div className="input-container">
        <h2 className="input-title">Ajout d'utilisateur</h2>
        <div className="input-fields">
          <label htmlFor="lastName">
            Nom <br />
            <input
              type="text"
              id="lastName"
              name="lastName"
              placeholder="Insérez votre nom"
              // onChange={(e) => setLastName(e.target.value)}
              onChange={update}
              required
            />
          </label>
          <label htmlFor="firstName">
            Prénom <br />
            <input
              type="text"
              id="firstName"
              name="firstName"
              placeholder="Insérez votre prénom"
              // onChange={(e) => setFirstName(e.target.value)}
              onChange={update}
              required
            />
          </label>
          <label htmlFor="email">
            Email <br />
            <input
              type="email"
              id="email"
              name="email"
              className="input-email"
              placeholder="Insérez votre email"
              // onChange={(e) => setEmail(e.target.value)}
              onChange={update}
              required
            />
          </label>
          <label htmlFor="password">
            Mot de passe <br />
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Insérez votre mot de passe"
              // onChange={(e) => setPassword(e.target.value)}
              onChange={update}
              required
            />
          </label>
          <div className="roles-container">
            <label htmlFor="role">
              Role <br />
              <select
                id="role"
                name="role"
                // onChange={(e) => setRole(e.target.value)}
                onChange={update}
                required
              >
                <option value="0">Sélectionne votre role</option>
                <option value="1">Admin</option>
                <option value="2">Utilisateur</option>
              </select>
            </label>
            <label htmlFor="role-expert" className="role-expert">
              Expert <br />
              <input
                type="checkbox"
                id="role-expert"
                name="roleExpert"
                // onChange={(e) => setIsExpert(e.target.value)}
                onChange={update}
              />
            </label>
          </div>
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
        <div className="add-button-container">
          <button type="submit">Ajouter l'utilisateur</button>
          {/* <button
            type="button"
            onClick={() => {
              handleAddNewUserButton(
                firstName,
                lastName,
                dropzoneImage[0]?.preview,
                email,
                password,
                role,
                isExpert
              );
            }}
          >
            Ajouter l'utilisateur
          </button> */}
        </div>
      </div>
    </form>
  );
}
