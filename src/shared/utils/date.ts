import dayjs, { Dayjs } from 'dayjs';
import advancedFormat from 'dayjs/plugin/advancedFormat';
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore';

dayjs.extend(advancedFormat);
dayjs.extend(isSameOrBefore);

export const isAfter = (firstDate: string | Dayjs | number | Date, secondDate: string | Dayjs | number | Date) => {
  return dayjs(dayjs(firstDate)).isAfter(dayjs(secondDate));
};

export const formatDate = (date: string | Dayjs | number | Date, format = 'll', utc = false) => {
  if (utc) {
    return dayjs(dayjs(date).toISOString()).format(format);
  }

  return dayjs(date).format(format);
};

export const isBefore = (firstDate: string | Dayjs | number | Date, secondDate: string | Dayjs | number | Date) => {
  return dayjs(dayjs(firstDate)).isSameOrBefore(dayjs(secondDate));
};

export const addDate = (date: string | Dayjs | number, amount: number, unit: dayjs.ManipulateType, utc = false) => {
  if (utc) {
    return dayjs(date).add(amount, unit).toISOString();
  }

  return dayjs(date).add(amount, unit).toLocaleString();
};

export const dateUtils = dayjs;
