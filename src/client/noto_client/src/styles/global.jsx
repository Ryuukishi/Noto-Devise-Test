import { Global, css } from "@emotion/react";
import reset from "./reset";

export default () => (
  <Global
    styles={css`
      @import url("https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap");
      ${reset}
      body {
        font-family: "Roboto", monospace;
      }
    `}
  />
);
