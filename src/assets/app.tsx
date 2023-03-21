import React, { useState } from "react";
import Header from "./components/header";

function App() {
  const [number, setNumber] = React.useState("");
  const [isPrime, setIsPrime] = React.useState(false);

  function isNumberPrime(num: number) {
    if (num == 2 || num == 3) return true;
    if (num <= 1 || num % 2 == 0 || num % 3 == 0) return false;
    for (let i = 5; i * i <= num; i += 6)
      if (num % i == 0 || num % (i + 2) == 0) return false;
    return true;
  }

  function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    const num = Number(e.target.value);
    setNumber(num.toString());
  }

  function handleButtonClick() {
    const num = Number(number);
    if (num <= 1 || isNaN(num)) {
      setIsPrime(false);
    } else {
      setIsPrime(isNumberPrime(num));
    }

    const heading = document.querySelector(".heroTitle") as HTMLElement;
    heading.textContent = isPrime ? "Prime" : "Not Prime";
  }

  return (
    <div>
      <Header />
      <div className="container">
        <div className="content">
          <h3 className="heroTitle">Try it out! Enter a number.</h3>
          <input
            type="text"
            name="numInput"
            placeholder=""
            value={number}
            onChange={handleInputChange}
          />
          <button
            type="submit"
            className="btn btn-large btn-primary btn-block"
            value="input"
            onClick={handleButtonClick}
          >
            Check
          </button>
          <div className="explanation">
            <h4>About the algorithm used...</h4>
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
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
