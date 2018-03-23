export const newExercise = ({name, sets, reps, weight}) => {
  return {
    name,
    sets,
    reps,
    weight,
    timestamp: Date.now()
  }
}