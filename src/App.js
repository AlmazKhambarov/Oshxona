import React from "react";
import Router from "./Routers/Router";
import './App.css'
function App() {

  return (
    <>
      <div className="testrejim">
        <marquee style={{ color: "red", fontSize: "22px" }}>Sayt sinov tariqasida ishga tushirilgan</marquee>
      </div>
      <div className="container">
        <Router />
      </div>
    </>
  );
}
export default App;
