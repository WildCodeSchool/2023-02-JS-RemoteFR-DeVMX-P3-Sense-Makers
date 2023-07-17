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
          const finalTakeDecisionDate = new Date(decision.final_take_decision);
          const differenceBetweenDatesByDays =
            (finalTakeDecisionDate.getTime() - deadlineConflict.getTime()) /
            (1000 * 3600 * 24);

          const finalTakeDecisionDateMonth =
            finalTakeDecisionDate.toLocaleString("default", {
              month: "long",
            });

          //* Category by status - Created
          if (initialDateMonth === monthArray[i]) {
            statsResult.created += 1;
          }

          //* Category by status - First take decision
          if (firstTakeDecisionDateMonth === monthArray[i]) {
            statsResult.firstMadeDecision += 1;
          }

          //! Need to calculate the diference between dates by days
          //* Category by status - Waiting for decision
          if (firstTakeDecisionDateMonth === monthArray[i]) {
            if (decision.status_id === 2) statsResult.waitingFor += 1;
          }

          //! Need to calculate the diference between dates by days
          //* Category by status - Waiting for expert decision
          if (firstTakeDecisionDateMonth === monthArray[i]) {
            if (decision.status_id === 3) statsResult.waitingForExpert += 1;
          }

          //* Category by status - Finished Not Valid and Finished Valid
          if (finalTakeDecisionDateMonth === monthArray[i]) {
            if (decision.is_validated === 0) statsResult.finishedNotValid += 1;
            if (decision.is_validated === 1) statsResult.finishedValid += 1;
          }

          //* Category by status - Not Finished
          if (finalTakeDecisionDateMonth === monthArray[i]) {
            if (differenceBetweenDatesByDays >= 15) {
              if (decision.is_validated === null) statsResult.notFinished += 1;
            }
          }

          //* Category by status - Total Finished
          statsResult.totalFinished += 1;
        }
        resultByMonth.push(statsResult);

        decisionsByMonth.push(resultByMonth[0]);
      }
    })
    .catch((err) => console.error(err));

  return decisionsByMonth;
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

          if (initialDateMonth === monthArray[i]) {
            if (decision.status_id === 2) statsResult.waitingFor += 1;
            if (decision.status_id === 3) statsResult.firstMadeDecision += 1;
            if (decision.status_id === 4) statsResult.waitingForExpert += 1;
            if (decision.is_validated === 0) statsResult.finishedNotValid += 1;
            if (decision.is_validated === 1) statsResult.finishedValid += 1;
            if (decision.status_id === 6) statsResult.totalFinished += 1;
            if (decision.status_id === 7) statsResult.notFinished += 1;

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
