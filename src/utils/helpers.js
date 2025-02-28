import { formatDistance, differenceInDays, parseISO } from 'date-fns';
import { ru } from 'date-fns/locale';

// We want to make this function work for both Date objects and strings (which come from Supabase)
export const subtractDates = (dateStr1, dateStr2) =>
  differenceInDays(parseISO(String(dateStr1)), parseISO(String(dateStr2)));

export const formatDistanceFromNow = (dateStr) => {
  const date = parseISO(dateStr);
  const distanceStr = formatDistance(date, new Date(), {
    addSuffix: true,
    locale: ru,
  });

  return (
    distanceStr

      // Дни (1 день, 2-4 дня, 5+ дней)
      .replace(/\b(\d+)\sдней\b/g, (_, num) => {
        num = Number(num);
        if (num % 10 === 1 && num % 100 !== 11) return `${num} день`;
        if ([2, 3, 4].includes(num % 10) && ![12, 13, 14].includes(num % 100))
          return `${num} дня`;
        return `${num} дней`;
      })

      // Месяцы (1 месяц, 2-4 месяца, 5+ месяцев)
      .replace(/\b(\d+)\sмесяцев\b/g, (_, num) => {
        num = Number(num);
        if (num % 10 === 1 && num % 100 !== 11) return `${num} месяц`;
        if ([2, 3, 4].includes(num % 10) && ![12, 13, 14].includes(num % 100))
          return `${num} месяца`;
        return `${num} месяцев`;
      })
      .replace(/\b(\d+)\sмесяца\b/g, (_, num) => {
        num = Number(num);
        if (num % 10 === 1 && num % 100 !== 11) return `${num} месяц`;
        if ([2, 3, 4].includes(num % 10) && ![12, 13, 14].includes(num % 100))
          return `${num} месяца`;
        return `${num} месяцев`;
      })

      // Годы (1 год, 2-4 года, 5+ лет)
      .replace(/\b(\d+)\sлет\b/g, (_, num) => {
        num = Number(num);
        if (num % 10 === 1 && num % 100 !== 11) return `${num} год`;
        if ([2, 3, 4].includes(num % 10) && ![12, 13, 14].includes(num % 100))
          return `${num} года`;
        return `${num} лет`;
      })
      .replace(/\b(\d+)\sгода\b/g, (_, num) => {
        num = Number(num);
        if (num % 10 === 1 && num % 100 !== 11) return `${num} год`;
        if ([2, 3, 4].includes(num % 10) && ![12, 13, 14].includes(num % 100))
          return `${num} года`;
        return `${num} лет`;
      })

      .replace('назад', 'назад') // Чистим пробелы, если нужно
      .replace(/^через/, 'Через')
      .replace('приблизительно', 'Примерно')
      .replace('около', 'Около')
  );
};

// Supabase needs an ISO date string. However, that string will be different on every render because the MS or SEC have changed, which isn't good. So we use this trick to remove any time
export const getToday = function (options = {}) {
  const today = new Date();

  // This is necessary to compare with created_at from Supabase, because it it not at 0.0.0.0, so we need to set the date to be END of the day when we compare it with earlier dates
  if (options?.end)
    // Set to the last second of the day
    today.setUTCHours(23, 59, 59, 999);
  else today.setUTCHours(0, 0, 0, 0);
  return today.toISOString();
};

export const formatCurrency = (value) =>
  new Intl.NumberFormat('en', { style: 'currency', currency: 'USD' }).format(
    value
  );
