/** used to format a date with date-fns for displaying in the UI */
export const dayFormat = 'EEEEEE do';

export const getPrevMonday = (): Date => {
  const prevMonday = new Date();
  prevMonday.setDate(prevMonday.getDate() - (prevMonday.getDay() - 1) % 7 - 7);
  return prevMonday;
}

export const getDayRange = (from?: Date): Array<Date> => {
  if (from === undefined) from = new Date();

  // next monday
  const nextMonday = new Date();
  nextMonday.setDate(nextMonday.getDate() - (nextMonday.getDay() - 1) % 7 + 7);

  const days = [];
  for (var d = from; d < nextMonday; d.setDate(d.getDate() + 1)) {
    days.push(new Date(d));
  }

  return days;
}