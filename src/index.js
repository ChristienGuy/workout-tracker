import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import registerServiceWorker from "./registerServiceWorker";

import { MuiThemeProvider, createMuiTheme } from "material-ui/styles";

// import lightBlue500 from "material-ui/colors/lightBlue";
import { indigo500 } from "material-ui/colors/indigo";

const theme = createMuiTheme({
  palette: {
    primary: indigo500
    // type: 'dark'
  }
});

const Root = () => (
  <MuiThemeProvider theme={theme}>
    <App />
  </MuiThemeProvider>
);
ReactDOM.render(<Root />, document.getElementById("root"));
registerServiceWorker();
