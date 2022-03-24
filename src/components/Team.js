import React from "react";
import {
  Box,
  Typography,
} from "@material-ui/core";
import Tilt from 'react-parallax-tilt';
// import { makeStyles } from "@material-ui/core/styles";
// const useStyles = makeStyles((theme) => ({
  
// }));
export default function Release(props) {
  // const classes = useStyles();
  const { data } = props;
  return (
    <Box className="overlay">
        <Tilt>
   <figure>
   <img src={data.image} alt="" />
   </figure>
   </Tilt>
      <Box className="teamtext-main">
        <Typography variant="h1" >
         {data.name}
        </Typography>
        <Typography variant="h4" >
         {data.post}
        </Typography>
      </Box>
      
      {/* <Box
        className="teamtext">
        <Typography variant="h1" align="left">
            {data.name}
        </Typography>
        <Typography variant="h4" align="left">
             {data.post}
        </Typography>
        <Typography variant="body1" align="left">
          {data.discription}
        </Typography>
      </Box>     */}
    </Box>
  );
}