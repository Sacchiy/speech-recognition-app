import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
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
    width: 700,
  },
});


class OutlinedTextFields extends React.Component {


  handleChange = name => event => {
    this.props.updateResults(event.target.value);
  };
  
  //clear text box 
  componentWillMount(){
    this.props.updateResults("");
  }

  render() {
    const { classes } = this.props;

    return (
      <form className={classes.container} noValidate autoComplete="off">
       
        <TextField
          id="outlined-textarea"
          label="Words to count"
          placeholder="Words to count"
          multiline
          fullWidth
          className={classes.textField}
          margin="normal"
          variant="outlined"
          onChange={this.handleChange('name')}
        />

      </form>
    );
  }
}

OutlinedTextFields.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(OutlinedTextFields);
