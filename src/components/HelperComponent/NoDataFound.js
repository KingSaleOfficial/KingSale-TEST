import { Box, Typography } from "@material-ui/core";
import React from "react";

export default function NoDataFound() {
  return (
    <Box mt={1} mb={1} textAlign="center">
      <Typography>No Data Found</Typography>
    </Box>
  );
}
