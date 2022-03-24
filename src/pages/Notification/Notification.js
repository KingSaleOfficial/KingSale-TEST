import React, { useContext, useEffect } from 'react';
import {
  Grid,
  Box,
  Container,
  Typography,
  makeStyles,
} from '@material-ui/core';
import NotificationCard from '../../components/NotificationCard';
import { UserContext } from 'src/context/User';
import axios from 'axios';
import apiConfig from 'src/config/apiConfig';

const useStyles = makeStyles((theme) => ({
  FAQ: {
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(6),
  },
  PageHeading: {
    fontSize: '45px',
    fontWeight: 'bold',
    lineHeight: '55px',
    color: '#FABE25',
    textAlign: 'left',
  },
}));

export default function FAQ() {
  const classes = useStyles();
  const user = useContext(UserContext);

  const readNotificationHandler = async () => {
    try {
      await axios.get(apiConfig.readNotification, {
        headers: {
          token: sessionStorage.getItem('token'),
        },
      });
    } catch (error) {}
  };

  useEffect(() => {
    readNotificationHandler();
  }, []);
  return (
    <>
      <Box className={classes.FAQ}>
        {/* featured */}
        <Box mt={5} mb={2}>
          <Container maxWidth='lg' align='left'>
            <Typography variant='h2' className={classes.PageHeading}>
              Notification{' '}
            </Typography>

            <Box mt={5}>
              <Grid container spacing={2}>
                {user.notificationList.map((data, i) => {
                  return (
                    <Grid item xs={12} sm={12} md={12} key={i}>
                      <NotificationCard data={data} index={i} />
                    </Grid>
                  );
                })}
              </Grid>
            </Box>
          </Container>
        </Box>
      </Box>
    </>
  );
}
