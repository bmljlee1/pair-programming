import "./App.css";
import { useState } from "react";

export default function App() {
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");

  function handleNameChange(event) {
    event.preventDefault();
    console.log("name changed");
    setMessage(...name, event.target.value);
  }

  function handleMessageChange(event) {
    event.preventDefault();
    console.log("message changed");
    setMessage(...message, event.target.value);
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
    </>
  );

  function handleSubmit(event) {
    event.preventDefault();
    console.log("event happening");
    fetch("http://localhost:8080/message", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name: name, message: message }),
    });
  }
}
