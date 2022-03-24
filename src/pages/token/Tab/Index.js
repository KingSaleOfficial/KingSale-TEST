import React, { useState } from 'react';
import { Box, Container, makeStyles, Button, Grid } from '@material-ui/core';
// import Page from "src/components/Page";
import Services from './Services';
import Launchpad from './Launchpad';

const useStyles = makeStyles((theme) => ({
  PageHeading: {
    fontWeight: '500',
    fontSize: '32px',
    lineHeight: '39px',
    color: '#000',
    paddingBottom: '10px',
  },
  walletPage: {
    position: 'relative',
    zIndex: '9',
    '& h4': {
      fontSize: '50px',
      fontWeight: '600',
      color: '#231F20',
      textShadow: '0px 2px 4px rgba(0, 0, 0, 0.25)',
      marginBottom: '30px',
      [theme.breakpoints.down('lg')]: {
        fontSize: '40px',
      },
      [theme.breakpoints.down('xs')]: {
        fontSize: '30px',
      },
    },
    '& p': {
      fontWeight: '400',
      width: '100%',
      maxWidth: '700px',
      margin: '0 auto',
      marginBottom: '20px',
      fontSize: '16px',
      lineHeight: '27px',
      color: '#707070',
    },
  },

  mainBox: {
    overflow: 'hidden',
    position: 'relative',

    '& h1': {
      fontSize: '25px',
      fontWeight: 'bold',
      lineHeight: '55px',
      color: '#FABE25',
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
      transition:
        'opacity 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,color 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms',
    },
  },
}));
function Index(props) {
  const classes = useStyles();
  const [tabview, setTabView] = useState('Services');
  return (
    <Box className={classes.mainBox}>
      <Box className={classes.Padding_Top}>
        <Box className={classes.walletPage} mb={2} align='center'>
          <Box align='center' mt={3} className='tabButtons'>
            <Button
              className={tabview === 'Services' ? 'active' : ' '}
              onClick={() => setTabView('Services')}
            >
              Base BEP 20
            </Button>
            <Button
              className={tabview === 'Launchpad' ? 'active' : ' '}
              onClick={() => setTabView('Launchpad')}
            >
              Reflection
            </Button>
          </Box>
        </Box>

        <Grid item xs={12} md={12} lg={12}>
          <Box className='TabButtonsContant'>
            {tabview === 'Services' ? <Services /> : ''}
            {tabview === 'Launchpad' ? <Launchpad /> : ''}
          </Box>
        </Grid>
      </Box>
    </Box>
  );
}

export default Index;
