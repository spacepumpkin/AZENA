import React from "react";
import logo from "./FSPLogo-azena-blue-black.png"; // with import


const App = function(props) {
  console.log("rendering App...")
  return (
    <>
    <header>
      <img src={logo} alt="azena logo"/>
      <h1>WELCOME TO AZENA</h1>
    </header>
    </>
  );
};

export default App;