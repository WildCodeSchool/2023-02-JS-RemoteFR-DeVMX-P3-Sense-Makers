import { useState } from "react";
import { useTranslation } from "react-i18next";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { Languages } from "../services/Languages.ts";

export default function Lang() {
  const { i18n } = useTranslation();
  let language = Languages.FR;
  const [lang, setLang] = useState(language);

  const changeLanguage = (event) => {
    setLang(event.target.value);
    language = event.target.value;

    switch (language) {
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
      <FormControl
        sx={{
          m: 0,
          minWidth: 100,
        }}
        size="small"
      >
        <InputLabel>Langue</InputLabel>
        <Select
          onChange={changeLanguage}
          value={lang}
          autoWidth
          label="language"
        >
          <MenuItem value={Languages.FR}>FR</MenuItem>
          <MenuItem value={Languages.EN}>EN</MenuItem>
          <MenuItem value={Languages.ES}>ES</MenuItem>
        </Select>
      </FormControl>
    </div>
  );
}
