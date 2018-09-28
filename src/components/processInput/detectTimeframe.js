import stemToNumber    from '../../lib/stemToNumber';
import unitOfTimeStems from '../../constants/unitOfTimeStems';

function findUnitOfTime(stems) {
  for (let n = stems.length; n >= 0; n--) {
    if (unitOfTimeStems[stems[n]] !== undefined) return n;
  }

  return -1;
}

function getDurationBeforeIndex(stems, index) {
  let sum = 0;

  for (let n = index - 1; n >= 0; n--) {
    if (stemToNumber(stems[n]) !== undefined) sum += stemToNumber(stems[n]);
    else break;
  }

  return sum;
}

export default (classifiedInput) => {
  const unitOfTimeIndex = findUnitOfTime(classifiedInput.ownerStems);
  const unitOfTime = classifiedInput.ownerStems[unitOfTimeIndex];

  let duration = 1;
  if (unitOfTimeIndex > 0) {
    duration = getDurationBeforeIndex(classifiedInput.ownerStems, unitOfTimeIndex);
  }

  return { duration, unitOfTime };
};
