import { getMonthAtStage } from "./getMonthAtStage"
import { TimeSlots } from "../data/fullSchedule"

export type TimesForAreaAtStage = { [day: number]: TimeSlots[] }

export const getTimesForAreaAtStage = (
  area: number,
  stage: number
): TimesForAreaAtStage => {
  const daysAtSelectedStage = getMonthAtStage(stage)
  const result = Object.keys(daysAtSelectedStage).reduce(
    (fullResult, dayNumber) => {
      const times = daysAtSelectedStage[dayNumber]

      console.log({ dayNumber, times })
      const timesMatching = Object.keys(times).filter(timeslot =>
        times[timeslot].includes(area)
      )
      console.log({ timesMatching })
      return { ...fullResult, [dayNumber]: timesMatching }
    },
    {}
  )

  return result
}
