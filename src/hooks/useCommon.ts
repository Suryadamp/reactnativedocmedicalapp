import moment from 'moment';

export const dateFormatter = (time: string | Date): string => {
  const date = moment(time, 'YYYY/MM/DD hh:mm:ss'); // Parse input time
  const today = moment();
  const yesterday = moment().subtract(1, 'days').startOf('day');

  if (date?.isSame(today, 'day')) {
    return date.fromNow();
  } else if (date?.isSame(yesterday, 'day')) {
    return 'yesterday';
  } else {
    return date?.format('DD-MM-YYYY, hh:mm:ss A');
  }
};
