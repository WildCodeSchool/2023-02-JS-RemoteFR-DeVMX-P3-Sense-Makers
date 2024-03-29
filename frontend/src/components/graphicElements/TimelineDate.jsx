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

  const Progress = Math.round((situation / totalTime) * 100) - 1;

  useEffect(() => {
    if (parseDayDate >= parstDateI) {
      setDateInitial("-similar");
    } else {
      setDateInitial("");
    }
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
  initialDate: PropTypes.string,
  parseInitialDate: PropTypes.number,
  parseFinalDate: PropTypes.number,
  parseDayDate: PropTypes.number,
};

TimelineDate.defaultProps = {
  initialDate: "",
  parseInitialDate: 0,
  parseFinalDate: 0,
  parseDayDate: 0,
};
