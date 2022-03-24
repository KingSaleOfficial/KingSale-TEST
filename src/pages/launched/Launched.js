import React from 'react'
import {
  Grid,
  Box,
  Typography,
  makeStyles,
  Button
} from '@material-ui/core'
import { Link } from "react-router-dom";
import LaunchedCard from "../../components/LaunchedCard";
import UpcomingCard from "../../components/UpcomingCard";
import CompletedCard from "../../components/CompletedCard";
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from "@material-ui/core/TextField";
const useStyles = makeStyles((theme) => ({
  textbox: {
    mint: {
      fontSize: "14px ",
      border: "1px solid #E8424C",
      background: "#E8424C",
      fontWeight: 600,
      height: "44px ",
      color: "#FFFFFF",
      minWidth: "150px ",
      borderRadius: "50px",
      boxShadow: "none ",
      cursor: "pointer",
      [theme.breakpoints.down("xs")]: {
        height: "45px ",
        minWidth: "120px ",
      },
      "&:hover": {
        borderColor: "#E8424C",
        background: "#E8424C",
      },
    },
    "& h1": {
      fontSize: "25px",
      fontWeight: "bold",
      lineHeight: "55px",
      color: "#FABE25",
    },
    "& h2": {
      fontSize: "45px",
      fontWeight: "bold",
      lineHeight: "55px",
      color: "#FABE25",
      [theme.breakpoints.down("xs")]: {
        fontSize: "30px",
      },
    },
    "& h3": {
      fontSize: "35px",
      fontWeight: "bold",
      lineHeight: "55px",
      color: "#fff",
      "@media (max-width: 1024px)": {
        fontSize: "30px",
      },
    },
    "& h5": {
      fontSize: "30px",
      fontWeight: "500",
      color: "#fff",
      marginBottom: "10px",
      marginTop: "15px",
    },
    "& h6": {
      color: "#9F9F9F",
      marginBottom: "10px",
    },
    "& p": {
      fontSize: "14px",
      color: "#9F9F9F",
      width: "100%",
      // maxWidth: "600px",
    },
    "& label": {
      fontSize: "16px",
      color: "#fff",
      // maxWidth: "600px",
    },
    "& div": {
      "& button": {
        "&:last-child": {
          marginLeft: "20px",
        },
      },
    },
  },
  technologies: {
    background: '#ECECEC',
    borderRadius: '10px',
    maxHeight: '300px',
    '& img': {
      maxHeight: '300px',
    },
  },

  amount: {
    '& label': {
      color: '#353840',
      fontSize: '18px',
      fontWeight: '400',
      lineHeight: '33px',
    },
  },
  amountdiv: {
    maxWidth: '100%',
    height: '60px',
    border: '1px solid #00ffab',
    borderRadius: ' 5px',
    display: 'flex',
    padding: '0 20px',
    alignItems: 'center',
    fontSize: '45px',
  },

  inputfile: {
    background: '#ECECEC',
    borderRadius: '10px',
    position: 'relative',
    border: '2px dashed #DDD9D9',
    boxSizing: 'border-box',
    cursor: 'pointer',
    padding: "10px",

    '& input': {
      width: '100%',
      height: '100%',
      top: '0',
      left: '0',
      opacity: '0',
      position: 'absolute',
      cursor: 'pointer',
    },

    '& img': {
      padding: '26px',
    },

    '& p': {
      fontSize: '9px',
      fontWeight: 'normal',
      padding: '9px',
      lineHeight: '17px',
      textAlign: 'center',
      color: '#595C62',
      marginTop: '-17px',
    },
  },

  mainBox: {
    padding: "20px 20px 50px",
    overflow: "hidden",
    position: "relative",
    background:  "linear-gradient(180deg, rgb(10 15 30) 0%, rgb(22 19 3) 100%)",
    border:"1px solid #b6852e",
    transition: "0.5s",
    borderRadius: "0 30px 0 0",
    backdropFilter: "blur(42px)",

    "& h1": {
      fontSize: "25px",
      fontWeight: "bold",
      lineHeight: "55px",
      color: "#FABE25",
    },
    "& p": {
      fontSize: "14px",
      color: "#9F9F9F",
      width: "100%",
      // maxWidth: "600px",
    },
    "& small": {
      fontSize: "12px",
      color: "#6c757d!important",
      // maxWidth: "600px",
    },
    "& label": {
      color: "#9F9F9F",
      padding: "0",
      fontSize: "14px",
      transition: "opacity 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,color 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms",
    },
  },
  selectbox: {
    width: "100%",
    border: "2px solid #FABE25",
    height: "37px",
    borderRadius: "5px",
    background: "#18131d",
    color: "#9F9F9F",
    fontSize: "14px",
    padding: "5px",
  },

  buttonright: {
    fontSize: "14px ",
    border: "1px solid #E8424C",
    background: "#E8424C",
    fontWeight: 600,
    height: "44px ",
    borderRadius: "50px",
    color: "#FFFFFF",
    minWidth: "150px ",
    boxShadow: "none ",
    cursor: "pointer",
    [theme.breakpoints.down("xs")]: {
      height: "45px ",
      minWidth: "120px ",
    },
    "&:hover": {
      borderColor: "#E8424C",
      backgroundColor: "#E8424C",
      border: "2px solid #fff",
    },
  },

  labeltext: {
    display: "inline",
    padding: "0em 0em 0.7em",
    fontWeight: "500",
    fontSize: "16px",
    lineHeight: "27px",
    color: "rgb(255, 255, 255)",
    display: "block",
    whiteSpace: "nowrap",
    verticalAlign: "baseline",
    borderRadius: "0.25em",
  },
  Buttonbox: {
        "@media (max-width: 767px)": {
       textAlign:"center",
      },

  },
  createbutton: {
    // "@media (max-width: 1024px)": {
    //   marginTop:"10px",
    //   },
    "@media (max-width: 767px)": {
     marginTop:"10px",
     },

  },

}))

const Token = [
  {
    icon: "images/icons/1.svg",
    name: "Fees",
    discription: "$300 USD in King Shiba token to deploy pre sale contract 0% Token tax to ensure no malicious token dumping like Pink Sale and Dx-Sale   3% Contribution token Fee on each pre sale",
  },
  {
    icon: "images/icons/1.svg",
    name: "King Swap",
    discription: "Instant access to claim and swap your tokens conveniently through our pre sale page",
  },
  {
    icon: "images/icons/1.svg",
    name: "Token distribution",
    discription: "Token distribution checker",
  },
  {
    icon: "images/icons/1.svg",
    name: "Community",
    discription: "Community vote on project safety",
  },
  {
    icon: "images/icons/1.svg",
    name: "Fees",
    discription: "$300 USD in King Shiba token to deploy pre sale contract 0% Token tax to ensure no malicious token dumping like Pink Sale and Dx-Sale   3% Contribution token Fee on each pre sale",
  },
  {
    icon: "images/icons/1.svg",
    name: "King Swap",
    discription: "Instant access to claim and swap your tokens conveniently through our pre sale page",
  },
  {
    icon: "images/icons/1.svg",
    name: "Token distribution",
    discription: "Token distribution checker",
  },
  {
    icon: "images/icons/1.svg",
    name: "Community",
    discription: "Community vote on project safety",
  },

];

const Token1 = [
  {
    icon: "images/icons/1.svg",
    name: "Fees",
    discription: "$300 USD in King Shiba token to deploy pre sale contract 0% Token tax to ensure no malicious token dumping like Pink Sale and Dx-Sale   3% Contribution token Fee on each pre sale",
  },
  {
    icon: "images/icons/1.svg",
    name: "King Swap",
    discription: "Instant access to claim and swap your tokens conveniently through our pre sale page",
  },
  {
    icon: "images/icons/1.svg",
    name: "Token distribution",
    discription: "Token distribution checker",
  },
  {
    icon: "images/icons/1.svg",
    name: "Community",
    discription: "Community vote on project safety",
  },


];
export default function BestSeller() {
  const classes = useStyles()
  const [open, setOpen] = React.useState(false);
  const [open1, setOpen1] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleClickOpen1 = () => {
    setOpen1(true);
  };

  const handleClose1 = () => {
    setOpen1(false);
  };
  return (
    <Box className={classes.bannerBox}>
       <Box className={classes.textbox} mt={5} mb={5}>
          <Typography variant="h2" align="center">Launchpad</Typography>
        </Box>  
  
        <Grid container spacing={3}>
          <Grid item xs={12} sm={3}>
            <Box className={classes.textbox} mt={3}>
              <Typography variant="h3">Live Projects</Typography>
            </Box>
          </Grid>
          <Grid item xs={12} sm={9}>
            <Box className={classes.Buttonbox} mt={3} align="right">
              <Button variant="contained" color="primary"
                onClick={handleClickOpen} style={{marginRight: "7px",}}>
               Add Whitelist 
                        </Button>
                        <Button variant="contained" color="primary" className={classes.blackbutton}
               onClick={handleClickOpen1} style={{marginRight: "7px",}}>
                Add Blacklist
                        </Button>
                        {/* <Button variant="contained" color="primary" className={classes.createbutton}
                component={Link}
                to="/app/create-launched">
                Create
                        </Button> */}

            </Box>
          </Grid>
        </Grid>
   
 

      <Dialog
           
            open={open}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle id="alert-dialog-title">
              {/* {"Use Google's location service?"} */}
              {/* {"Connect Your Wallet?"} */}
            </DialogTitle>
            <DialogContent>
              <DialogContentText
                id="alert-dialog-description"
                style={{ maxWidth: "450px" }}
              >
                <label className={classes.labeltext} for="fname">
                 Add Whitelist Wallet Address{" "}
                </label>

                      <TextField
                        id="outlined-basic"
                        variant="outlined"
                        placeholder=""
                        fullWidth
                      />
                    
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              {/* <Button onClick={handleClose}>Disagree</Button> */}
              <Button onClick={handleClose} color="primary" style={{color: "rgb(250, 190, 37"}}>
           Cancel
          </Button>
          <Button onClick={handleClose} color="primary" autoFocus style={{color:"#fff"}}>
           Save
          </Button>
            </DialogActions>
          </Dialog>


          <Dialog
           
           open={open1}
           onClose={handleClose1}
           aria-labelledby="alert-dialog-title"
           aria-describedby="alert-dialog-description"
         >
           <DialogTitle id="alert-dialog-title">
             {/* {"Use Google's location service?"} */}
             {/* {"Connect Your Wallet?"} */}
           </DialogTitle>
           <DialogContent>
             <DialogContentText
               id="alert-dialog-description"
               style={{ maxWidth: "450px" }}
             >
               <label className={classes.labeltext} for="fname">
                Add Blacklist Wallet Address{" "}
               </label>

                     <TextField
                       id="outlined-basic"
                       variant="outlined"
                       placeholder=""
                       fullWidth
                     />
                   
             </DialogContentText>
           </DialogContent>
           <DialogActions>
             {/* <Button onClick={handleClose}>Disagree</Button> */}
             <Button onClick={handleClose1} color="primary" style={{color: "rgb(250, 190, 37"}}>
           Cancel
          </Button>
          <Button onClick={handleClose1} color="primary" autoFocus style={{color:"#fff"}}>
           Save
          </Button>
           </DialogActions>
         </Dialog>
    
      <Box mt={5}>
        <Grid container spacing={5} justifyContent="center">
          {Token.map((data, i) => {
            return (
              <Grid
                item
                xs={12}
                sm={6}
                md={4}
                lg={3}
                key={i}
                className="walletSet"
              >
                <LaunchedCard data={data} type="card" index={i} />
              </Grid>
            );
          })}
        </Grid>
      </Box>

      <Box mt={5} mb={5}>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={12}>
              <Box className={classes.textbox} mt={2} mb={2}>
                <Typography variant="h3">Upcoming Projects</Typography>
              </Box>
            </Grid>
          </Grid>
        <Box>
          <Grid container spacing={5} justifyContent="center">
            {Token1.map((data, i) => {
              return (
                <Grid
                  item
                  xs={12}
                  sm={6}
                  md={4}
                  lg={3}
                  key={i}
                  className="walletSet"
                >
                  <UpcomingCard data={data} type="card" index={i} />
                </Grid>
              );
            })}
          </Grid>
        </Box>
      </Box>

      <Box mt={5}>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={12}>
              <Box className={classes.textbox} mt={2} mb={2}>
                <Typography variant="h3">Completed Projects</Typography>
              </Box>
            </Grid>
      
          </Grid>
        <Box>
          <Grid container spacing={5} justifyContent="center">
            {Token1.map((data, i) => {
              return (
                <Grid
                  item
                  xs={12}
                  sm={6}
                  md={4}
                  lg={3}
                  key={i}
                  className="walletSet"
                >
                  <CompletedCard data={data} type="card" index={i} />
                </Grid>
              );
            })}
          </Grid>
        </Box>
      </Box>

    </Box>
  )
}
