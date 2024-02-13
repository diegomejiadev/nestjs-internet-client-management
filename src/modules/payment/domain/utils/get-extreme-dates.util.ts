export const getExtremeDatesUtil = (
  body: { startDate: Date; endDate: Date }[],
) => {
  const minDate = body.reduce((acc, cur) => {
    return acc.startDate.getTime() < cur.startDate.getTime() ? acc : cur;
  });

  const maxDate = body.reduce((acc, cur) => {
    return acc.endDate.getTime() > cur.endDate.getTime() ? acc : cur;
  });

  return {
    minDate: minDate.startDate,
    maxDate: maxDate.endDate,
  };
};
