import PropTypes from "prop-types";
import modifIcon from "../../assets/modif_user.png";

export default function SpecUser({ setImage, spec }) {
  return (
    <tr>
      <td className="picture-container mobile-hide">
        <img className="mobile-hide" src={spec.pict} alt="profil" />
      </td>
      <td>{spec.firstname}</td>
      <td>{spec.lastname}</td>
      <td>{spec.email}</td>
      <td>{spec.role}</td>
      <td>{spec.role2}</td>
      <td>{spec.date}</td>
      <td>
        <button
          type="button"
          className="viewBtn"
          onClick={() => {
            setImage(true);
          }}
        >
          <img src={modifIcon} alt="icon update" />
        </button>
      </td>
    </tr>
  );
}
SpecUser.propTypes = {
  setImage: PropTypes.func.isRequired,

  spec: PropTypes.shape.isRequired,
};
