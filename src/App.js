import React from "react";
// import Router from "./Routers/Routers";
import './App.css'
import Router from "./Routers/Router";
function App() {

  return (
    <>
      <div className="testrejim">
        <marquee style={{ color: "red", fontSize: "18px" }}>Sayt sinov tariqasida ishga tushirilgan</marquee>
      </div>
      <div className="container">
        <Router/>
      </div>
    </>
  );
}
export default App;
