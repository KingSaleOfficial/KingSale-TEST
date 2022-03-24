import React, { useContext } from 'react';
import {
  Box,
  Container,
  makeStyles,
  Typography,
  Grid,
} from '@material-ui/core';
import KingstakeCard from '../../components/KingstakeCard';
import { FinishedStakeCard } from '../../pages/staking/FinishedStake';
import { UserContext } from 'src/context/User';
import NoDataFound from 'src/components/NoDataFound/NoDataFound';
const useStyles = makeStyles((theme) => ({
  bannerBox: {
    position: 'relative',
    padding: ' 50px 0px',
    zIndex: ' 1',
  },
  textbox: {
    '& h1': {
      fontSize: '40px',
      fontWeight: 'bold',
      lineHeight: '45px',
      color: '#FABE25',
    },
    '& p': {
      fontSize: '18px',
      color: '#fff',
    },
  },
}));

export default function Dashboard(props) {
  var classes = useStyles();
  const user = useContext(UserContext);
  return (
    <>
      <Box className={classes.bannerBox}>
        <Container maxWidth='md' align='center'>
          <Box className={classes.textbox}>
            <Typography variant='h1'>KINGSTAKE Pools</Typography>
            <Typography variant='body2'>
              Trending KINGSTAKE Deployed staking contracts
            </Typography>
          </Box>
        </Container>
        <Box mt={5}>
          {user.liveStakingPools.length === 0 && (
            <Box textAlign='center' mt={5}>
              <NoDataFound />{' '}
            </Box>
          )}
          <Grid container spacing={5} justifyContent='center'>
            {user.liveStakingPools.map((data, i) => {
              return (
                <Grid
                  item
                  xs={12}
                  sm={6}
                  md={6}
                  lg={3}
                  key={i}
                  className='walletSet'
                >
                  <FinishedStakeCard
                    isFinishHidden={true}
                    data={data}
                    type='card'
                    index={i}
                  />
                </Grid>
              );
            })}
          </Grid>
        </Box>
      </Box>
    </>
  );
}
