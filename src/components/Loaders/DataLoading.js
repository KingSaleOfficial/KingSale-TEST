import { Box, Typography } from "@material-ui/core";
import React from "react";
import ButtonCircularProgress from "./ButtonCircularProgress";

export default function DataLoading() {
  return (
    <Box
      display='flex'
      justifyContent='center'
      alignItems='center'
      minHeight={50}
    >
      <Typography>Loading..</Typography>
      <ButtonCircularProgress />
    </Box>
  );
}
