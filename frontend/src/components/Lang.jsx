import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { Languages } from "../services/Languages.ts";

export default function Lang() {
  const { i18n } = useTranslation();
  const [lang, setLang] = useState(i18n.languages);

  const changeLanguage = (event) => {
    const languages = event.target.value;

    switch (languages) {
      case Languages.EN:
        setLang(Languages.EN);
        i18n.changeLanguage(Languages.EN);
        break;
      case Languages.ES:
        setLang(Languages.ES);
        i18n.changeLanguage(Languages.ES);
        break;
      case Languages.FR:
      default:
        setLang(Languages.FR);
        i18n.changeLanguage(Languages.FR);
        break;
    }
  };

  return (
    <div>
      <div>
        <select value={lang} name="languages" onChange={changeLanguage}>
          <option value={Languages.FR}>FR</option>
          <option value={Languages.EN}>EN</option>
          <option value={Languages.ES}>ES</option>
        </select>
      </div>
    </div>
  );
}
