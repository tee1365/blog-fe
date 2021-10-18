import dayjs from 'dayjs';
import dayOfYear from 'dayjs/plugin/dayOfYear';

// this function tests whether today's date is equal to the date in the localstorage.

export const isSameDay = (): boolean => {
  dayjs.extend(dayOfYear);
  const day = window.localStorage.getItem('imageDay');
  const today = dayjs().dayOfYear().toString();
  return day === today;
};
