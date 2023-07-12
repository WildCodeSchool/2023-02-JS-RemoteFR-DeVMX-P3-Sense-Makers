import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";

export default function TimelineDate({
  date,
  initialDate,
  parseInitialDate,
  parseFinalDate,
  parseDayDate,
}) {
  const [dateInitial, setDateInitial] = useState("");
  const { t } = useTranslation();

  const dateI = new Date(date.date);
  const parstDateI = Date.parse(date.date);
  const situation = parstDateI - parseInitialDate;

  const totalTime = parseFinalDate - parseInitialDate;

  const Progress = Math.round((situation / totalTime) * 100) - 3;

  const verificationDate = () => {
    if (parseDayDate >= parstDateI) {
      setDateInitial("-similar");
    }
  };

  useEffect(() => {
    verificationDate();
  }, [initialDate]);

  return (
    <div className="date-container" style={{ bottom: `${Progress}%` }}>
      <div className={`date-infos${dateInitial}`}>
        {dateI.toLocaleDateString(t("timeline.dateDisplay"))}
      </div>
      <div className={`date-point${dateInitial}`} />
      <div className={`date-text${dateInitial}`}>{date.title}</div>
    </div>
  );
}

TimelineDate.propTypes = {
  date: PropTypes.shape({
    id: PropTypes.number.isRequired,
    date: PropTypes.string,
    title: PropTypes.string.isRequired,
  }).isRequired,
  initialDate: PropTypes.string.isRequired,
  parseInitialDate: PropTypes.number.isRequired,
  parseFinalDate: PropTypes.number.isRequired,
  parseDayDate: PropTypes.number.isRequired,
};
