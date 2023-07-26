import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import TimelineDate from "./TimelineDate";

export default function Timeline({ decision }) {
  const { t } = useTranslation();
  const status = [
    { id: 1, title: t("timeline.firstDeadline") },
    { id: 2, title: t("timeline.firstTake") },
    { id: 3, title: t("timeline.secondDeadline") },
  ];

  const dates = [
    {
      id: 1,
      date: decision.deadline_comment,
      title: status[0].title,
    },
    {
      id: 2,
      date: decision.first_take_decision,
      title: status[1].title,
    },
    {
      id: 3,
      date: decision.deadline_conflict,
      title: status[2].title,
    },
  ];
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
  const progressBar = Math.round((situationDayDate / totalTime) * 100 - 3);

  const finalDateProgress = Math.round(
    (situationFinalDate / totalTime) * 100 - 3
  );

  const finalDateProgressLimited = Math.min(
    Math.max(finalDateProgress, 0),
    100
  );

  useEffect(() => {
    if (parseDayDate >= parseFinalDate) {
      setFinaleSameInitial("-similar");
    } else {
      setFinaleSameInitial("");
    }
  }, [{ decision }]);

  return (
    <div className="timeline-container">
      <progress id="file" max="100" value={progressBar.toString()} />
      <div className="date-container" style={{ top: "0%" }}>
        <div className="date-infos-similar">
          {initialDate.toLocaleDateString(t("timeline.dateDisplay"))}
        </div>
        <div className="date-point-similar" />
        <div className="date-text-similar">{t("timeline.decisionOpen")}</div>
      </div>
      {dates &&
        dates.map((date) => (
          <TimelineDate
            key={date.id}
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
          {finalDate.toLocaleDateString(t("timeline.dateDisplay"))}
        </div>
        <div className={`date-point${finalSameInitial}`} />
        <div className={`date-text${finalSameInitial}`}>
          {t("timeline.finalDecision")}
        </div>
      </div>
    </div>
  );
}

Timeline.propTypes = {
  decision: PropTypes.shape({
    deadline_comment: PropTypes.string,
    deadline_conflict: PropTypes.string,
    final_take_decision: PropTypes.string,
    first_take_decision: PropTypes.string,
    initial_date: PropTypes.string,
  }),
};

Timeline.defaultProps = {
  decision: PropTypes.shape({
    deadline_comment: "2023-07-31T00:00:00.000Z",
    deadline_conflict: "2023-07-31T00:00:00.000Z",
    final_take_decision: "2023-07-31T00:00:00.000Z",
    first_take_decision: "2023-07-31T00:00:00.000Z",
    initial_date: "2023-07-31T00:00:00.000Z",
  }),
};
