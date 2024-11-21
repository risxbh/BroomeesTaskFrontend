import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import Form from "./pages/Form";

function App() {
  return (
    <>
      <div className="bg-[#EDECF4] flex items-center justify-center h-screen px-4">
        <Form />
      </div>
    </>
  );
}

export default App;
