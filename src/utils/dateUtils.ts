export function stringToDate(s: string): Date {
  const dSplit = s.split('-');

  return new Date(Date.UTC(Number(dSplit[0]), Number(dSplit[1]) - 1, Number(dSplit[2])));
}

export function dateToString(d: Date): string {
  const year = '' + d.getUTCFullYear();
  let month = '' + (d.getUTCMonth() + 1);
  let date = '' + d.getUTCDate();

  if (month.length < 2) month = '0' + month;
  if (date.length < 2) date = '0' + date;

  return [year, month, date].join('-');
}

export function addHours(d: Date, hours: number): Date {
  const newDate = new Date(d);
  newDate.setUTCHours(d.getUTCHours() + hours);

  return newDate;
}

export function addMinutes(d: Date, minutes: number): Date {
  const newDate = new Date(d);
  newDate.setMinutes(d.getUTCMinutes() + minutes);
  
  return newDate;
}

export function timezoneString(timezone: number): string {
  const number = Math.abs(timezone) < 10 ? `0${timezone}` : `${timezone}`;

  return timezone < 0 ? `-${number}:00` : `+${number}:00`;
}

export function timeWithTimezone(d: Date, timezone: number): string {
  const newDate = addHours(d, timezone);
  const hours = newDate.getUTCHours();
  const minutes = newDate.getUTCMinutes();

  const hoursString = hours < 10 ? `0${hours}` : `${hours}`;
  const minutesString = minutes < 10 ? `0${minutes}` : `${minutes}`;
  let timezoneString = 'GMT';
  if (timezone < 0) timezoneString += ` -${timezone}`;
  else if (timezone > 0) timezoneString += ` +${timezone}`;

  return `${hoursString}:${minutesString} ${timezoneString}`;
}

export function dateToVerboseString(d: Date, timezone: number = 0): string {
  const dayArr = ['Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab', 'Min'];
  const monthArr = ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun', 'Jul', 'Agu', 'Sep', 'Okt', 'Nov', 'Des']

  const date = addHours(d, timezone);

  return `${dayArr[date.getUTCDay()]}, ${date.getUTCDate()} ${monthArr[date.getUTCMonth()]} ${date.getUTCFullYear()}`;
}

export function durationString(start: Date, end: Date): string {
  const startDate = start.getUTCDate();
  const endDate = end.getUTCDate();

  let hours = end.getUTCHours() - start.getUTCHours();
  if (endDate > startDate) hours += 24;

  let minutes = end.getUTCMinutes() - start.getUTCMinutes();
  if (minutes < 0) {
    hours -= 1;
    minutes = 60 - minutes;
  }

  const hoursString = hours !== 0 ? `${hours} jam` : ``;
  const minutesString = minutes !== 0 ? `${minutes} min` : ``;

  return hours && minutes ? `${hoursString} ${minutesString}` : `${hoursString}${minutesString}`;
}

export function getNextFiveMinutesOnSeconds (): number {
  const currentSeconds = getCurrentSeconds();
  return currentSeconds + 300;
};

export function getCurrentSeconds (): number {
  const now = new Date();
  return Math.floor(now.getTime() / 1000); 
};

export function utcDatetimeToTimezoneDate(d: Date, timezone: number): Date {
  const newDate = addHours(d, timezone);

  newDate.setUTCHours(0);
  newDate.setUTCMinutes(0);
  newDate.setUTCSeconds(0);
  newDate.setUTCMilliseconds(0);

  return newDate;
}