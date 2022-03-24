import React from "react";
import {
  Box,
  Container,
  Typography,
  makeStyles,
  Grid,
  withStyles
} from "@material-ui/core";
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
const useStyles = makeStyles((theme) => ({
  walletdiv: {
    borderRadius: "10px",
    overflow: "hidden",
    position: "relative",
    background: "linear-gradient( 152.97deg, rgba(255, 255, 255, 0.08) 0%, rgba(232, 66, 76, 0.062) 100%)",
    transition: "0.5s",
    backdropFilter: "blur(42px)",
    padding: "20px 15px",
    '& svg': {
      position: "absolute",
      right: "24px",
      fontSize: "80px",
      top: "9px",
      color: "#3c076a40",
      transform: "rotate(-20deg)",
    },
    '& h6': {
      color: "#FABE25",
    },
    
      "& h1": {
        fontSize: "50px",
        fontWeight: "600",
        lineHeight: "67px",
        letterSpacing: "3px",
        display: "inline-block",
        color: "#fff",
        [theme.breakpoints.down("lg")]: {
            fontSize: "46px",
        },
        [theme.breakpoints.down("xs")]: {
            fontSize: "30px",
            lineHeight: "40px",
        },
    },

    "&:hover": {
      '& .wallet_box': {
        opacity: "1",
        top: "30%",
        right: "-60px",
      },
      '& .wallet_box:first-child': {
        opacity: "1",
        top: "30%",
        right: "-60px",
      },
    },
  },
  box: {
    height: "150px",
    width: "150px",
    borderRadius: "50%",
    background: "#f6a52d4d",
    position: "absolute",
    top: "100%",
    right: "-150px",
    transition: "0.5s all",
  },

  textbox: {
    "& h1": {
        fontSize: "45px",
        fontWeight: "bold",
        lineHeight: "76px",
        color: "#FABE25",
        [theme.breakpoints.down("xs")]: {
          fontSize: "30px",
        },
    },
    "& p": {
        fontSize: "18px",
        color: "#fff",
    },
},


tableBox: {
  padding: "50px 0 30px",
}
}));
const StyledTableCell = withStyles((theme) => ({
  head: {
    fontSize:"16px",
    fontWeight:"bold",
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 15,
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    '&:nth-of-type(odd)': {
      backgroundColor: "rgb(25 22 32)",
    },
  },
}))(TableRow);
function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

function Wallet(props) {
  const classes = useStyles();
  const rows = [
    createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
  createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
  createData('Eclair', 262, 16.0, 24, 6.0),
  createData('Cupcake', 305, 3.7, 67, 4.3),
  createData('Gingerbread', 356, 16.0, 49, 3.9),
  ];
  return (
      <Box mt={5}>
                                    <Box className={classes.textbox}>
                                        <Typography variant="h1" align="center">Personal Stats</Typography>
                                    </Box>
                       
          <Box mt={5}>
            <Grid container spacing={3} alignItems="center">
              <Grid item xs={12} sm={6} md={4}>
                <Box className={classes.walletdiv}>
                  <Typography variant="h6">Amount Staked</Typography>
                  <Typography variant="h1">0.0</Typography>
                  {/* <GiWallet /> */}
                  <Box className={`${classes.box} wallet_box`}></Box>
                </Box>
              </Grid>
              <Grid item xs={12} sm={6} md={4}>
                <Box className={classes.walletdiv}>
                  <Typography variant="h6">Reward Accumulated</Typography>
                  <Typography variant="h1">0.0</Typography>
                  {/* <GiWallet /> */}
                  <Box className={`${classes.box} wallet_box`}></Box>
                </Box>
              </Grid>
              <Grid item xs={12} sm={6} md={4}>
              </Grid>

            </Grid>
          </Box>

          <Box className={classes.tableBox}>
          <Box className={classes.textbox}>
            <Typography variant="h1" align="center">Leaders Boards</Typography>
        </Box>
          <Grid container spacing={3} alignItems="center">
              <Grid item xs={12} sm={12}>
              <Box className={classes.walletdiv1} mt={2}> 
              <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Dessert (100g serving)</StyledTableCell>
            <StyledTableCell align="right">Calories</StyledTableCell>
            <StyledTableCell align="right">Fat&nbsp;(g)</StyledTableCell>
            <StyledTableCell align="right">Carbs&nbsp;(g)</StyledTableCell>
            <StyledTableCell align="right">Protein&nbsp;(g)</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <StyledTableRow key={row.name}>
              <StyledTableCell component="th" scope="row">
                {row.name}
              </StyledTableCell>
              <StyledTableCell align="right">{row.calories}</StyledTableCell>
              <StyledTableCell align="right">{row.fat}</StyledTableCell>
              <StyledTableCell align="right">{row.carbs}</StyledTableCell>
              <StyledTableCell align="right">{row.protein}</StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
                  </Box>
                </Grid>
              </Grid>
          </Box>
  </Box>



 
  );
}

export default Wallet;
