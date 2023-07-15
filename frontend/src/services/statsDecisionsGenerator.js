/* eslint-disable no-unused-vars */
import axios from "axios";

const monthArray = [
  "janvier",
  "février",
  "mars",
  "avril",
  "mai",
  "juin",
  "juillet",
  "août",
  "septembre",
  "octobre",
  "novembre",
  "décembre",
];

export const statsDecisionsGeneratorByCategory = () => {
  const decisionsByMonth = [];
  axios
    .get(`${import.meta.env.VITE_BACKEND_URL}/decisions`, {
      withCredentials: true,
    })
    .then((response) => {
      for (let i = 0; i < monthArray.length; i += 1) {
        const resultByMonth = [];

        const statsResult = {
          created: 0,
          firstMadeDecision: 0,
          waitingFor: 0,
          waitingForExpert: 0,
          notFinished: 0,
          finishedValid: 0,
          finishedNotValid: 0,
          totalFinished: 0,
        };

        for (const decision of response.data) {
          const initialDate = new Date(decision.initial_date);
          const initialDateMonth = initialDate.toLocaleString("default", {
            month: "long",
          });
          const firstTakeDecisionDate = new Date(decision.first_take_decision);
          const firstTakeDecisionDateMonth =
            firstTakeDecisionDate.toLocaleString("default", {
              month: "long",
            });
          const deadlineConflict = new Date(decision.deadline_conflict);
          const deadlineConflictMonth = deadlineConflict.toLocaleString(
            "default",
            {
              month: "long",
            }
          );
          const finalTakeDecisionDate = new Date(decision.final_take_decision);
          const finalTakeDecisionDateMonth =
            finalTakeDecisionDate.toLocaleString("default", {
              month: "long",
            });

          if (initialDateMonth === monthArray[i]) {
            const decisionStatus = decision.status_id;
            const isValidatedDecision = decision.is_validated;

            if (decisionStatus === 2) statsResult.waitingFor += 1;
            if (decisionStatus === 3) statsResult.firstMadeDecision += 1;
            if (decisionStatus === 4) statsResult.waitingForExpert += 1;
            if (isValidatedDecision === 0) statsResult.finishedNotValid += 1;
            if (isValidatedDecision === 1) statsResult.finishedValid += 1;
            if (decisionStatus === 6) statsResult.totalFinished += 1;
            if (decisionStatus === 7) statsResult.notFinished += 1;

            statsResult.created += 1;
          }
        }
        resultByMonth.push(statsResult);
        decisionsByMonth.push(resultByMonth[0]);
      }
    })
    .catch((err) => console.error(err));
};

export const statsDecisionsGeneratorByMonth = () => {
  const decisionsByMonth = [];

  axios
    .get(`${import.meta.env.VITE_BACKEND_URL}/decisions`, {
      withCredentials: true,
    })
    .then((response) => {
      for (let i = 0; i < monthArray.length; i += 1) {
        const resultByMonth = [];

        const statsResult = {
          created: 0,
          firstMadeDecision: 0,
          waitingFor: 0,
          waitingForExpert: 0,
          notFinished: 0,
          finishedValid: 0,
          finishedNotValid: 0,
          totalFinished: 0,
        };

        for (const decision of response.data) {
          const initialDate = new Date(decision.initial_date);
          const initialDateMonth = initialDate.toLocaleString("default", {
            month: "long",
          });
          const firstTakeDecisionDate = new Date(decision.first_take_decision);
          const firstTakeDecisionDateMonth =
            firstTakeDecisionDate.toLocaleString("default", {
              month: "long",
            });
          const deadlineConflict = new Date(decision.deadline_conflict);
          const deadlineConflictMonth = deadlineConflict.toLocaleString(
            "default",
            {
              month: "long",
            }
          );
          const finalTakeDecisionDate = new Date(decision.final_take_decision);
          const finalTakeDecisionDateMonth =
            finalTakeDecisionDate.toLocaleString("default", {
              month: "long",
            });

          if (initialDateMonth === monthArray[i]) {
            const decisionStatus = decision.status_id;
            const isValidatedDecision = decision.is_validated;

            if (decisionStatus === 2) statsResult.waitingFor += 1;
            if (decisionStatus === 3) statsResult.firstMadeDecision += 1;
            if (decisionStatus === 4) statsResult.waitingForExpert += 1;
            if (isValidatedDecision === 0) statsResult.finishedNotValid += 1;
            if (isValidatedDecision === 1) statsResult.finishedValid += 1;
            if (decisionStatus === 6) statsResult.totalFinished += 1;
            if (decisionStatus === 7) statsResult.notFinished += 1;

            statsResult.created += 1;
          }
        }
        resultByMonth.push(statsResult);
        decisionsByMonth.push(resultByMonth[0]);
      }
    })
    .catch((err) => console.error(err));

  return decisionsByMonth;
};
