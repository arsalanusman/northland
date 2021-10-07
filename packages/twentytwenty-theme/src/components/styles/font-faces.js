import React from "react";
import { Global, css, connect } from "frontity";
import GintoNordRegular from "../../fonts/inter/ginto-nord-regular.woff";
import GintoNordBold from "../../fonts/inter/ginto-nord-bold.woff";
import GintoNormalRegular from "../../fonts/inter/ginto-normal-regular.woff";
import GintoNormalBold from "../../fonts/inter/ginto-normal-bold.woff";

const fonts = {
  all: [GintoNordRegular, GintoNordBold, GintoNormalRegular, GintoNormalBold]
};

const FontFace = ({ state }) => {
  const font = fonts[state.theme.fontSets] || fonts["all"];

  return (
    <Global
      styles={css`
        @font-face {
          font-family: "Ginto Nord Regular";
          font-style: normal;
          font-weight: normal;
          font-display: "swap";
          src: url(${font[0]}) format("woff");
        }

        @font-face {
          font-family: "Ginto Nord Bold";
          font-style: normal;
          font-weight: normal;
          font-display: "swap";
          src: url(${font[1]}) format("woff");
        }

        @font-face {
          font-family: "Ginto Normal Regular";
          font-style: normal;
          font-weight: normal;
          font-display: "swap";
          src: url(${font[2]}) format("woff");
        }

        @font-face {
          font-family: "Ginto Normal Bold";
          font-style: normal;
          font-weight: normal;
          font-display: "swap";
          src: url(${font[3]}) format("woff");
        }
      `}
    />
  );
};

export default connect(FontFace);
