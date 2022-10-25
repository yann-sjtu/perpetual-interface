import React from "react";
import logo from "./logo.svg";
import Header from "./components/Header";
import MainLayout from "./components/Main";
import "./App.css";

function App() {
  return (
    <div className="App">
      <Header />
      <MainLayout />
    </div>
  );
}

export default App;
