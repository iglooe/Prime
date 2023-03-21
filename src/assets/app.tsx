import React, { useState } from "react";
import Header from "./components/header";

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
    console.log("clicked");

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

          <div className="explanation">
            <h4 className="h4">About the algorithm used...</h4>
            <img src="../public/images/primality.png" alt="algorithm img" />
            <p className="e-text">
              Let's consider the number 100, which is evenly divisible by these
              numbers
            </p>
            <p className="code-block">2, 4, 5, 10, 20, 25, 50</p>
            <p className="e-text">
              Note that the largest factor, 50, is half of 100.
            </p>
            <p className="e-text">
              This holds true for all <em>n</em>: all divisors are less than or
              equal to <em>n / 2</em>.
            </p>
            <p className="e-text">
              In fact, when we test for all possible divisors we will discover
              some factors twice
            </p>
            <p className="code-block">
              2 x 50, 4 x 25, 5 x 20, 10 x 10, 20 x 5, 25 x 4, 50 x 2
            </p>
            <p className="e-text">
              Notice that products past <em>10 x 10</em> simply repeat numbers
              which appears in earlier products.
            </p>
            <p className="e-text">
              For example 20 x 5 and 5 x 20 consist of the same numbers in
              opposite order.
            </p>
            <p className="e-text">
              All unique factors are less than or equal to &#x221A;n (the square
              root of n). We do not need to search past that.
            </p>
            <p className="e-text">
              All even numbers greater than 2 can also be eliminated.
            </p>
            <p className="e-text">
              We improve this method further observing all primes greater than 3
              are of the form:
            </p>
            <p className="code-block">
              6k<span>&#177;1</span> where <em>k</em> is any integer greater
              than 0.
            </p>
            <p className="e-text">
              This is because all integers can be expressed as:
            </p>
            <p className="code-block">
              (6k<span>&#177;i)</span> where <em>i</em> = -1, 0, 1, 2, 3, or 4.
            </p>
            <p className="e-text">
              Note that 2 divides <em>4k + 0</em> and <em>4k + 2</em>. and 3
              divides <em>4k + 3</em>
            </p>
            <p className="e-text">
              So, a more efficient method is to test whether <em>n</em> is
              divisible by 2 or 3
            </p>
            <p className="e-text">
              Then to check through all the numbers of form{" "}
              <em>6k &#177;1 &#8804; &#x221A;n</em>
            </p>
            <p className="e-text">
              This is 3 times faster than testing all numbers up to &#x221A;n
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
