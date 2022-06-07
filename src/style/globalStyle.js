import { createGlobalStyle } from "styled-components";
import reset from "styled-reset";

export const GlobalStyle = createGlobalStyle`
  ${reset}

  * {
    margin:0;
    padding: 0;
    box-sizing: border-box;
  }

  html {
    height: 100%;
    position:relative;
  }

  body {
    width: 100%;
    height: 90%;
    font-weigth: bold;
    font-family: 'Gothic A1', sans-serif;
    background-color: #F5F4F2;
  }

  a { 
    color:inherit;
    text-decoration:none;
  }

  input {
    -webkit-appearance: none; /* Safari and Chrome */
    -moz-appearance: none; /* Firefox */
    appearance: none;
    &:focus {
      outline: none;
    }
  }

  input:focus::-webkit-input-placeholder, 
  textarea:focus::-webkit-input-placeholder { 
    /* WebKit browsers */ 
    color:transparent; 
  } 
  input:focus:-moz-placeholder, 
  textarea:focus:-moz-placeholder { 
    /* Mozilla Firefox 4 to 18 */ 
    color:transparent; 
  } 
  input:focus::-moz-placeholder, 
  textarea:focus::-moz-placeholder { 
    /* Mozilla Firefox 19+ */ 
    color:transparent; 
  } 
  input:focus:-ms-input-placeholder, 
  textarea:focus:-ms-input-placeholder {
    /* Internet Explorer 10+ */ 
    color:transparent; 
  }
`;
