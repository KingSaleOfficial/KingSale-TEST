import React from "react";
import {
  Box,
  Container,
  Grid,
  makeStyles,
  withStyles,
} from "@material-ui/core";
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableRow from '@material-ui/core/TableRow';
const useStyles = makeStyles((theme) => ({
  dialogBox: {
    padding: "30px",
  },
  walletPage: {
    position: "relative",
    zIndex: "9",
    "& h4": {
      fontSize: "50px",
      fontWeight: "600",
      color: "#231F20",
      textShadow: "0px 2px 4px rgba(0, 0, 0, 0.25)",
      marginBottom: "30px",
      [theme.breakpoints.down("lg")]: {
        fontSize: "40px",
      },
      [theme.breakpoints.down("xs")]: {
        fontSize: "30px",
      },
    },
    "& p": {
      fontWeight: "400",
      fontSize: "16px",
      lineHeight: "27px",
      textAlign: "center",
      color: "#231F20",
      width: "100%",
      "& span": {
        color: "#ec0066",
        cursor: "pointer",
      },
    },
  },

  walletdiv: {
    overflow: "hidden",
    position: "relative",
    background: "linear-gradient( 152.97deg, rgba(255, 255, 255, 0.08) 0%, rgba(232, 66, 76, 0.062) 100%)",
    transition: "0.5s",
    backdropFilter: "blur(42px)",
    borderRadius: "10px",
    "& svg": {
      position: "absolute",
      right: "24px",
      fontSize: "80px",
      top: "9px",
      color: "#3c076a40",
      transform: "rotate(-20deg)",
    },
    "& h6": {
      color: "#32076a",
    },
    "&:hover": {
      "& .wallet_box": {
        opacity: "1",
        top: "30%",
        right: "-60px",
      },
      "& .wallet_box:first-child": {
        opacity: "1",
        top: "30%",
        right: "-60px",
      },
    },
  },
  roadBox: {
    position: "relative",
    alignItems: "center",
    "& p": {
      display: "flex",
      marginBottom: "10px",
      "& h4": {
        backgroundColor: "#26373e",
        display: "inline-block",
        padding: "5px 10px",
        color: "#fff",
        fontSize: "16px",
      },
      "& label": {
        margin: "0",
        color: "#fff",
        padding: "5px 15px",
        borderRadius: "0px ",
        fontSize: "16px",
      },
    },
    "& div": {
      width: "100%",
      maxWidth: "250px",
      position: "absolute",
    },
  },

  circleicon: {
    height: "90px",
    maxWidth: "90px",
    width: "100%",
    background: "linear-gradient(243.62deg, #27B5E7 24.24%, #0C3B4B 96.73%)",
    border: "1px solid #FFFFFF",
    borderRadius: "50%",
    margin: "0 auto",
    marginBottom: "12px",
  },

  circleiconimg: {
    padding: "25px",
  },

  videoPage: {
    width: "80%",
    height: "550px",
    "@media (max-width: 767px)": {
      width: "100%",
    },
  },
  tableBox: {
    padding: "20px 20px 50px",
    overflow: "hidden",
    position: "relative",
    background: "linear-gradient( 152.97deg, rgba(255, 255, 255, 0.08) 0%, rgba(232, 66, 76, 0.062) 100%)",
    transition: "0.5s",
    backdropFilter: "blur(42px)",
    borderRadius: "24px",
  },
}));

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.black,
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
function createData(name, calories) {
  return { name, calories };
}
function Roadmap(props) {
  const classes = useStyles();
  const rows = [
     createData('Token Information ',),
    createData('Total Token for Sales', ),
    createData('Start time', 3.7, 67, 4.3),
    createData('End time', 305, 3.7087, 67, 4.3),
    createData('Soft Cap', 356),
    createData('Hard Cap', 356),
    createData('Max. Purchase user', 356),
    createData('Min Purchase', 356),
    createData('Max Purchase', 356),
  ];

  const rows1 = [
    createData('Subscription Info',),
    createData('Ice cream sandwich', 237,),
    createData('Eclair', 262),
    createData('Cupcake', 305),
    createData('Gingerbread', 356),
    createData('Eclair', 262),
    createData('Cupcake', 305),
    createData('Gingerbread', 356),
  ];
  return (
    // <Page title="GainPool">
      <Box pt={5} pb={6}>
          <Box className={classes.walletPage} mb={5}>
            <Box mt={3}>
              <Grid container spacing={3} >
                <Grid item xs={12} sm={6}>
                  <Box className={classes.walletdiv}> 
                  <TableContainer>    
                  <Table className={classes.table} aria-label="customized table">
                  <TableBody>
                    {rows.map((row) => (
                      <StyledTableRow key={row.name}>
                        <StyledTableCell component="th" scope="row">
                          {row.name}
                        </StyledTableCell>
                        <StyledTableCell align="right">{row.calories}</StyledTableCell>
                      </StyledTableRow>
                    ))}
                  </TableBody>
                </Table>
                </TableContainer>
                  </Box>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Box className={classes.walletdiv}>     
                  <Table className={classes.table} aria-label="customized table">
                  <TableBody>
                    {rows1.map((row) => (
                      <StyledTableRow key={row.name}>
                        <StyledTableCell component="th" scope="row">
                          {row.name}
                        </StyledTableCell>
                        <StyledTableCell align="right">{row.calories}</StyledTableCell>
                      </StyledTableRow>
                    ))}
                  </TableBody>
                </Table>

                  </Box>
                </Grid>
 
              </Grid>
            </Box>
          </Box>    
      </Box>
    // </Page>
  );
}

export default Roadmap;
