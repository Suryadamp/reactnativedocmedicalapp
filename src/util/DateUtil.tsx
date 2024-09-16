import moment from 'moment';

export function convertDateToString(date: string | number | Date): string {
  if (date instanceof Date) {
    const dateString = date.toISOString().split('T')[0]; // Extract date portion
    return dateString;
  } else {
    const convertedDate = new Date(date);
    const dateString = convertedDate.toISOString().split('T')[0]; // Extract date portion
    return dateString;
  }
}

// Format Date example: Nov 12, 10:00 AM
export const shortDateFormat = (dateString: string | number | Date) => {
  const options: any = {
    month: 'short', // Short month name (e.g., "Nov")
    day: 'numeric', // Day of the month (e.g., "12")
    hour: '2-digit', // 2-digit hour (e.g., "10")
    minute: '2-digit', // 2-digit minute (e.g., "00")
    hour12: true, // Use 12-hour clock format (e.g., "AM" or "PM")
  };

  const date = new Date(dateString);
  return date.toLocaleString('en-US', options);
};

export function convertMomentToDate(momentId: moment.Moment): string {
  const date = moment(momentId, 'YYYYMMDD').toDate();
  const formattedDate = moment(date).format('YYYY-MM-DD');
  return formattedDate;
}

export function convertTimeIdToActualTime(timeId: string | number | Date): string {
  const selectedTime = new Date(timeId);
  const hours = selectedTime.getHours();
  const minutes = selectedTime.getMinutes();
  const formattedHours = hours % 12 || 12; // Convert to 12-hour format
  const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
  const amPm = hours >= 12 ? 'PM' : 'AM'; // Determine AM/PM
  return `${formattedHours}:${formattedMinutes} ${amPm}`;
}

export function getCurrentDate(): string {
  const currentDate = new Date();
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth() + 1; // Months are zero-based
  const day = currentDate.getDate();
  return year + '-' + month + '-' + day;
}

export function getCurrentDateSlash(): string {
  const currentDate = new Date();
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth() + 1; // Months are zero-based
  const day = currentDate.getDate();
  return day + '/' + month + '/' + year;
}

export function getNotificationTime(time: any, date: any): string {
  // Input date and time strings
  const inputDateStr = date;
  const inputTimeStr = time;

  // Split the date components
  const [day, month, year] = inputDateStr.split('/');

  // Create a Date object with the specified date components and time
  const inputDate = new Date(`${year}-${month}-${day} ${inputTimeStr}`);

  // Format the date in the desired format
  const formattedDate = inputDate.toISOString().slice(0, 19).replace('T', ' ');
  return formattedDate;
}

export const getTextForDurationList = (reminder: any) => {
  if (reminder?.duration_type === 'everyday') {
    const everydayValue = reminder?.duration?.duration_count + ' ' + reminder?.duration?.interval;
    return everydayValue ? everydayValue : '';
  } else if (reminder?.duration_type === 'specific_days') {
    const specificdayValue =
      ' | ' +
      reminder?.duration?.specific_days?.join(',') +
      ' | ' +
      reminder?.duration?.duration_count +
      ' ' +
      reminder?.duration?.interval;
    return specificdayValue ? specificdayValue : '';
  } else if (reminder?.duration_type === 'interval_days') {
    const intervalDays =
      'Every ' +
      ' ' +
      reminder?.duration?.interval_days +
      ' days' +
      ' | ' +
      reminder?.duration?.duration_count +
      ' ' +
      reminder?.duration?.interval;
    return intervalDays ? intervalDays : '';
  } else if (reminder?.duration_type === 'custom_date') {
    const customDate = reminder?.duration?.custom_date;
    return customDate ? customDate : '';
  } else if (reminder?.duration_type === 'forever') {
    return 'Mon, Tue';
  } else {
    return 'Mon, Tue | 10:00 AM, 12:00 AM, 01:00 PM';
  }
};

export function getDayOfMonth(dateString: string): string {
  const dateObject = new Date(dateString);
  const dayOfMonth = dateObject.getDate();
  return '' + dayOfMonth;
}

export function getMonth(dateString: string): string {
  const dateObject = new Date(dateString);
  const monthInLetters = dateObject.toLocaleDateString('en-US', { month: 'short' }).toUpperCase();
  return monthInLetters;
}

export function getFormattedDate(dateString: string): string {
  const dateObject = new Date(dateString);
  // Format the date as "DD MMM YYYY"
  const formattedDate = dateObject.toLocaleDateString('en-GB', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  });
  return formattedDate;
}

export function getCurrentYear(): string {
  const currentYear = new Date().getFullYear();
  return '' + currentYear;
}

export function getBeforeMonthOf1stDate(beforeMonths: number): string {
  const currentDate = new Date();
  // Calculate the first date of the last 6 months
  const lastSixMonths = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth() - (beforeMonths - 1), // Months are zero-based, so subtract 5 instead of 6
    1, // Set the day to 1 to get the first day of the month
  );
  // Create a new Date object with the input string
  const inputDate = new Date(lastSixMonths);

  // Extract year, month, and day components from the Date object
  const year = inputDate.getUTCFullYear();
  const month = `0${inputDate.getUTCMonth() + 1}`.slice(-2); // Adding 1 because months are zero-based
  const day = `0${inputDate.getUTCDate()}`.slice(-2);

  // Format the result string as "yyyy-dd-mm"
  const formattedDateString = `${year}-${month}-${day}`;

  console.log('First date of the last months:', formattedDateString);
  return '' + formattedDateString;
}

export function getFormattedTime(time: string) {
  return moment(time, ['HH:mm']).format('hh:mm A');
}

export function formatDateBType(date: Date | string, type: string) {
  const formateDate = moment(date, 'YYYYMMDD').toDate();
  const formattedDate = moment(formateDate).format(type);
  return formattedDate;
}
