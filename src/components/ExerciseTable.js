import React, { Component } from "react";

import Table, {
  TableBody,
  TableCell,
  TableHead,
  TableRow
} from "material-ui/Table";
import Input from "material-ui/Input";

import { FormControl } from "material-ui/Form";

const ExerciseTable = ({ exercises, isEditable, updateEditState }) => (
  <Table>
    <TableHead>
      <TableRow>
        <TableCell>Name</TableCell>
        <TableCell>Reps</TableCell>
        <TableCell>Weight (kg)</TableCell>
      </TableRow>
    </TableHead>
    {isEditable ? (
      <ExerciseRowsEditable
        updateEditState={updateEditState}
        exercises={exercises}
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

const ExerciseRowsEditable = ({ exercises, updateEditState }) => (
  <TableBody>
    {exercises.map((exercise, index) => (
      <EditableRow
        key={index}
        updateEditState={updateEditState}
        exercise={exercise}
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
    return (
      <TableRow>
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
