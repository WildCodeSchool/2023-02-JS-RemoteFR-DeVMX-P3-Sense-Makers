import PropTypes from "prop-types";
import { useEffect, useState } from "react";

function Timeline({ decision }) {
  const [firstSameInitial, setFirstSameInitial] = useState("");
  const [finalSameInitial, setFinaleSameInitial] = useState("");
  const [deadlineCommentInitial, setDeadlineCommentInitial] = useState("");
  const [deadlineConflictInitial, setDeadlineConflictInitial] = useState("");

  const firstDate = new Date(decision.first_take_decision);
  const deadlineComment = new Date(decision.deadline_comment);
  const deadlineConflict = new Date(decision.deadline_conflict);
  const finalDate = new Date(decision.final_take_decision);
  const DayDate = new Date();
  const initialDate = new Date(decision.initial_date);

  const parseInitialDate = Date.parse(decision.initial_date);

  const parseFirstDate = Date.parse(decision.first_take_decision);
  const situationFirstDate = parseFirstDate - parseInitialDate;

  const parseDeadlineComment = Date.parse(decision.deadline_comment);
  const situationDeadlineComment = parseDeadlineComment - parseInitialDate;

  const parseDeadlineConflict = Date.parse(decision.deadline_conflict);
  const situationDeadlineConflict = parseDeadlineConflict - parseInitialDate;

  const parseFinalDate = Date.parse(decision.final_take_decision);
  const situationFinalDate = parseFinalDate - parseInitialDate;

  const totalTime = parseFinalDate - parseInitialDate;

  const parseDayDate = Date.parse(DayDate);
  const situationDayDate = parseDayDate - parseInitialDate;
  const progressBar = Math.round((situationDayDate / totalTime) * 100);

  const firstDateProgress =
    Math.round((situationFirstDate / totalTime) * 100) - 5;
  const deadlineCommentProgress =
    Math.round((situationDeadlineComment / totalTime) * 100) - 5;
  const deadlineConflictProgress =
    Math.round((situationDeadlineConflict / totalTime) * 100) - 5;
  const finalDateProgress =
    Math.round((situationFinalDate / totalTime) * 100) - 5;

  const finalDateProgressLimited = Math.min(
    Math.max(finalDateProgress, 0),
    100
  );

  const verificationDate = () => {
    if (parseDayDate >= parseFirstDate) {
      setFirstSameInitial("-similar");
    }
    if (parseDayDate >= parseFinalDate) {
      setFinaleSameInitial("-similar");
    }
    if (parseDayDate >= parseDeadlineComment) {
      setDeadlineCommentInitial("-similar");
    }
    if (parseDayDate >= parseDeadlineConflict) {
      setDeadlineConflictInitial("-similar");
    }
  };

  useEffect(() => {
    verificationDate();
  }, [decision]);

  return (
    <div className="timeline-container">
      <progress id="file" max="100" value={progressBar} />
      <div className="date-container" style={{ top: "0%" }}>
        <div className="date-infos-similar">
          {initialDate.toLocaleDateString("fr")}
        </div>
        <div className="date-point-similar" />
        <div className="date-text-similar">Prise de décision commencée</div>
      </div>
      <div
        className="date-container"
        style={{ top: `${deadlineCommentProgress}%` }}
      >
        <div className={`date-infos${deadlineCommentInitial}`}>
          {deadlineComment.toLocaleDateString("fr")}
        </div>
        <div className={`date-point${deadlineCommentInitial}`} />
        <div className={`date-text${deadlineCommentInitial}`}>
          Deadline pour donner son avis
        </div>
      </div>
      <div className="date-container" style={{ top: `${firstDateProgress}%` }}>
        <div className={`date-infos${firstSameInitial}`}>
          {firstDate.toLocaleDateString("fr")}
        </div>
        <div className={`date-point${firstSameInitial}`} />
        <div className={`date-text${firstSameInitial}`}>
          Prise de décision prise
        </div>
      </div>
      <div
        className="date-container"
        style={{ top: `${deadlineConflictProgress}%` }}
      >
        <div className={`date-infos${deadlineConflictInitial}`}>
          {deadlineConflict.toLocaleDateString("fr")}
        </div>
        <div className={`date-point${deadlineConflictInitial}`} />
        <div className={`date-text${deadlineConflictInitial}`}>
          Deadline pour rentrer en conflit
        </div>
      </div>
      <div
        className="date-container"
        style={{ top: `${finalDateProgressLimited}%` }}
      >
        <div className={`date-infos${finalSameInitial}`}>
          {finalDate.toLocaleDateString("fr")}
        </div>
        <div className={`date-point${finalSameInitial}`} />
        <div className={`date-text${finalSameInitial}`}>
          Décision définitive
        </div>
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
    deadline_comment: PropTypes.string.isRequired,
    deadline_conflict: PropTypes.string.isRequired,
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
