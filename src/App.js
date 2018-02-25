import React, { Component } from "react";
import Reboot from "material-ui/Reboot";
import { newExercise } from "./helpers";
import Button from "material-ui/Button";
import { Zoom } from "material-ui";

import ExerciseTable from "./components/ExerciseTable";
import AddExerciseForm from "./components/AddExerciseForm";
import TopBar from "./components/TopBar";
import RestButton from "./components/RestButton";

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

  addExercise = exerciseData => {
    const { exercises } = this.state;
    const exercise = newExercise(exerciseData);

    exercises.push(exercise);

    this.setState({ exercises }, this.updateLocalStorage());
    this.toggleAddForm();
  };

  deleteExercise = exercise => {
    const exercises = this.state.exercises.filter(
      e => e.timestamp !== exercise.timestamp
    );
    this.setState({ exercises });
  };

  updateEditState = exercise => {
    const { exercises } = this.state;
    const exerciseIndex = this.state.exercises
      .map(e => e.timestamp)
      .indexOf(exercise.timestamp);

    exercises[exerciseIndex] = {
      name: exercise.name,
      reps: exercise.reps,
      weight: exercise.weight,
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
            deleteExercise={this.deleteExercise}
          />
        )}
        <div
          style={{
            display: "flex",
            width: "100%",
            justifyContent: "flex-end",
            marginTop: 20,
            paddingLeft: 20,
            paddingRight: 20
          }}
        >
        <RestButton />
        </div>
        <div
          style={{
            position: "absolute",
            bottom: 20,
            right: 0,
            display: "flex",
            justifyContent: "flex-end",
            width: "100%",
            marginTop: 20,
            paddingLeft: 20,
            paddingRight: 20
          }}
        >
          {exercises.length > 0 && (
            <Button color="primary" onClick={this.toggleEditingExercises}>
              Edit
            </Button>
          )}
          <AddButton
            raised={exercises.length > 0}
            onClick={this.toggleAddForm}
          />

          <Zoom in={editingExercises} unmountOnExit>
            <Button
              color="primary"
              variant="raised"
              onClick={this.toggleEditingExercises}
            >
              Save
            </Button>
          </Zoom>
        </div>
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

export default App;
