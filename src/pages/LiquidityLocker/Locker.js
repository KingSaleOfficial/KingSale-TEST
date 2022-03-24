import React from "react";
import {
  Grid,
  Box,
  Container,
  Typography,
  makeStyles,
} from "@material-ui/core";
import Index from "./Tab/Index";

const useStyles = makeStyles((theme) => ({
  textbox: {
    "& h2": {
      fontSize: "45px",
      fontWeight: "bold",
      lineHeight: "55px",
      color: "#FABE25",
      [theme.breakpoints.down("xs")]: {
        fontSize: "30px",
      },
    },
  },
}));

export default function BestSeller() {
  const classes = useStyles();

  return (
    <Box className={classes.bannerBox}>
      <Container maxWidth='lg' align='center'>
        <Box className={classes.textbox} mt={5} mb={5}>
          <Typography variant='h2'>Liquidity Locker</Typography>
        </Box>
      </Container>
      <Box mt={5}>
        <Container maxWidth='md'>
          <Box mt={5} className={classes.amount}>
            <Grid container spacing={3} align='center'>
              <Grid item xs={12} sm={12} align='center'>
                <Index />
              </Grid>
            </Grid>
          </Box>
        </Container>
      </Box>
    </Box>
  );
}
