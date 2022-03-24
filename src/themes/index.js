import defaultTheme from "./default";

import { createMuiTheme } from "@material-ui/core";

const overrides = {

  typography: {
    h1: {
      fontSize: "3rem",
      fontFamily: '"Roboto", sans-serif !important',
    },
    h2: {
      fontSize: "2rem",
      fontFamily: '"Roboto", sans-serif !important',
    },
    h3: {
      fontSize: "1.64rem",
      fontFamily: '"Roboto", sans-serif !important',
    },
    h4: {
      fontSize: "1.5rem",
      fontFamily: '"Roboto", sans-serif !important',
    },
    h5: {
      fontSize: "1.285rem",
      fontFamily: '"Roboto", sans-serif !important',
    },
    h6: {
      fontSize: "1.142rem",
      fontFamily: '"Roboto", sans-serif !important',
    },
    body1: {
      fontFamily: '"Roboto", sans-serif !important',
    },
    body2: {
      fontFamily: '"Roboto", sans-serif !important',
    
    },
  },
};

const themes = {
  default: createMuiTheme({ ...defaultTheme, ...overrides }),
};

export default themes;
