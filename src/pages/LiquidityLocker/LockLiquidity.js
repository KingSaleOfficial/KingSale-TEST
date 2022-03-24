import React from "react";
import {
  Box,
  Container,
  Typography,
  makeStyles,
  Button,
} from "@material-ui/core";
import { SiBinance } from "react-icons/si";
import { SiEthereum } from "react-icons/si";
import { Link } from "react-router-dom";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import { FaEthereum } from "react-icons/fa";
import { BiChevronDown } from "react-icons/bi";
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
  mainBox: {
    borderRadius: "10px",
    minHeight: "250px",
    overflow: "hidden",
    position: "relative",
    padding: "25px",
    transition: "0.5s",
    textAlign: "left",
    background:  "linear-gradient(180deg, rgb(10 15 30) 0%, rgb(22 19 3) 100%)",
    border:"1px solid #b6852e",
    borderRadius: "0 30px 0 0",
    backdropFilter: "blur(42px)",
    // "&:hover": {
    //   transform: "translateY(-10px)",
    // },
    "& label": {
      fontSize: "15px",
      lineHeight: "24px",
      color: "#9F9F9F",
    },
    "& button": {
      height: "45px",
      color: "#9F9F9F",
      fontWeight: "600",
      border: "1px solid #8a8b8b",
      fontSize: "18px",
      "&:hover": {
        backgroundColor: "#23252e",
        borderColor: "#23252e",
      },
      "& svg": {
        margin: "0 10px",
      },
    },
  },

  connectCard: {
    display: " flex",
    alignItems: "center",
    backgroundColor: "#23252e",
    borderRadius: "5px",
    padding: "15px",
    marginTop: "7px",
    color: "#fff",
    textDecoration: "none",
    "& img": {
      width: "50px",
      height: "50px",
      borderRadius: "50%",
      marginRight: "15px",
    },
    "& p": {
      fontSize: "14px",
      color: "#b8b8b8",
    },
  },
  connectCard2: {
    display: " flex",
    alignItems: "center",
    backgroundColor: "#23252e",
    borderRadius: "5px",
    padding: "15px",
    marginTop: "7px",
    color: "#abaaaa",
    cursor: "pointer",
    textDecoration: "none",
    "&:hover": {
      backgroundColor: "#36383e",
      "& svg": {
        color: "#FABE25",
      },
      "& h6": {
        color: "#FABE25",
      },
    },
    "& svg": {
      fontSize: "30px",
      marginRight: "20px",
    },
    "& h6": {
      fontSize: "16px",
    },
  },
}));

export default function BestSeller() {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Box className={classes.bannerBox}>
      <Container maxWidth='md' align='center'>
        <Box className={classes.textbox} mt={5} mb={5}>
          <Typography variant='h2'>Liquidity Locker</Typography>
        </Box>
      </Container>
      <Container maxWidth='sm' align='left'>
        <Box className={classes.mainBox}>
          <label>Selected network</label>
          <Button
            // onClick={handleClickOpen}
            fullWidth
          >
            {" "}
            <SiBinance /> Mainnet
            {/* <BiChevronDown /> */}
          </Button>

          <Box mt={3}>
            <label>Lock Liquidity on which exchange?</label>
            <Box
              className={classes.connectCard}
              component={Link}
              to='/app/locker'
            >
              <img src='images/PancakeSwap.png' alt='logo' />
              <Box>
                <Typography variant='h5'>PancakeSwap</Typography>
                <Typography variant='body2'>Mainnet</Typography>
              </Box>
            </Box>
          </Box>
        </Box>
      </Container>

      <div>
        <Dialog
          fullWidth
          maxWidth='sm'
          onClose={handleClose}
          aria-labelledby='customized-dialog-title'
          open={open}
        >
          <DialogTitle
            id='customized-dialog-title'
            onClose={handleClose}
            style={{ color: "#fff" }}
          >
            Switch Network
          </DialogTitle>
          <DialogContent dividers>
            <Box className={classes.connectCard2} onClick={handleClose}>
              <SiEthereum />
              <Box>
                <Typography variant='h6'>Ethereum mainnet</Typography>
              </Box>
            </Box>
            <Box className={classes.connectCard2} onClick={handleClose}>
              <SiBinance />
              <Box>
                <Typography variant='h6'>Binance Smart Chain</Typography>
              </Box>
            </Box>
          </DialogContent>
          <DialogActions>
            <Button
              autoFocus
              onClick={handleClose}
              color='primary'
              style={{ color: "#E8424C" }}
            >
              Close
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    </Box>
  );
}
