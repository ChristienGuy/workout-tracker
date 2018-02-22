import React, { Component } from "react";
import Reboot from "material-ui/Reboot";

import Button from "material-ui/Button";
import { Edit } from "material-ui-icons";

import { withStyles } from "material-ui/styles";

import ExerciseTable from "./components/ExerciseTable";
import AddExerciseForm from "./components/AddExerciseForm";
import TopBar from "./components/TopBar";

class App extends Component {
  state = {
    exercises: [],
    originalExercises: [],
    addFormVisible: false,
    editingExercises: false
  };

  componentWillMount() {
    const exercises = JSON.parse(localStorage.getItem("exercises")) || [];
    this.setState({ exercises });
  }

  updateLocalStorage = () => {
    window.localStorage.setItem(
      "exercises",
      JSON.stringify(this.state.exercises)
    );
  };

  addExercise = exercise => {
    const { exercises } = this.state;

    exercises.push({
      name: exercise.name,
      reps: exercise.reps,
      weight: exercise.weight,
      timestamp: Date.now()
    });

    this.setState({ exercises }, this.updateLocalStorage());
    this.toggleAddForm();
  };

  updateEditState = exercise => {
    const { exercises } = this.state;
    const exerciseIndex = this.state.exercises
      .map(e => e.timestamp)
      .indexOf(exercise.timestamp);

    exercises[exerciseIndex] = {
      name: exercise.name,
      reps: exercise.reps,
      weight: exercise.reps,
      timestamp: exercise.timestamp
    };

    this.setState({ exercises }, this.updateLocalStorage());
  };

  toggleAddForm = () => {
    this.setState({ addFormVisible: !this.state.addFormVisible });
  };

  toggleEditingExercises = () => {
    this.setState({
      editingExercises: !this.state.editingExercises,
      originalExercises: this.state.exercises
    });
  };

  render() {
    const { addFormVisible, editingExercises, exercises } = this.state;
    return (
      <div style={{ paddingTop: 70 }}>
        <Reboot />
        <TopBar />
        <AddExerciseForm
          toggleAddForm={this.toggleAddForm}
          open={addFormVisible}
          addExercise={this.addExercise}
        />
        {exercises.length > 0 && (
          <ExerciseTable
            updateEditState={this.updateEditState}
            isEditable={editingExercises}
            exercises={exercises}
          />
        )}
        {exercises.length > 0 && (
          <EditFab toggleEditingExercises={this.toggleEditingExercises} />
        )}
        <AddButton raised={exercises.length > 0} onClick={this.toggleAddForm} />
      </div>
    );
  }
}

const AddButton = ({ raised, onClick }) => (
  <Button
    variant={raised ? "flat" : "raised"}
    onClick={onClick}
    color="primary"
  >
    Add
  </Button>
);
const styles = theme => ({
  fab: {
    position: "absolute",
    bottom: theme.spacing.unit * 2,
    right: theme.spacing.unit * 2
  }
});

const EditFab = withStyles(styles)(({ classes, toggleEditingExercises }) => (
  <Button
    className={classes.fab}
    color="primary"
    variant="fab"
    onClick={toggleEditingExercises}
  >
    <Edit />
  </Button>
));

export default App;
