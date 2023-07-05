import { useEffect, useState } from "react";
import PropTypes from "prop-types";

export default function TimelineDate({
  date,
  initialDate,
  parseInitialDate,
  parseFinalDate,
  parseDayDate,
}) {
  const [dateInitial, setDateInitial] = useState("");

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
        {dateI.toLocaleDateString("fr")}
      </div>
      <div className={`date-point${dateInitial}`} />
      <div className={`date-text${dateInitial}`}>{date.title}</div>
    </div>
  );
}

TimelineDate.propTypes = {
  date: PropTypes.string.isRequired,
  initialDate: PropTypes.string.isRequired,
  parseInitialDate: PropTypes.string.isRequired,
  parseFinalDate: PropTypes.string.isRequired,
  parseDayDate: PropTypes.string.isRequired,
};
