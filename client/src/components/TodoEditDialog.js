import React, { Component } from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Button,
  DialogContentText
} from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";

const styles = theme => ({
  root: {
    margin: 0,
    padding: theme.spacing(4)
  },
  content: {
    marginBottom: theme.spacing(1)
  }
});

class TodoEditDialog extends Component {
  state = {
    description: this.props.description
  };

  render() {
    const { classes, open, handleClose, handleEdit } = this.props;
    return (
      <Dialog
        fullWidth={true}
        maxWidth="sm"
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
        className={classes.root}
      >
        <DialogTitle id="form-dialog-title">Edit Todo</DialogTitle>
        <DialogContent className={classes.content}>
          <DialogContentText>Enter new description:</DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Description:"
            type="text"
            fullWidth
            value={this.state.description}
            onChange={e => this.setState({ description: e.target.value })}
          />
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              this.setState({ description: " " });
              handleClose();
            }}
            color="primary"
          >
            Cancel
          </Button>
          <Button
            onClick={() => {
              this.setState({ description: " " });
              handleEdit(this.state.description);
            }}
            color="primary"
          >
            Update
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
}

export default withStyles(styles)(TodoEditDialog);
