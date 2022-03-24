import React from "react";
import ReactDOM from "react-dom";
import { ThemeProvider } from "@material-ui/styles";
import { CssBaseline } from "@material-ui/core";
import "../src/scss/main.css";
import Themes from "./themes";
import App from "./components/App";
import * as serviceWorker from "./serviceWorker";
import { LayoutProvider } from "./context/LayoutContext";
import { UserProvider } from "./context/UserContext";
import { Web3Provider } from "@ethersproject/providers";
import { createWeb3ReactRoot, Web3ReactProvider } from "@web3-react/core";
import { NetworkContextName } from "../src/constants/";
import UserContext from "./context/User";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import MomentUtils from "@date-io/moment";

const Web3ProviderNetwork = createWeb3ReactRoot(NetworkContextName);
function getLibrary(provider) {
  const library = new Web3Provider(provider);
  library.pollingInterval = 15000;
  return library;
}

ReactDOM.render(
  <Web3ReactProvider getLibrary={getLibrary}>
    <Web3ProviderNetwork getLibrary={getLibrary}>
      <UserContext>
        <LayoutProvider>
          <UserProvider>
            <ThemeProvider theme={Themes.default}>
              <MuiPickersUtilsProvider utils={MomentUtils}>
                <CssBaseline />
                <App />
              </MuiPickersUtilsProvider>

              <ToastContainer />
            </ThemeProvider>
          </UserProvider>
        </LayoutProvider>
      </UserContext>
    </Web3ProviderNetwork>
  </Web3ReactProvider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
