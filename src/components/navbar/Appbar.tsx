import React, { useContext, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Switch from '@material-ui/core/Switch';
import { ThemeContext } from 'src/lib/provider/ThemeProvider';

const useStyles = makeStyles({
  appbar : {
    boxShadow : 'none'
  },
  title : {
    flexGrow : 1
  },
  spacer : {
    flexGrow : 1
  }
});

function Appbar() {
  const classes = useStyles();
  const { theme, setTheme } = useContext(ThemeContext);

  const handleChange = () => {
    const changeTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(changeTheme);
  };

  return (
    <AppBar className={classes.appbar} position="sticky">
      <Toolbar>
        <Typography variant="h6" className={classes.title}>
            Map Marker
        </Typography>
        <div className={classes.spacer}/>
        <Switch
          name="theme"
          value={theme}
          checked={theme === 'dark'}
          onChange={handleChange}
          inputProps={{ 'aria-label' : 'checkbox' }}
        />
      </Toolbar>
    </AppBar>
  );
}

export default React.memo(Appbar);
