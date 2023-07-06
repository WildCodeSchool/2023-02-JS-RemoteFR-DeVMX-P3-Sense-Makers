import { useEffect, useState } from "react";
import axios from "axios";
import Dropzone from "../../../services/hookDropzone";
import inputValidationRules from "../../../services/inputValidationRules";

export default function AddUser() {
  const [dropzoneImage, setDropzoneImage] = useState([]);
  const [newUploadedFileName, setNewUploadedFileName] = useState("");
  const [rolesData, setRolesData] = useState([]);
  const [requireSelect, setRequiredSelect] = useState(false);

  const [targetValues, setTargetValues] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    photo: newUploadedFileName,
    role: "",
    roleExpert: false,
  });

  const update = (event) => {
    const target = event.currentTarget;

    setTargetValues({
      ...targetValues,
      [target.name]: target.type === "checkbox" ? target.checked : target.value,
      photo: newUploadedFileName,
    });
  };

  useEffect(() => {
    setTargetValues({
      ...targetValues,
      photo: newUploadedFileName,
    });
  }, [newUploadedFileName]);

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_BACKEND_URL}/roles`)
      .then((response) => setRolesData(response.data))
      .catch((err) => console.error(err));
  }, []);

  const submit = (event) => {
    event.preventDefault();

    const isValidForm = Object.values(inputValidationRules(targetValues)).every(
      (key) => key
    );

    if (isValidForm) {
      axios
        .post(`${import.meta.env.VITE_BACKEND_URL}/users`, {
          firstname: targetValues.firstName,
          lastname: targetValues.lastName,
          photo: newUploadedFileName || "default_avatar.png",
          email: targetValues.email,
          password: targetValues.password,
        })
        .then((response) => {
          if (response.status === 201 && !targetValues.roleExpert) {
            axios
              .post(
                `${import.meta.env.VITE_BACKEND_URL}/users/${
                  response.data.insertId
                }/role`,
                {
                  roleId: parseInt(targetValues.role, 10),
                }
              )
              .catch((err) => console.error(err));
          } else {
            axios
              .post(
                `${import.meta.env.VITE_BACKEND_URL}/users/${
                  response.data.insertId
                }/role`,
                {
                  roleId: parseInt(targetValues.role, 10),
                }
              )
              .catch((err) => console.error(err));
            axios
              .post(
                `${import.meta.env.VITE_BACKEND_URL}/users/${
                  response.data.insertId
                }/role`,
                {
                  roleId: 3,
                }
              )
              .catch((err) => console.error(err));
          }
          if (response.status === 201) {
            axios
              .post(`${import.meta.env.VITE_BACKEND_URL}/sendmail`, {
                id: response.data.insertId,
                email: targetValues.email,
              })
              .catch((err) => console.error(err));
          }
        });
    } else {
      console.info("Not valid form:", inputValidationRules(targetValues));
      const invalidInputsTargets = inputValidationRules(targetValues);
      if (!invalidInputsTargets.role) {
        setRequiredSelect(true);
      }
    }
  };
  return (
    <form className="add-user-management" onSubmit={submit}>
      <div className="add-user-title-container">
        <h2 className="add-user-title">Ajout d'utilisateur</h2>
      </div>
      <div className="user-management-container">
        <div className="input-container">
          <div className="input-fields">
            <div className="input-fields name-inputs-container">
              <label htmlFor="lastName" className="lastName">
                Nom <br />
                <input
                  type="text"
                  name="lastName"
                  placeholder="Insérez votre nom"
                  onChange={update}
                  required
                />
              </label>
              <label htmlFor="firstName" className="firstName">
                Prénom <br />
                <input
                  type="text"
                  name="firstName"
                  placeholder="Insérez votre prénom"
                  onChange={update}
                  required
                />
              </label>
            </div>
            <label htmlFor="email">
              Email <br />
              <input
                type="email"
                name="email"
                className="input-email"
                placeholder="Insérez votre email"
                onChange={update}
                required
              />
            </label>
            <label htmlFor="password">
              Mot de passe <br />
              <input
                type="password"
                name="password"
                placeholder="Insérez votre mot de passe"
                onChange={update}
                required
                minLength="8"
              />
            </label>
            <div className="roles-container-1">
              <label htmlFor="role">
                Rôle <br />
                <select
                  className={requireSelect ? "require-select" : ""}
                  name="role"
                  defaultValue="Sélectionne votre rôle"
                  onChange={update}
                  onClick={() => setRequiredSelect(false)}
                >
                  <option disabled>Sélectionne votre rôle</option>
                  {rolesData
                    .filter((roleExpert) => roleExpert.role_name !== "Expert")
                    .map((role) => (
                      <option key={role.id} value={role.id}>
                        {role.role_name}
                      </option>
                    ))}
                </select>
              </label>
              <label htmlFor="role-expert" className="role-expert">
                Expert <br />
                <input type="checkbox" name="roleExpert" onChange={update} />
              </label>
            </div>
          </div>
        </div>
        <div className="profile-photo-container">
          <label htmlFor="profile-photo-input">
            <div className="img-container">
              <img
                src={
                  dropzoneImage[0]?.preview
                    ? dropzoneImage[0]?.preview
                    : `${
                        import.meta.env.VITE_BACKEND_URL
                      }/assets/images/default_avatar.png`
                }
                alt="profil"
              />
            </div>
            <Dropzone
              className="dropzone"
              dropzoneImage={dropzoneImage}
              setDropzoneImage={setDropzoneImage}
              setNewUploadedFileName={setNewUploadedFileName}
            />
          </label>
        </div>
        <div className="input-buttons-container">
          <div className="roles-container-2">
            <label htmlFor="role">
              Rôle <br />
              <select
                className={requireSelect ? "require-select" : ""}
                name="role"
                defaultValue="Sélectionne votre rôle"
                onChange={update}
                onClick={() => setRequiredSelect(false)}
              >
                <option disabled>Sélectionne votre rôle</option>
                {rolesData
                  .filter((roleExpert) => roleExpert.role_name !== "Expert")
                  .map((role) => (
                    <option key={role.id} value={role.id}>
                      {role.role_name}
                    </option>
                  ))}
              </select>
            </label>
            <label htmlFor="role-expert" className="role-expert-2">
              <input type="checkbox" name="roleExpert" onChange={update} />
              Expert(e)
            </label>
          </div>
          <div className="add-button-container">
            <button type="submit">Ajouter l'utilisateur</button>
          </div>
        </div>
      </div>
    </form>
  );
}
