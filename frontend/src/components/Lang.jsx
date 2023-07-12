import { useTranslation } from "react-i18next";
import { Languages } from "../services/Languages.ts";

export default function Lang() {
  const { i18n } = useTranslation();

  const changeLanguage = (event) => {
    const languages = event.target.value;

    switch (languages) {
      case Languages.EN:
        i18n.changeLanguage(Languages.EN);
        break;
      case Languages.ES:
        i18n.changeLanguage(Languages.ES);
        break;
      case Languages.FR:
      default:
        i18n.changeLanguage(Languages.FR);
        break;
    }
  };

  return (
    <div>
      <div>
        <select name="languages" onChange={changeLanguage}>
          <option value={Languages.FR}>FR</option>
          <option value={Languages.EN}>EN</option>
          <option value={Languages.ES}>ES</option>
        </select>
      </div>
    </div>
  );
}
