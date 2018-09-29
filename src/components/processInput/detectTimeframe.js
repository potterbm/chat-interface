import stemToNumber    from '../../lib/stemToNumber';
import unitOfTimeStems from '../../constants/unitOfTimeStems';

function findUnitOfTime(stems) {
  for (let n = stems.length; n >= 0; n--) {
    if (unitOfTimeStems[stems[n]] !== undefined) return n;
  }

  return -1;
}

function getDurationFromStems(stems, timeframe) {
  timeframe.duration = 0;
  timeframe.durationStems = [];

  // Time ago
  if (stems[timeframe.unitOfTimeIndex + 1] === 'go') {
    // keep duration inferred as 1 day, transition the duration code to change the start time
  }

  let n;
  for (n = timeframe.unitOfTimeIndex - 1; n >= 0; n--) {
    if (stemToNumber(stems[n]) === undefined) break;

    timeframe.duration += stemToNumber(stems[n]);
    timeframe.durationStems.push(stems[n]);
  }

  if (stems[n] === 'last') {
    // set start to now - (duration * unitOfTime)
  }

  timeframe.durationStartIndex = n + 1;
}

export default (classifiedInput) => {
  const unitOfTimeIndex = findUnitOfTime(classifiedInput.ownerStems);
  const unitOfTime = classifiedInput.ownerStems[unitOfTimeIndex];

  const timeframe = {
    unitOfTime,
    unitOfTimeIndex,
  };

  timeframe.duration = 1;
  if (unitOfTimeIndex > 0) {
    getDurationFromStems(classifiedInput.ownerStems, timeframe);
  }

  return timeframe;
};
