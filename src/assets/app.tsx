import React, { useState } from "react";
import Header from "./components/header";
import Explanation from "./components/textBody";

function App() {
  const [number, setNumber] = React.useState("");
  const [isPrime, setIsPrime] = React.useState(false);
  const [headingText, setHeadingText] = React.useState(
    "Try it out! Enter a number"
  );
  const [shakeScreen, setShakeScreen] = useState<boolean>(false);

  function isNumberPrime(num: number) {
    if (num == 2 || num == 3) return true;
    if (num <= 1 || num % 2 == 0 || num % 3 == 0) return false;
    for (let i = 5; i * i <= num; i += 6)
      if (num % i == 0 || num % (i + 2) == 0) return false;
    return true;
  }

  function handleKeyPress(e: React.KeyboardEvent<HTMLInputElement>) {
    const enteredChar = e.key;
    const isNumber = /^[0-9]$/;
    if (
      !isNumber.test(enteredChar) &&
      enteredChar !== "Backspace" &&
      enteredChar !== "ArrowLeft" &&
      enteredChar !== "ArrowRight" &&
      enteredChar !== "Delete"
    ) {
      e.preventDefault();
    }

    const isLetter = /^[a-zA-Z]$/;
    if (isLetter.test(enteredChar)) {
      setShakeScreen(true);
    } else {
      setShakeScreen(false);
    }
  }

  function handleButtonClick() {
    const num = Number(number);
    if (num <= 1 || isNaN(num)) {
      setIsPrime(false);
    } else if (num > 1) {
      setIsPrime(isNumberPrime(num));
    }

    const headingText = isPrime ? "Prime" : "Not Prime";
    setHeadingText(headingText);
  }

  return (
    <div>
      <Header />
      <div className="container">
        <div className="content">
          <h3 className="heroTitle">{headingText}.</h3>
          <div className={`App ${shakeScreen ? "shake" : ""}`}>
            <input
              type="text"
              name="numInput"
              placeholder=""
              value={number}
              onKeyDown={handleKeyPress}
              onChange={(e) => setNumber(e.target.value)}
            />
            <button
              type="submit"
              className="btn btn-large btn-primary btn-block"
              value="input"
              onClick={handleButtonClick}
            >
              Check
            </button>
          </div>
          <Explanation />
        </div>
      </div>
    </div>
  );
}

export default App;
