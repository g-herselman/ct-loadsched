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

export const monthAtStageEight: MonthAtStage = {
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
  17: buildDay([1, 9, 13, 5, 2, 10, 14, 6]),
  18: buildDay([1, 9, 13, 5, 2, 10, 14, 6]),
  19: buildDay([1, 9, 13, 5, 2, 10, 14, 6]),
  20: buildDay([1, 9, 13, 5, 2, 10, 14, 6]),
  21: buildDay([2, 10, 14, 6, 3, 11, 15, 7]),
  22: buildDay([2, 10, 14, 6, 3, 11, 15, 7]),
  23: buildDay([2, 10, 14, 6, 3, 11, 15, 7]),
  24: buildDay([2, 10, 14, 6, 3, 11, 15, 7]),
  25: buildDay([3, 11, 15, 7, 4, 12, 16, 8]),
  26: buildDay([3, 11, 15, 7, 4, 12, 16, 8]),
  27: buildDay([3, 11, 15, 7, 4, 12, 16, 8]),
  28: buildDay([3, 11, 15, 7, 4, 12, 16, 8]),
  29: buildDay([4, 12, 16, 8, 1, 9, 13, 5]),
  30: buildDay([4, 12, 16, 8, 1, 9, 13, 5]),
  31: buildDay([4, 12, 16, 8, 1, 9, 13, 5]),
}
