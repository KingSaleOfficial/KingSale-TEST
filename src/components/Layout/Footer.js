import React from 'react';
import { Grid, Box, Link, makeStyles, Typography } from '@material-ui/core';
import { Link as RouterLink } from 'react-router-dom';
import moment from 'moment';
const useStyles = makeStyles((theme) => ({
  footerSection: {
    position: 'relative',
    paddingTop: '57px',
    '& h5': {
      fontSize: '20px',
      color: '#42E8E0',
    },
    '& p': {
      fontSize: '12px',
      color: '#fff',
      margin: '0',
      padding: '13px 0 10px',
    },
    '& ul': {
      paddingLeft: '0',
      listStyle: 'none',
      margin: '0',
    },
    '& .footer_text': {
      display: 'flex',
      justifyContent: 'flex-end',
      flexWrap: 'wrap',
      [theme.breakpoints.down('xs')]: {
        justifyContent: 'flex-start',
      },
      '& li': {
        marginLeft: '15px',
      },
      '& a': {
        color: '#FFFFFF',
        textDecoration: 'underline',
        fontSize: '16px',
        fontWeight: '400',
        lineHeight: '33px',
        [theme.breakpoints.down('xs')]: {
          fontSize: '13px',
        },
        '&:hover': {
          color: '#F6A52D',
        },
      },
    },
  },
}));

export default function Liquidity() {
  const classes = useStyles();
  return (
    <Box className={classes.footerSection}>
      <Grid
        container
        spacing={2}
        alignItems='center'
        style={{ borderBottom: '1px solid #656262' }}
      >
        <Grid item xs={12} sm={3} md={3}>
          <img
            alt=''
            src='images/fav_1.png'
            width='60px'
            style={{ marginBottom: '5px' }}
          />
        </Grid>

        <Grid item xs={12} sm={9} md={9} align='right'>
          <Box>
            <ul class='footer_text'>
              <li>
                <Link component={RouterLink} to='/app/terms'>
                  Terms and conditions
                </Link>
              </li>
              <li>
                <Link component={RouterLink} to='/app/privacy'>
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link component={RouterLink} to='/app/documentation'>
                  Documentation
                </Link>
              </li>
              <li>
                <Link component={RouterLink} to='/app/audits'>
                  {' '}
                  Audits
                </Link>
              </li>
            </ul>
          </Box>
        </Grid>
        <Grid item xs={12} sm={12} md={12} align='center'>
          <Typography>
            The information provided shall not in any way constitute a
            recommendation as to whether you should invest in any product
            discussed. KingSale accepts no liability for any loss occasioned to
            any person acting or refraining from action as a result of any
            material provided or published on our website.
          </Typography>
        </Grid>
      </Grid>
      <p align='center'>
        KingSale © {moment().format('YYYY')} • support@kingsale • All rights
        reserved.
      </p>
    </Box>
  );
}
