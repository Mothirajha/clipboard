import { DateTime, Zone } from 'luxon';

function parseDateTime(
  date: string | number | Date | DateTime,
  timeZone?: string | Zone
): DateTime {
  // if (!date) {
  //   return null;
  // }

  let ret;

  if (typeof date === 'string') {
    ret = DateTime.fromISO(date);
  } else if (typeof date === 'number') {
    ret = DateTime.fromMillis(date);
  } else if (DateTime.isDateTime(date)) {
    ret = date;
  } else if (date.constructor === Date) {
    ret = DateTime.fromJSDate(date);
  } else if (date instanceof Date) {
    ret = DateTime.fromJSDate(date);
  } else {
    ret = DateTime.fromJSDate(date);
  }

  // if (!ret) {
  //   return null;
  // }

  if (timeZone) {
    ret = ret.setZone(timeZone);
  }

  return ret;
}

function copyTimeToDate(
  fromDate: Date | DateTime,
  toDate: Date | DateTime,
  timeZone?: string
): Date {
  const _fromDate = parseDateTime(fromDate, timeZone);
  const _toDate = parseDateTime(toDate, timeZone)!;
  console.log(_toDate);

  if (_fromDate) {
    console.log(_toDate
      .set({
        hour: _fromDate.hour,
        minute: _fromDate.minute,
        second: _fromDate.second,
      })
      .setZone(timeZone)
      .toJSDate(), 'return from');
    return _toDate
      .set({
        hour: _fromDate.hour,
        minute: _fromDate.minute,
        second: _fromDate.second,
      })
      .toJSDate();
  }
  console.log(_toDate?.toJSDate(), 'return value');
  return _toDate?.toJSDate() as Date;
}

// let dateTime = parseDateTime(new Date('2023-05-31'), 'America/New_York');
let timezone = 'America/New_York';
console.log(new Date());
let date = DateTime.fromJSDate(new Date(), {zone: timezone});
console.log(date.toISOTime());
console.log(date.toFormat('yyyy/MM/dd'));
console.log(date.toJSDate());
console.log(new Date(date.toFormat('yyyy/MM/dd')));
// console.log(dateTime);
// console.log(copyTimeToDate(dateTime, dateTime, timezone));
