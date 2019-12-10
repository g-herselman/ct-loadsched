import { monthAtStageEight } from "../data/fullSchedule"

export const getMonthAtStage = (stage: number) =>
  Object.keys(monthAtStageEight).reduce((acc, dayNumber) => {
    const dayAtStageEight = monthAtStageEight[dayNumber]

    const dayAtStage = Object.keys(dayAtStageEight).reduce(
      (acc, timeName) => ({
        ...acc,
        [timeName]: dayAtStageEight[timeName].slice(0, stage),
      }),
      {}
    )

    return {
      ...acc,
      [dayNumber]: dayAtStage,
    }
  }, {})
