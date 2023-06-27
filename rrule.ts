import {  datetime, Frequency, RRule, rrulestr } from 'rrule';
import { DateTime } from 'luxon';


export const enum FrequencyValue {
  'Daily' = Frequency.DAILY,
  'Weekly' = Frequency.WEEKLY,
  'Monthly' = Frequency.MONTHLY,
  'Annual' = Frequency.YEARLY,
}

interface rRuleOptions {
  freq: number,
  startDate: Date,
  endDate?: Date,
  occurance?: number,
  weekDays?: boolean,
  timeZone?: string,
}

const scheduleWithRRule = ({freq, startDate, endDate, occurance, weekDays, timeZone}: rRuleOptions ) => {
  const byWeekDay = weekDays ? [RRule.MO, RRule.TU, RRule.WE, RRule.TH, RRule.FR] : null;
  if(freq === 3 && !endDate && !occurance) {
    occurance = 1
  }
  return (
    new RRule(
      {
        freq: freq,
        count: !occurance ? null : occurance,
        dtstart: startDate,
        byweekday: byWeekDay,
        until: !endDate ? null : endDate,
      }
    ).toString()
  )
}


const mapFrequencyValue = (freq: string | null) => {
  switch(freq){
    case 'Weekly':
      return FrequencyValue.Weekly;
    case 'Monthly':
      return FrequencyValue.Monthly;
    case 'Quarterly':
      return FrequencyValue.Monthly;
    case 'Annual':
      return FrequencyValue.Annual;
    default:
      return FrequencyValue.Daily;
  }
};
console.log( scheduleWithRRule({freq: mapFrequencyValue('Daily') ,startDate: new Date(), endDate: new Date('2025-06-24')}))


const rRuleString = "DTSTART:20230524T000000Z\nRRULE:FREQ=DAILY;UNTIL=20230531T000000"
const rrule = rrulestr(rRuleString);
const startDate = rrule.options.dtstart;
console.log(startDate, new Date());





