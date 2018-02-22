export const newExercise = ({name, reps, weight}) => {
  return {
    name,
    reps,
    weight,
    timestamp: Date.now()
  }
}