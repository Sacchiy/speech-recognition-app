import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';

const styles = theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
  },
  dense: {
    marginTop: 16,
  },
  menu: {
    width: 400,
  },
});

class TranscriptTextBox extends React.Component {
  state = {
    multiline: "Transcribing your audio..."
  };

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value,
    });
  };

  render() {
    const { classes } = this.props;

    return (
      <form className={classes.container} noValidate autoComplete="off">
        
        <TextField
          id="outlined-multiline-flexible"
          label="Transcript"
          multiline
          fullWidth
          rowsMax="20"
          value={this.props.transcript}
          onChange={this.handleChange('multiline')}
          className={classes.textField}
          margin="normal"
        //helperText="hellDDDDDo"
          variant="outlined"
        />

      </form>
    );
  }
}

TranscriptTextBox.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(TranscriptTextBox);