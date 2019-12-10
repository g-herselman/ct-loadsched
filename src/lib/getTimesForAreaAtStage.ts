import { TimeSlots, getMonthAtStage } from "../data/fullSchedule"

export type TimesForAreaAtStage = { [day: number]: TimeSlots[] }

export const getTimesForAreaAtStage = (
  area: number,
  stage: number
): TimesForAreaAtStage => {
  const daysAtSelectedStage = getMonthAtStage(stage)
  const result = Object.keys(daysAtSelectedStage).reduce(
    (fullResult, dayNumber) => {
      const times = daysAtSelectedStage[dayNumber]
      const timesMatching = Object.keys(times).filter(timeslot =>
        times[timeslot].includes(area)
      )
      return { ...fullResult, [dayNumber]: timesMatching }
    },
    {}
  )

  return result
}
