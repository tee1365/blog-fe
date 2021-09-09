import dayjs from 'dayjs';
import dayOfYear from 'dayjs/plugin/dayOfYear';

export const isSameDay = (): boolean => {
  dayjs.extend(dayOfYear);
  const day = window.localStorage.getItem('imageDay');
  const today = dayjs().dayOfYear().toString();
  return day === today;
};
