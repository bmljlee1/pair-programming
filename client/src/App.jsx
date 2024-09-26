import "./App.css";
import { useState } from "react";
import Results from "./components/Results";
import { Route, Routes } from "react-router-dom";
import Home from "./components/Home";

export default function App() {
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");

  function handleNameChange(event) {
    event.preventDefault();
    console.log(event.target.value);
    setName(event.target.value);
  }

  function handleMessageChange(event) {
    event.preventDefault();
    console.log(event.target.value);
    setMessage(event.target.value);
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <label htmlFor="nameInput">Enter your name</label>
        <input
          type="text"
          name="name"
          id="nameInput"
          onChange={handleNameChange}
        ></input>
        <label htmlFor="messageInput">Type message</label>
        <input
          type="text"
          name="message"
          id="messageInput"
          onChange={handleMessageChange}
        ></input>
        <button type="submit">Submit</button>
      </form>
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </>
  );

  function handleSubmit(event) {
    event.preventDefault();
    console.log({ name: name, message: message });
    fetch("http://localhost:8080/message", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name: name, message: message }),
    });
  }
}
