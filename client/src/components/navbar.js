import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import { Link } from 'react-router-dom';
import { withRouter } from "react-router";


const styles = {
  root: {
    flexGrow: 1,
  },
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
};

function ButtonAppBar(props) {
  const { classes } = props;

  function logoutCheck() {
    if (window.confirm("Logout of this account?")) {
        props.loginController.logout(() => {
        props.history.push("/");
      })
    }
  }

  const user = props.loginController.user;

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <IconButton className={classes.menuButton} color="inherit" aria-label="Menu">
            <MenuIcon />
          </IconButton>
          {user && <Button color="inherit"><Link to="/UserHomePage">User Home Page</Link></Button>}
          {user && <Button color="inherit"><Link to="/Results">Results</Link></Button>}
          {!user && <Button color="inherit"><Link to="/RegistrationPage">Register</Link></Button>}
          {user && <a href="#" className="navlink" onClick={logoutCheck}>Logout</a>}
        </Toolbar>  
      </AppBar>
    </div>
  );
}

ButtonAppBar.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withRouter(withStyles(styles)(ButtonAppBar));


{/* <Typography variant="h6" color="inherit" className={classes.grow} >
            News
    </Typography> */}