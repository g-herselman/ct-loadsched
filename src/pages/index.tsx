import { addDays, getDate } from "date-fns"
import React, { useState } from "react"
import {
  getTimesForAreaAtStage,
  TimesForAreaAtStage,
} from "../lib/getTimesForAreaAtStage"
import { timeSlotDetails } from "../data/fullSchedule"

const buildFriendlyStringsBasedOnTimeslots = timeslotsInDay =>
  timeslotsInDay.reduce((acc, curr, ind, arr) => {
    const next = arr[ind + 1]
    const prev = arr[ind + -1]
    const hasNext = typeof next !== "undefined"
    const hasPrev = typeof prev !== "undefined"
    const nextFollows = hasNext && +next === +curr + 1
    const followsPrev = hasPrev && +prev === +curr - 1

    const { start, end } = timeSlotDetails[+curr]

    const currentString = acc.length === 0 ? "" : acc[acc.length - 1]

    if (!followsPrev && !nextFollows) return [...acc, `${start} to ${end}`]
    if (!followsPrev && nextFollows) return [...acc, `${start} to `]
    if (followsPrev && !nextFollows)
      return [...acc.slice(0, -1), `${currentString}${end}`]

    return acc
  }, [])

const buildFullMonthDayStrings = (daysOfMonth: TimesForAreaAtStage) => {
  return Object.keys(daysOfMonth).reduce<{ [day: number]: string[] }>(
    (acc, curr) => {
      const timeslotsInDay = daysOfMonth[curr]

      if (timeslotsInDay.length === 0) return acc

      return {
        ...acc,
        [curr]: buildFriendlyStringsBasedOnTimeslots(timeslotsInDay),
      }
    },
    {}
  )
}

const naturalNumbers = number => Array.from(Array(number + 1).keys()).slice(1)

const fromStorageOrDefault = (key, def) =>
  (typeof localStorage !== "undefined" && localStorage.getItem(key)) || def

const IndexPage = () => {
  const [stage, setStage] = useState(+fromStorageOrDefault("stage", 1))
  const [area, setArea] = useState(+fromStorageOrDefault("area", 1))

  const handleStageSet = e => {
    const value = +e.target.value
    setStage(value)
    localStorage.setItem("stage", `${value}`)
  }

  const handleAreaSet = e => {
    const value = +e.target.value
    setArea(value)
    localStorage.setItem("area", `${value}`)
  }

  const currentTime = new Date()
  const today = getDate(currentTime)
  const tommorow = getDate(addDays(currentTime, 1))

  const allTimeSlots = getTimesForAreaAtStage(area, stage)

  const todayTimeslots = allTimeSlots[today]
  const tommorowTimeslots = allTimeSlots[tommorow]

  const todayStrings = buildFriendlyStringsBasedOnTimeslots(todayTimeslots)
  const tommorowStrings = buildFriendlyStringsBasedOnTimeslots(
    tommorowTimeslots
  )

  const fullMonth = buildFullMonthDayStrings(allTimeSlots)
  return (
    <>
      <select onChange={handleStageSet} defaultValue={stage}>
        {naturalNumbers(8).map(number => (
          <option key={number} value={`${number}`}>
            Stage {number}
          </option>
        ))}
      </select>

      <select onChange={handleAreaSet} defaultValue={area}>
        {naturalNumbers(16).map(number => (
          <option key={number} value={`${number}`}>
            Area {number}
          </option>
        ))}
      </select>

      <h2>Today</h2>
      {todayStrings.length > 0 ? (
        <ul>
          {todayStrings.map(item => (
            <li>{item}</li>
          ))}
        </ul>
      ) : (
        <p>None</p>
      )}

      <h2>Tommorow</h2>
      {tommorowStrings.length > 0 ? (
        <ul>
          {tommorowStrings.map(item => (
            <li>{item}</li>
          ))}
        </ul>
      ) : (
        <p>None</p>
      )}

      <h2>Full Month</h2>
      <table>
        {Object.keys(fullMonth).map(day => (
          <tr>
            <td>{day}</td>
            <td>
              <ul>
                {fullMonth[day].map(item => (
                  <li>{item}</li>
                ))}
              </ul>
            </td>
          </tr>
        ))}
      </table>
    </>
  )
}

export default IndexPage
