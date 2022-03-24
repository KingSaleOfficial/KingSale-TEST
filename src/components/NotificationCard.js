import React from 'react';
import { Typography, Box, makeStyles, Button } from '@material-ui/core';
import moment from 'moment';
import { sortAddress } from 'src/utils';

const useStyles = makeStyles((theme) => ({
  NftImg: {
    borderRadius: 10,
    display: 'block',
    miHeight: '300px',
    position: 'relative',
  },
  bottomblock: {
    display: 'flex',
    justifyContent: 'space-between',
    alignContent: 'center',
  },
  bottomTop: {
    display: 'flex',
    justifyContent: 'space-between',
    alignContent: 'center',
    margin: '10px 0 0',
  },
  playbutton: {
    position: 'absolute',
    bottom: 5,
    right: 10,
  },
  NotificationBox: {
    position: 'relative',
    alignContent: 'center',
    '& div': {
      '& h5': {
        fontSize: '16px',
        lineHeight: '33px',
        color: '#f6a52d',
        fontWeight: 'bold',
      },
      '& p': {
        fontWeight: '500',
        fontSize: '14px',
        lineHeight: '30px',
        color: '#9F9F9F',
      },
      '& small': {
        fontWeight: '500',
        fontSize: '12px',
        lineHeight: '18px',
        color: '#979797',
      },
    },
  },
  Notificationimg: {
    width: '70px',
    marginRight: '30px',
    '@media(maxWidth:767px)': {
      Notificationimg: {
        marginRight: '10px',
      },
    },
    '& img': {
      width: '100%',
    },
  },
  buttonMargin: {
    marginRight: '10px',
  },
  NotifiButton: {
    display: 'flex',
    '@media(maxWidth:767px)': {
      display: 'flex',
    },
  },
}));

export default function UsersCard(props) {
  const { data } = props;
  const classes = useStyles();

  return (
    <>
      {data?.presaleId && (
        <Box className={classes.NotificationBox}>
          {/* <figure className={classes.Notificationimg}>
        <img src={data.img} alt="" />
      </figure> */}
          <Box>
            <Typography variant='h5'> {data?.presaleId?.title}</Typography>
            {data.userId?.walletAddress && (
              <Typography variant='body2' component='p'>
                Created By : {sortAddress(data.userId?.walletAddress)}
              </Typography>
            )}
            {data?.presaleId?.startTime && (
              <Typography variant='body2' component='small'>
                Start Time:{' '}
                {moment(data?.presaleId?.startTime).format(
                  'DD-MM-YYYY HH:mm A'
                )}
              </Typography>
            )}
            &nbsp;&nbsp;
            {data?.presaleId?.startTime && (
              <Typography variant='body2' component='small'>
                End Time:{' '}
                {moment(data?.presaleId?.endTime).format('DD-MM-YYYY HH:mm A')}
              </Typography>
            )}
            {/* <Box mt={2} mb={3} className={classes.NotifiButton}>
          <Button
            variant="contained"
            size="large"
            color="secondary"
            className={classes.buttonMargin}
          >
            ACCEPT
          </Button>
          <Button variant="outlined" color="primary" size="large" >
          REJECT
          </Button>
        </Box> */}
          </Box>
        </Box>
      )}
    </>
  );
}
