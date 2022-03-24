import React from 'react';
import { makeStyles, Typography, Box, Grid } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  textbox: {
    mint: {
      fontSize: '14px ',
      border: '1px solid #E8424C',
      background: '#E8424C',
      fontWeight: 600,
      height: '44px ',
      color: '#FFFFFF',
      minWidth: '150px ',
      borderRadius: '50px',
      boxShadow: 'none ',
      cursor: 'pointer',
      [theme.breakpoints.down('xs')]: {
        height: '45px ',
        minWidth: '120px ',
      },
      '&:hover': {
        borderColor: '#E8424C',
        background: '#E8424C',
      },
    },
    '& h1': {
      fontSize: '25px',
      fontWeight: 'bold',
      lineHeight: '55px',
      color: '#FABE25',
    },
    '& h2': {
      fontSize: '45px',
      fontWeight: 'bold',
      lineHeight: '55px',
      color: '#FABE25',
      [theme.breakpoints.down('xs')]: {
        fontSize: '30px',
      },
    },
    '& h5': {
      fontSize: '30px',
      fontWeight: '500',
      color: '#fff',
      marginBottom: '10px',
      marginTop: '15px',
    },
    '& h6': {
      color: '#9F9F9F',
      marginBottom: '10px',
    },
    '& p': {
      fontSize: '14px',
      color: '#9F9F9F',
      width: '100%',
      // maxWidth: "600px",
    },
    '& label': {
      fontSize: '16px',
      color: '#fff',
      // maxWidth: "600px",
    },
    '& div': {
      '& button': {
        '&:last-child': {
          marginLeft: '20px',
        },
      },
    },
  },
  mainBox: {
    padding: '20px 20px 50px',
    overflow: 'hidden',
    position: 'relative',
    background:  "linear-gradient(180deg, rgb(10 15 30) 0%, rgb(22 19 3) 100%)",
    border:"1px solid #b6852e",
    transition: '0.5s',
    borderRadius: '0 30px 0 0',
    backdropFilter: 'blur(42px)',

    '& h1': {
      fontSize: '25px',
      fontWeight: 'bold',
      lineHeight: '55px',
      color: '#FABE25',
      [theme.breakpoints.down('xs')]: {
        fontSize: '14px',
      },
    },
    '& p': {
      fontSize: '14px',
      color: '#9F9F9F',
      width: '100%',
      // maxWidth: "600px",
    },
    '& small': {
      fontSize: '12px',
      color: '#6c757d!important',
      // maxWidth: "600px",
    },
    '& label': {
      color: '#9F9F9F',
      padding: '0',
      fontSize: '14px',
      lineHeight: '30px',
      transition:
        'opacity 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,color 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms',
    },
  },
  root: {},
}));

function Audits() {
  const classes = useStyles();
  return (
    <Box className={classes.bannerBox}>
      <Box className={classes.textbox} mt={5} mb={5} align='center'>
        <Typography variant='h2'>Audits</Typography>
      </Box>

      <Box className={classes.mainBox} mt={5}>
        <Box mt={5}>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={12}>
              <div className={classes.textbox}>
                <Typography variant='body2' paragraph>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  Ut enim ad minim veniam, quis nostrud exercitation ullamco
                  laboris nisi ut aliquip ex ea commodo consequat. Duis aute
                  irure dolor in reprehenderit in voluptate velit esse cillum
                  dolore eu fugiat nulla pariatur. Excepteur sint occaecat
                  cupidatat non proident, sunt in culpa qui officia deserunt
                  mollit anim id est laborum.
                </Typography>
                <Typography variant='body2' paragraph>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  Ut enim ad minim veniam, quis nostrud exercitation ullamco
                  laboris nisi ut aliquip ex ea commodo consequat. Duis aute
                  irure dolor in reprehenderit in voluptate velit esse cillum
                  dolore eu fugiat nulla pariatur. Excepteur sint occaecat
                  cupidatat non proident, sunt in culpa qui officia deserunt
                  mollit anim id est laborum.
                </Typography>
                <Typography variant='body2' paragraph>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  Ut enim ad minim veniam, quis nostrud exercitation ullamco
                  laboris nisi ut aliquip ex ea commodo consequat. Duis aute
                  irure dolor in reprehenderit in voluptate velit esse cillum
                  dolore eu fugiat nulla pariatur. Excepteur sint occaecat
                  cupidatat non proident, sunt in culpa qui officia deserunt
                  mollit anim id est laborum.
                </Typography>
                <Typography variant='body2' paragraph>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  Ut enim ad minim veniam, quis nostrud exercitation ullamco
                  laboris nisi ut aliquip ex ea commodo consequat. Duis aute
                  irure dolor in reprehenderit in voluptate velit esse cillum
                  dolore eu fugiat nulla pariatur. Excepteur sint occaecat
                  cupidatat non proident, sunt in culpa qui officia deserunt
                  mollit anim id est laborum.
                </Typography>
                <Typography variant='body2' paragraph>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  Ut enim ad minim veniam, quis nostrud exercitation ullamco
                  laboris nisi ut aliquip ex ea commodo consequat. Duis aute
                  irure dolor in reprehenderit in voluptate velit esse cillum
                  dolore eu fugiat nulla pariatur. Excepteur sint occaecat
                  cupidatat non proident, sunt in culpa qui officia deserunt
                  mollit anim id est laborum.
                </Typography>
              </div>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Box>
  );
}

export default Audits;
