import React from "react"
import {
  getTimesForAreaAtStage,
  TimesForAreaAtStage,
} from "../lib/getTimesForAreaAtStage"
import { timeSlotDetails } from "../data/fullSchedule"

const buildDayStrings = (daysOfMonth: TimesForAreaAtStage): string[] => {
  return Object.keys(daysOfMonth).reduce<string[]>((acc, curr) => {
    const timeslotsInDay = daysOfMonth[curr]

    if (timeslotsInDay.length === 0) return acc

    const timeslotString = timeslotsInDay.reduce((acc, curr, ind, arr) => {
      const next = arr[ind + 1]
      const prev = arr[ind + -1]
      const hasNext = typeof next !== "undefined"
      const hasPrev = typeof prev !== "undefined"
      const nextFollows = hasNext && +next === +curr + 1
      const followsPrev = hasPrev && +prev === +prev + 1

      const { start, end } = timeSlotDetails[+curr]

      if (!followsPrev && !nextFollows && hasNext)
        return `${acc}${start} to ${end}, `
      if (!followsPrev && !nextFollows) return `${acc}${start} to ${end}.`

      if (!followsPrev && nextFollows) return `${acc}${start} to `
      if (followsPrev && !nextFollows && hasNext) return `${acc}${end}, `
      if (followsPrev && !nextFollows) return `${acc}${end}.`

      return acc
    }, "")

    return [...acc, `Day ${curr}: ${timeslotString}`]
  }, [])
}
const IndexPage = () => {
  console.log(buildDayStrings(getTimesForAreaAtStage(1, 1)))
  return <></>
}

export default IndexPage
