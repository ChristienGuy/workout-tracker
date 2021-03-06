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

const styles = {
  smallTableCell: {
    padding: 0,
    paddingLeft: 12
  }
};
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
        <TableCell style={{ ...styles.smallTableCell }}>Sets</TableCell>
        <TableCell style={styles.smallTableCell}>Reps</TableCell>
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
        <TableCell style={{ ...styles.smallTableCell }}>
          {exercise.sets}
        </TableCell>
        <TableCell style={styles.smallTableCell}>{exercise.reps}</TableCell>
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
    reps: 0,
    sets: 0,
    weight: 0,
    timestamp: null
  };

  handleChange = name => event => {
    this.setState(
      {
        [name]: event.target.value
      },
      () => {
        const { name, sets, reps, weight, timestamp } = this.state;
        this.props.updateEditState({
          name,
          sets,
          reps,
          weight,
          timestamp
        });
      }
    );
  };

  componentWillMount() {
    const { name, sets, reps, weight, timestamp } = this.props.exercise;
    this.setState({
      name,
      sets: sets || 0,
      reps,
      weight,
      timestamp
    });
  }

  render() {
    const { name, sets, reps, weight } = this.state;
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
        <TableCell style={{ padding: 0, paddingLeft: 24 }}>
          <FormControl>
            <Input
              onChange={this.handleChange("name")}
              type="text"
              value={name}
            />
          </FormControl>
        </TableCell>
        <TableCell style={{ ...styles.smallTableCell }}>
          <FormControl>
            <Input
              onChange={this.handleChange("sets")}
              type="number"
              value={sets}
            />
          </FormControl>
        </TableCell>
        <TableCell style={styles.smallTableCell}>
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
