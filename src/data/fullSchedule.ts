import { number } from "prop-types"

const cycleNext = (array: number[], add: number, max: number) =>
  array.map(number => ((number + (add - 1)) % max) + 1)

export enum TimeSlots {
  "0000_0230",
  "0200_0430",
  "0400_0630",
  "0600_0830",
  "0800_1030",
  "1000_1230",
  "1200_1430",
  "1400_1630",
  "1600_1830",
  "1800_2030",
  "2000_2230",
  "2200_0030",
}

type TimeSlotDetails = {
  [key: number]: { start: string; end: string }
}

export const timeSlotDetails: TimeSlotDetails = {
  [TimeSlots["0000_0230"]]: {
    start: "00:00",
    end: "02:30",
  },
  [TimeSlots["0200_0430"]]: {
    start: "02:00",
    end: "04:30",
  },
  [TimeSlots["0400_0630"]]: {
    start: "04:00",
    end: "06:30",
  },
  [TimeSlots["0600_0830"]]: {
    start: "06:00",
    end: "08:30",
  },
  [TimeSlots["0800_1030"]]: {
    start: "08:00",
    end: "10:30",
  },
  [TimeSlots["1000_1230"]]: {
    start: "10:00",
    end: "12:30",
  },
  [TimeSlots["1200_1430"]]: {
    start: "12:00",
    end: "14:30",
  },
  [TimeSlots["1400_1630"]]: {
    start: "14:00",
    end: "16:30",
  },
  [TimeSlots["1600_1830"]]: {
    start: "16:00",
    end: "18:30",
  },
  [TimeSlots["1800_2030"]]: {
    start: "18:00",
    end: "20:30",
  },
  [TimeSlots["2000_2230"]]: {
    start: "20:00",
    end: "22:30",
  },
  [TimeSlots["2200_0030"]]: {
    start: "22:00",
    end: "00:30",
  },
}

type DayAtStage = {
  [timeSlot in TimeSlots]: number[]
}

type MonthAtStage = {
  [day: number]: {
    [timeSlot in TimeSlots]: number[]
  }
}

const buildDay = (startArray: number[]) =>
  Object.keys(timeSlotDetails).reduce<DayAtStage>(
    (acc, curr, index) => ({
      ...acc,
      [curr]: cycleNext(startArray, index, 16),
    }),
    {
      [TimeSlots["0000_0230"]]: [],
      [TimeSlots["0200_0430"]]: [],
      [TimeSlots["0400_0630"]]: [],
      [TimeSlots["0600_0830"]]: [],
      [TimeSlots["0800_1030"]]: [],
      [TimeSlots["1000_1230"]]: [],
      [TimeSlots["1200_1430"]]: [],
      [TimeSlots["1400_1630"]]: [],
      [TimeSlots["1600_1830"]]: [],
      [TimeSlots["1800_2030"]]: [],
      [TimeSlots["2000_2230"]]: [],
      [TimeSlots["2200_0030"]]: [],
    }
  )
const fillRestOfMonth = (stageData: MonthAtStage) =>
  Object.keys(stageData).reduce(
    (acc, curr) =>
      +curr !== 16
        ? {
            ...acc,
            [+curr]: stageData[curr],
            [+curr + 16]: stageData[curr],
          }
        : {
            ...acc,
            [+curr]: stageData[curr],
          },
    {}
  )

const stage1 = {
  1: buildDay([1]),
  2: buildDay([13]),
  3: buildDay([9]),
  4: buildDay([5]),
  5: buildDay([2]),
  6: buildDay([14]),
  7: buildDay([10]),
  8: buildDay([6]),
  9: buildDay([3]),
  10: buildDay([15]),
  11: buildDay([11]),
  12: buildDay([7]),
  13: buildDay([4]),
  14: buildDay([16]),
  15: buildDay([12]),
  16: buildDay([8]),
}

const stage2 = {
  1: buildDay([1, 9]),
  2: buildDay([13, 5]),
  3: buildDay([1, 9]),
  4: buildDay([13, 5]),
  5: buildDay([2, 10]),
  6: buildDay([14, 6]),
  7: buildDay([2, 10]),
  8: buildDay([14, 6]),
  9: buildDay([3, 11]),
  10: buildDay([15, 7]),
  11: buildDay([3, 11]),
  12: buildDay([15, 7]),
  13: buildDay([4, 12]),
  14: buildDay([16, 8]),
  15: buildDay([4, 12]),
  16: buildDay([16, 8]),
}

const stage3 = {
  1: buildDay([1, 9, 13]),
  2: buildDay([13, 5, 9]),
  3: buildDay([1, 9, 5]),
  4: buildDay([13, 5, 1]),
  5: buildDay([2, 10, 14]),
  6: buildDay([14, 6, 10]),
  7: buildDay([2, 10, 6]),
  8: buildDay([14, 6, 2]),
  9: buildDay([3, 11, 15]),
  10: buildDay([15, 7, 11]),
  11: buildDay([3, 11, 7]),
  12: buildDay([15, 7, 3]),
  13: buildDay([4, 12, 16]),
  14: buildDay([16, 8, 12]),
  15: buildDay([4, 12, 8]),
  16: buildDay([16, 8, 4]),
}

const stage4 = {
  1: buildDay([1, 9, 13, 5]),
  2: buildDay([1, 9, 13, 5]),
  3: buildDay([1, 9, 13, 5]),
  4: buildDay([1, 9, 13, 5]),
  5: buildDay([2, 10, 14, 6]),
  6: buildDay([2, 10, 14, 6]),
  7: buildDay([2, 10, 14, 6]),
  8: buildDay([2, 10, 14, 6]),
  9: buildDay([3, 11, 15, 7]),
  10: buildDay([3, 11, 15, 7]),
  11: buildDay([3, 11, 15, 7]),
  12: buildDay([3, 11, 15, 7]),
  13: buildDay([4, 12, 16, 8]),
  14: buildDay([4, 12, 16, 8]),
  15: buildDay([4, 12, 16, 8]),
  16: buildDay([4, 12, 16, 8]),
}

const stage5 = {
  1: buildDay([1, 9, 13, 5, 2]),
  2: buildDay([1, 9, 13, 5, 14]),
  3: buildDay([1, 9, 13, 5, 10]),
  4: buildDay([1, 9, 13, 5, 6]),
  5: buildDay([2, 10, 14, 6, 3]),
  6: buildDay([2, 10, 14, 6, 15]),
  7: buildDay([2, 10, 14, 6, 11]),
  8: buildDay([2, 10, 14, 6, 7]),
  9: buildDay([3, 11, 15, 7, 4]),
  10: buildDay([3, 11, 15, 7, 16]),
  11: buildDay([3, 11, 15, 7, 12]),
  12: buildDay([3, 11, 15, 7, 8]),
  13: buildDay([4, 12, 16, 8, 1]),
  14: buildDay([4, 12, 16, 8, 13]),
  15: buildDay([4, 12, 16, 8, 9]),
  16: buildDay([4, 12, 16, 8, 5]),
}

const stage6 = {
  1: buildDay([1, 9, 13, 5, 2, 10]),
  2: buildDay([1, 9, 13, 5, 14, 6]),
  3: buildDay([1, 9, 13, 5, 2, 10]),
  4: buildDay([1, 9, 13, 5, 14, 6]),
  5: buildDay([2, 10, 14, 6, 3, 11]),
  6: buildDay([2, 10, 14, 6, 15, 7]),
  7: buildDay([2, 10, 14, 6, 3, 11]),
  8: buildDay([2, 10, 14, 6, 15, 7]),
  9: buildDay([3, 11, 15, 7, 4, 12]),
  10: buildDay([3, 11, 15, 7, 16, 8]),
  11: buildDay([3, 11, 15, 7, 4, 12]),
  12: buildDay([3, 11, 15, 7, 16, 8]),
  13: buildDay([4, 12, 16, 8, 1, 9]),
  14: buildDay([4, 12, 16, 8, 13, 5]),
  15: buildDay([4, 12, 16, 8, 1, 9]),
  16: buildDay([4, 12, 16, 8, 13, 5]),
}

const stage7 = {
  1: buildDay([1, 9, 13, 5, 2, 10, 14]),
  2: buildDay([1, 9, 13, 5, 14, 6, 10]),
  3: buildDay([1, 9, 13, 5, 10, 2, 6]),
  4: buildDay([1, 9, 13, 5, 6, 14, 2]),
  5: buildDay([2, 10, 14, 6, 3, 11, 15]),
  6: buildDay([2, 10, 14, 6, 15, 7, 11]),
  7: buildDay([2, 10, 14, 6, 11, 3, 7]),
  8: buildDay([2, 10, 14, 6, 7, 15, 3]),
  9: buildDay([3, 11, 15, 7, 4, 12, 16]),
  10: buildDay([3, 11, 15, 7, 16, 8, 12]),
  11: buildDay([3, 11, 15, 7, 12, 4, 8]),
  12: buildDay([3, 11, 15, 7, 8, 16, 4]),
  13: buildDay([4, 12, 16, 8, 1, 9, 13]),
  14: buildDay([4, 12, 16, 8, 13, 5, 9]),
  15: buildDay([4, 12, 16, 8, 9, 1, 5]),
  16: buildDay([4, 12, 16, 8, 5, 13, 1]),
}

const stage8 = {
  1: buildDay([1, 9, 13, 5, 2, 10, 14, 6]),
  2: buildDay([1, 9, 13, 5, 2, 10, 14, 6]),
  3: buildDay([1, 9, 13, 5, 2, 10, 14, 6]),
  4: buildDay([1, 9, 13, 5, 2, 10, 14, 6]),
  5: buildDay([2, 10, 14, 6, 3, 11, 15, 7]),
  6: buildDay([2, 10, 14, 6, 3, 11, 15, 7]),
  7: buildDay([2, 10, 14, 6, 3, 11, 15, 7]),
  8: buildDay([2, 10, 14, 6, 3, 11, 15, 7]),
  9: buildDay([3, 11, 15, 7, 4, 12, 16, 8]),
  10: buildDay([3, 11, 15, 7, 4, 12, 16, 8]),
  11: buildDay([3, 11, 15, 7, 4, 12, 16, 8]),
  12: buildDay([3, 11, 15, 7, 4, 12, 16, 8]),
  13: buildDay([4, 12, 16, 8, 1, 9, 13, 5]),
  14: buildDay([4, 12, 16, 8, 1, 9, 13, 5]),
  15: buildDay([4, 12, 16, 8, 1, 9, 13, 5]),
  16: buildDay([4, 12, 16, 8, 1, 9, 13, 5]),
}

export const schedule = {
  1: fillRestOfMonth(stage1),
  2: fillRestOfMonth(stage2),
  3: fillRestOfMonth(stage3),
  4: fillRestOfMonth(stage4),
  5: fillRestOfMonth(stage5),
  6: fillRestOfMonth(stage6),
  7: fillRestOfMonth(stage7),
  8: fillRestOfMonth(stage8),
}

export const getMonthAtStage = (stage: number) => {
  return schedule[stage] || schedule[8]
}
