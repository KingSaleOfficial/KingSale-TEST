import React from "react";
import { Box } from "@material-ui/core";
import { Link } from "react-router-dom";
import useStyles from "./styles";
import { BsBellFill } from "react-icons/bs";
export default function Header(props) {
  var classes = useStyles();
  return (
    <Box className={classes.mainmenus}>
      <Link className={classes.navLinks} to="/app/how">
        <BsBellFill/>
      </Link>
    </Box>
  );
}
