export function stringToDate(s: string): Date {
  return new Date(s);
}

export function dateToString(d: Date): string {
  const year = '' + d.getFullYear();
  let month = '' + d.getMonth() + 1;
  let date = '' + d.getDate();

  if (month.length < 2) month = '0' + month;
  if (date.length < 2) date = '0' + date;

  return [year, month, date].join('-');
}

export function addHours(d: Date, hours: number): Date {
  const newDate = new Date(d);
  newDate.setHours(d.getHours() + hours);

  return newDate;
}