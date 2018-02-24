import React, { Component } from "react";

import Table, {
  TableBody,
  TableCell,
  TableHead,
  TableRow
} from "material-ui/Table";
import Input from "material-ui/Input";
import { Delete } from "material-ui-icons";

import { FormControl } from "material-ui/Form";

const ExerciseTable = ({
  exercises,
  deleteExercise,
  isEditable,
  updateEditState
}) => (
  <Table>
    <TableHead>
      <TableRow>
        {isEditable && (
          <TableCell style={{ padding: 0, paddingLeft: 24 }}>
            <Delete />
          </TableCell>
        )}
        <TableCell>Name</TableCell>
        <TableCell>Reps</TableCell>
        <TableCell>Weight (kg)</TableCell>
      </TableRow>
    </TableHead>
    {isEditable ? (
      <ExerciseRowsEditable
        updateEditState={updateEditState}
        exercises={exercises}
        deleteExercise={deleteExercise}
      />
    ) : (
      <ExerciseRows exercises={exercises} />
    )}
  </Table>
);

const ExerciseRows = ({ exercises }) => (
  <TableBody>
    {exercises.map((exercise, index) => (
      <TableRow key={index}>
        <TableCell>{exercise.name}</TableCell>
        <TableCell>{exercise.reps}</TableCell>
        <TableCell>{exercise.weight}</TableCell>
      </TableRow>
    ))}
  </TableBody>
);

const ExerciseRowsEditable = ({
  exercises,
  updateEditState,
  deleteExercise
}) => (
  <TableBody>
    {exercises.map((exercise, index) => (
      <EditableRow
        key={index}
        updateEditState={updateEditState}
        exercise={exercise}
        deleteExercise={deleteExercise}
      />
    ))}
  </TableBody>
);

class EditableRow extends Component {
  state = {
    name: "",
    reps: "",
    weight: "",
    timestamp: null
  };

  handleChange = name => event => {
    this.setState(
      {
        [name]: event.target.value
      },
      () => {
        const { name, reps, weight, timestamp } = this.state;
        this.props.updateEditState({
          name,
          reps,
          weight,
          timestamp
        });
      }
    );
  };

  componentWillMount() {
    const { name, reps, weight, timestamp } = this.props.exercise;
    this.setState({
      name,
      reps,
      weight,
      timestamp
    });
  }

  render() {
    const { name, reps, weight } = this.state;
    const { deleteExercise, exercise } = this.props;
    return (
      <TableRow>
        <TableCell style={{ padding: 0, paddingLeft: 24 }}>
          <Delete
            onClick={() => {
              if (
                window.confirm("Are you sure you want to delete this exercise?")
              ) {
                deleteExercise(exercise);
              }
            }}
          />
        </TableCell>
        <TableCell>
          <FormControl>
            <Input
              onChange={this.handleChange("name")}
              type="text"
              value={name}
            />
          </FormControl>
        </TableCell>
        <TableCell>
          <FormControl>
            <Input
              onChange={this.handleChange("reps")}
              type="number"
              value={reps}
            />
          </FormControl>
        </TableCell>
        <TableCell>
          <FormControl>
            <Input
              onChange={this.handleChange("weight")}
              type="number"
              step="0.5"
              value={weight}
            />
          </FormControl>
        </TableCell>
      </TableRow>
    );
  }
}

export default ExerciseTable;
