import PropTypes from "prop-types";
import { useEffect, useState } from "react";

function Timeline({ decision }) {
  const [isSameDate, setIsSameDate] = useState("");
  // const initialDate = decision.initial_date;
  const parseInitialDate = Date.parse(decision.initial_date);

  const firstDate = new Date(decision.first_take_decision);
  const parseFirstDate = Date.parse(decision.first_take_decision);
  const situationFirstDate = parseFirstDate - parseInitialDate;

  // const finalDate = decision.final_take_decision;
  const parseFinalDate = Date.parse(decision.final_take_decision);
  // const situationFinalDate = parseFinalDate - parseInitialDate;

  const totalTime = parseFinalDate - parseInitialDate;

  const DayDate = new Date();
  const parseDayDate = Date.parse(DayDate);
  const situationDayDate = parseDayDate - parseInitialDate;
  const progressBar = Math.round((situationDayDate / totalTime) * 100);

  const firstDateProgress = Math.round((situationFirstDate / totalTime) * 100);
  // const finalDateProgress = Math.round((situationFirstDate / totalTime) * 100);

  const verificationDate = () => {
    if (parseDayDate === parseFirstDate) {
      setIsSameDate("-isSimilar");
    }
  };

  useEffect(() => {
    verificationDate();
  }, [decision]);

  return (
    <div className="timeline-container">
      <progress id="file" max="100" value={progressBar} />
      <div className="date-container" style={{ top: `${firstDateProgress}%` }}>
        <div className="date-infos">{firstDate.toLocaleDateString("fr")}</div>
        <div className={`date-point${isSameDate}`} />
        <div className="date-text">First take decision</div>
      </div>
    </div>
  );
}

Timeline.propTypes = {
  decision: PropTypes.shape({
    benefit: PropTypes.string.isRequired,
    concerned_hub: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
    context: PropTypes.string.isRequired,
    disadvantages: PropTypes.string.isRequired,
    final_take_decision: PropTypes.string.isRequired,
    first_take_decision: PropTypes.string.isRequired,
    firstname: PropTypes.string.isRequired,
    initial_date: PropTypes.string.isRequired,
    lastname: PropTypes.string.isRequired,
    photo: PropTypes.string.isRequired,
    title_decision: PropTypes.string.isRequired,
    title_status: PropTypes.string.isRequired,
    usefulness: PropTypes.string.isRequired,
  }).isRequired,
};

export default Timeline;
