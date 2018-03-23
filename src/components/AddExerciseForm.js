import React, { Component } from "react";

import Button from "material-ui/Button";
import Dialog, {
  DialogActions,
  DialogContent,
  DialogTitle,
  withMobileDialog
} from "material-ui/Dialog";
import { withStyles } from "material-ui/styles";
import Input, { InputLabel } from "material-ui/Input";
import { FormControl } from "material-ui/Form";

const styles = theme => ({
  form: {
    display: "flex",
    flexDirection: "column"
  },
  formControl: {
    margin: theme.spacing.unit,
    minWidth: 240
  }
});
class AddExerciseForm extends Component {
  state = {
    name: "",
    sets: 0,
    reps: 0,
    weight: 0
  };

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value
    });
  };

  submitForm = () => {
    const { name, sets, reps, weight } = this.state;

    const exercise = {
      name,
      sets,
      reps,
      weight
    };

    this.props.addExercise(exercise);
  };

  render() {
    const { open, classes, toggleAddForm, fullScreen } = this.props;
    return (
      <Dialog
        disableBackdropClick
        disableEscapeKeyDown
        open={open}
        fullScreen={fullScreen}
      >
        <DialogTitle>Fill the form</DialogTitle>
        <DialogContent>
          <form className={classes.form}>
            <FormControl className={classes.formControl}>
              <InputLabel htmlFor="name">Name</InputLabel>
              <Input
                value={this.state.name}
                onChange={this.handleChange("name")}
                id="name"
              />
            </FormControl>
            <FormControl className={classes.formControl}>
              <InputLabel htmlFor="sets">Sets</InputLabel>
              <Input
                value={this.state.sets}
                onChange={this.handleChange("sets")}
                id="sets"
                name="sets"
                type="number"
              />
            </FormControl>
            <FormControl className={classes.formControl}>
              <InputLabel htmlFor="reps">Reps</InputLabel>
              <Input
                value={this.state.reps}
                onChange={this.handleChange("reps")}
                id="reps"
                name="reps"
                type="number"
              />
            </FormControl>
            <FormControl className={classes.formControl}>
              <InputLabel htmlFor="weight">Weight</InputLabel>
              <Input
                value={this.state.weight}
                onChange={this.handleChange("weight")}
                id="weight"
                name="weight"
                type="number"
                step="0.5"
              />
            </FormControl>
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={toggleAddForm} color="primary">
            Cancel
          </Button>
          <Button onClick={this.submitForm} color="primary">
            Ok
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
}
export default withStyles(styles)(withMobileDialog()(AddExerciseForm));
