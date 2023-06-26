import PropTypes from "prop-types";
import { useEffect, useState } from "react";

function Timeline({ decision }) {
  const [firstSameInitiale, setFirstSameInitiale] = useState("");
  const [finalSameInitiale, setFinaleSameInitiale] = useState("");
  const firstDate = new Date(decision.first_take_decision);
  const finalDate = new Date(decision.final_take_decision);
  const DayDate = new Date();
  const initialDate = new Date(decision.initial_date);

  const parseInitialDate = Date.parse(decision.initial_date);

  const parseFirstDate = Date.parse(decision.first_take_decision);
  const situationFirstDate = parseFirstDate - parseInitialDate;

  const parseFinalDate = Date.parse(decision.final_take_decision);
  const situationFinalDate = parseFinalDate - parseInitialDate;

  const totalTime = parseFinalDate - parseInitialDate;

  const parseDayDate = Date.parse(DayDate);
  const situationDayDate = parseDayDate - parseInitialDate;
  const progressBar = Math.round((situationDayDate / totalTime) * 100);

  const firstDateProgress =
    Math.round((situationFirstDate / totalTime) * 100) - 9;
  const finalDateProgress =
    Math.round((situationFinalDate / totalTime) * 100) - 9;

  const finalDateProgressLimited = Math.min(
    Math.max(finalDateProgress, 0),
    100
  );

  const verificationDate = () => {
    if (parseDayDate >= parseFirstDate) {
      setFirstSameInitiale("-similar");
    }
    if (parseDayDate >= parseFinalDate) {
      setFinaleSameInitiale("-similar");
    }
  };

  useEffect(() => {
    verificationDate();
  }, [decision]);

  return (
    <div className="timeline-container">
      <progress id="file" max="100" value={progressBar} />
      <div className="date-container" style={{ top: "0%" }}>
        <div className="date-infos">{initialDate.toLocaleDateString("fr")}</div>
        <div className="date-point-similar" />
        <div className="date-text">Prise de décision commencée</div>
      </div>
      <div className="date-container" style={{ top: `${firstDateProgress}%` }}>
        <div className="date-infos">{firstDate.toLocaleDateString("fr")}</div>
        <div className={`date-point${firstSameInitiale}`} />
        <div className="date-text">Deadline pour donner son avis</div>
      </div>
      <div
        className="date-container"
        style={{ top: `${finalDateProgressLimited}%` }}
      >
        <div className="date-infos">{finalDate.toLocaleDateString("fr")}</div>
        <div className={`date-point${finalSameInitiale}`} />
        <div className="date-text">Décision définitive</div>
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
