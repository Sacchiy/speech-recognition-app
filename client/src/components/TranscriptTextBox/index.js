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
    width: 200,
  },
});



class TranscriptTextBox extends React.Component {
  state = {
    multiline: this.props.transcript
  };

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value,
    });
  };

//   displayTranscriptText = (transcript) => {
//       this.setState({
//           multiline: 
//       })
//   }
  

  render() {
    const { classes } = this.props;

    return (
      <form className={classes.container} noValidate autoComplete="off">
        

        <TextField
          id="outlined-multiline-flexible"
          label="Transcript"
          multiline
          rowsMax="4"
          value={this.state.multiline}
          onChange={this.handleChange('multiline')}
          className={classes.textField}
          margin="normal"
        //   helperText="hellDDDDDo"
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