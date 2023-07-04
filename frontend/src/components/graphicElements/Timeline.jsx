import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import TimelineDate from "./TimelineDate";

function Timeline({ decision }) {
  const status = [
    { id: 1, title: "Prise de décision débutée" },
    { id: 2, title: "Deadline pour donner son avis" },
    { id: 3, title: "Première décision prise" },
    { id: 4, title: "Deadline pour entrer en conflit" },
    { id: 5, title: "Décision définitive" },
    { id: 6, title: "Décision non aboutie" },
    { id: 7, title: "Décision terminée" },
  ];

  const dates = [
    {
      id: 1,
      date: decision.deadline_comment,
      title: status[1].title,
    },
    {
      id: 2,
      date: decision.first_take_decision,
      title: status[2].title,
    },
    {
      id: 3,
      date: decision.deadline_conflict,
      title: status[3].title,
    },
  ];
  console.info(decision);
  const [finalSameInitial, setFinaleSameInitial] = useState("");

  const finalDate = new Date(decision.final_take_decision);
  const DayDate = new Date();
  const initialDate = new Date(decision.initial_date);

  const parseInitialDate = Date.parse(decision.initial_date);

  const parseFinalDate = Date.parse(decision.final_take_decision);
  const situationFinalDate = parseFinalDate - parseInitialDate;

  const totalTime = parseFinalDate - parseInitialDate;

  const parseDayDate = Date.parse(DayDate);
  const situationDayDate = parseDayDate - parseInitialDate;
  const progressBar = Math.round((situationDayDate / totalTime) * 100) - 3;

  const finalDateProgress =
    Math.round((situationFinalDate / totalTime) * 100) - 3;

  const finalDateProgressLimited = Math.min(
    Math.max(finalDateProgress, 0),
    100
  );

  const verificationDate = () => {
    if (parseDayDate >= parseFinalDate) {
      setFinaleSameInitial("-similar");
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
      {dates &&
        dates.map((date) => (
          <TimelineDate
            date={date}
            initialDate={decision.initial_date}
            parseInitialDate={parseFinalDate}
            parseFinalDate={parseInitialDate}
            parseDayDate={parseDayDate}
          />
        ))}
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
