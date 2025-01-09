const WORK_TITLE = "Work";
const PLAY_TITLE = "Play";
const STUDY_TITLE = "Study";
const EXERCISE_TITLE = "Exercise";
const SOCIAL_TITLE = "Social";
const SELF_CARE_TITLE = "Self Care";

const DAILY_TIMEFRAME = "daily";
const WEEKLY_TIMEFRAME = "weekly";
const MONTHLY_TIMEFRAME = "monthly";

const workCurrent = document.getElementById("work-current-period");
const workPrevious = document.getElementById("work-previous-period");
const playCurrent = document.getElementById("play-current-period");
const playPrevious = document.getElementById("play-previous-period");
const studyCurrent = document.getElementById("study-current-period");
const studyPrevious = document.getElementById("study-previous-period");
const exerciseCurrent = document.getElementById("exercise-current-period");
const exercisePrevious = document.getElementById("exercise-previous-period");
const socialCurrent = document.getElementById("social-current-period");
const socialPrevious = document.getElementById("social-previous-period");
const selfCareCurrent = document.getElementById("self-care-current-period");
const selfCarePrevious = document.getElementById("self-care-previous-period");

const dailySelection = document.getElementById("daily-selection");
const weeklySelection = document.getElementById("weekly-selection");
const monthlySelection = document.getElementById("monthly-selection");
const dataFileName = "data.json";
let timeData;

fetch(dataFileName)
  .then((response) => {
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    return response.json();
  })
  .then((data) => {
    timeData = data;
    setTimeframe(weeklySelection, WEEKLY_TIMEFRAME);
  })
  .catch((error) => {
    console.error("There was a problem with the fetch operation:", error);
  });

dailySelection.addEventListener("click", (e) => {
  e.preventDefault();
  setTimeframe(e.target, DAILY_TIMEFRAME);
});
weeklySelection.addEventListener("click", (e) => {
  e.preventDefault();
  setTimeframe(e.target, WEEKLY_TIMEFRAME);
});
monthlySelection.addEventListener("click", (e) => {
  e.preventDefault();
  setTimeframe(e.target, MONTHLY_TIMEFRAME);
});

function setTimeframe(element, timeframe) {
  dailySelection.classList.add("inactive");
  weeklySelection.classList.add("inactive");
  monthlySelection.classList.add("inactive");
  element.classList.remove("inactive");
  updateTimeframe(timeframe);
}

function updateTimeframe(timeframe) {
  const workTime = getSectionData(timeData, WORK_TITLE, timeframe);
  workCurrent.textContent = getCurrentTime(workTime);
  workPrevious.textContent = getPreviousTime(workTime, timeframe);

  const playTime = getSectionData(timeData, PLAY_TITLE, timeframe);
  playCurrent.textContent = getCurrentTime(playTime);
  playPrevious.textContent = getPreviousTime(playTime, timeframe);

  const studyTime = getSectionData(timeData, STUDY_TITLE, timeframe);
  studyCurrent.textContent = getCurrentTime(studyTime);
  studyPrevious.textContent = getPreviousTime(studyTime, timeframe);

  const exerciseTime = getSectionData(timeData, EXERCISE_TITLE, timeframe);
  exerciseCurrent.textContent = getCurrentTime(exerciseTime);
  exercisePrevious.textContent = getPreviousTime(exerciseTime, timeframe);

  const socialTime = getSectionData(timeData, SOCIAL_TITLE, timeframe);
  socialCurrent.textContent = getCurrentTime(socialTime);
  socialPrevious.textContent = getPreviousTime(socialTime, timeframe);

  const selfCareTime = getSectionData(timeData, SELF_CARE_TITLE, timeframe);
  selfCareCurrent.textContent = getCurrentTime(selfCareTime);
  selfCarePrevious.textContent = getPreviousTime(selfCareTime, timeframe);
}
function getCurrentTime(workTime) {
  return workTime["current"] + "Hrs";
}

function getPreviousTime(workTime, timeframe) {
  let prefix;
  if (timeframe === DAILY_TIMEFRAME) {
    prefix = "Yesterday - ";
  } else if (timeframe === WEEKLY_TIMEFRAME) {
    prefix = "Last Week - ";
  } else {
    prefix = "Last Month - ";
  }
  return prefix + workTime["previous"] + "Hrs";
}

function getSectionData(data, section, timeFrame) {
  let sectionData = data.find((item) => item.title === section);
  return sectionData.timeframes[timeFrame];
}
