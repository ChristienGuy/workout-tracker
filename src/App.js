import React, { Component } from "react";

import Reboot from "material-ui/Reboot";

import Button from "material-ui/Button";
import AppBar from "material-ui/AppBar";
import Toolbar from "material-ui/Toolbar";
import Typography from "material-ui/Typography";
import AddIcon from "material-ui-icons/Add";

import { withStyles } from "material-ui/styles";

import ExerciseTable from "./components/ExerciseTable";
import AddExerciseForm from "./components/AddExerciseForm";

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
    console.log('====================================');
    console.log(this.state.exercises);
    console.log('====================================');
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

    this.setState(
      { exercises },
      localStorage.setItem("exercises", this.updateLocalStorage())
    );
    this.toggleAddForm();
  };

  updateEditState = exercise => {
    const { exercises } = this.state;
    const exerciseIndex = this.state.exercises.map(e => e.timestamp).indexOf(exercise.timestamp);

    exercises[exerciseIndex] = {
      name: exercise.name,
      reps: exercise.reps,
      weight: exercise.reps,
      timestamp: exercise.timestamp
    }

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
        <ExerciseTable
          updateEditState={this.updateEditState}
          isEditable={editingExercises}
          exercises={exercises}
        />
        <Button onClick={this.toggleEditingExercises} color="primary">
          {editingExercises ? "Save" : "Edit"}
        </Button>
        <Fab toggleAddForm={this.toggleAddForm} />
      </div>
    );
  }
}

const TopBar = () => (
  <AppBar>
    <Toolbar>
      <Typography variant="title" color="inherit">
        Exercises
      </Typography>
    </Toolbar>
  </AppBar>
);

const styles = theme => ({
  fab: {
    position: "absolute",
    bottom: theme.spacing.unit * 2,
    right: theme.spacing.unit * 2
  }
});

const Fab = withStyles(styles)(({ classes, toggleAddForm }) => (
  <Button
    className={classes.fab}
    color="primary"
    variant="fab"
    onClick={toggleAddForm}
  >
    <AddIcon />
  </Button>
));

export default App;
