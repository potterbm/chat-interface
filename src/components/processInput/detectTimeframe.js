import moment          from 'moment';
import stemToNumber    from '../../lib/stemToNumber';
import unitOfTimeStems from '../../constants/unitOfTimeStems';

function findUnitOfTime(stems) {
  for (let n = stems.length; n >= 0; n--) {
    if (unitOfTimeStems[stems[n]] !== undefined) return n;
  }

  return -1;
}

function getDurationFromStems(timeframe) {
  let duration = 0;
  let n = timeframe.raw.unitOfTimeIndex - 1;

  for (n; n >= 0; n--) {
    if (stemToNumber(timeframe.raw.stems[n]) === undefined) break;

    duration += stemToNumber(timeframe.raw.stems[n]);
    timeframe.raw.durationStems.push(timeframe.raw.stems[n]);
  }

  timeframe.raw.durationStartIndex = n + 1;

  // Time ago
  // Keep duration inferred as 1, duration number changes the start time
  if (timeframe.raw.stems[timeframe.raw.unitOfTimeIndex + 1] === 'go') {
    timeframe.raw.durationStartIndex = n;
    timeframe.raw.durationStems.push(timeframe.raw.stems[n]);

    timeframe.duration = 1;
    timeframe.start = moment.utc()
      .startOf(timeframe.unitOfTime)
      .subtract(duration, timeframe.unitOfTime)
      .toISOString();
    return;
  }

  // For the last...
  // Set start to now - (duration * unitOfTime)
  if (timeframe.raw.stems[n] === 'last') {
    timeframe.raw.durationStartIndex = n;
    timeframe.raw.durationStems.push(timeframe.raw.stems[n]);

    timeframe.duration = duration;
    timeframe.start = moment.utc()
      .startOf(timeframe.unitOfTime)
      .subtract(duration, timeframe.unitOfTime)
      .toISOString();
    return;
  }

  // Time in the future
  // Set start to now
  if (timeframe.raw.stems[n] === 'in') {
    timeframe.raw.durationStartIndex = n;
    timeframe.raw.durationStems.push(timeframe.raw.stems[n]);

    timeframe.duration = duration;
    timeframe.start = moment.utc().startOf(timeframe.unitOfTime);
    // return; // linter doesn't like unecessary returns
  }
}

/*
Returns a timeframe object
{
  unitOfTime : second/minute/hour/day/week/month/year
  duration   : integer - timeframe lasts for <duration> * <unitOfTime>
  start      : ISO datetime string
}
*/
export default (classifiedInput) => {
  const timeframe = {
    duration   : 1,
    raw        : {
      durationStems   : [],
      unitOfTimeIndex : null,
      stems           : classifiedInput.ownerStems,
    },
    start      : moment.utc().toISOString(),
    unitOfTime : 'day',
  };

  timeframe.raw.unitOfTimeIndex = findUnitOfTime(classifiedInput.ownerStems);
  timeframe.raw.unitOfTimeStem  = classifiedInput.ownerStems[timeframe.raw.unitOfTimeIndex];
  timeframe.unitOfTime          = unitOfTimeStems[timeframe.raw.unitOfTimeStem];

  if (timeframe.raw.unitOfTimeIndex > 0) getDurationFromStems(timeframe);

  return timeframe;
};
