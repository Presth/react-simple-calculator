import React, { useEffect, useState } from "react";
import "./App.css";

function App({ style }) {
  const [mode, setMode] = useState("light");
  const [currentInput, setCurrentInput] = useState("");
  const [firstOperand, setFirstOperand] = useState(undefined);
  const [operator, setOperator] = useState("");
  const [result, setResult] = useState(0);

  const [special, setSpecial] = useState(undefined);

  const changeTheme = () => {
    let newTheme = mode === "light" ? "dark" : "light";
    setMode(newTheme);
  };

  const clearSrcn = () => {
    setFirstOperand(undefined);
    setCurrentInput("");
    setOperator("");
    setResult(0);
    setSpecial(undefined);
  };

  const pressKey = (key) => {
    if (typeof key === "string") {
      if (key === ".") {
        let n = `${currentInput}${key}`;
        setCurrentInput(n);
        return;
      }

      if (key === "CE") {
        clearSrcn();
        return;
      }

      if (key === "sqr" || key === "sqrt") {
        clearSrcn();
        setSpecial(key);
        return;
      }

      if (key === "=") {
        let ans;

        if (special && firstOperand) {
          const toCalc = runCalculation(firstOperand, Number(currentInput));
          ans = runSpecialCalculation(toCalc);
        } else if (special && currentInput !== "") {
          ans = runSpecialCalculation(currentInput);
        } else {
          ans = runCalculation(firstOperand, Number(currentInput));
        }

        setResult(ans);
        return;
      }

      setOperator(key);

      if (!firstOperand) {
        setFirstOperand(Number(currentInput));
      }

      if (operator !== "" && currentInput !== "") {
        const ans = runCalculation(firstOperand, Number(currentInput));
        console.log(ans);
        setResult(ans);
      }
    }

    if (typeof key === "number") {
      let n = `${currentInput}${key}`;
      setCurrentInput(n);
    }
  };

  useEffect(() => {
    // reset current input
    setCurrentInput("");
  }, [firstOperand]);

  const runSpecialCalculation = (num) => {
    let sol;
    if (special === "sqrt") {
      sol = Math.sqrt(Number(num));
    } else if (special === "sqr") {
      sol = Number(num) ** 2;
    }
    return sol;
  };
  const runCalculation = (a, b) => {
    let sol;
    if (operator === "+") {
      console.log(operator);
      sol = a + b;
    } else if (operator === "-") {
      sol = a - b;
    } else if (operator === "*") {
      sol = a * b;
    } else if (operator === "/") {
      sol = a / b;
    }

    setFirstOperand(sol);
    setOperator("");
    setCurrentInput("");
    return sol;
  };

  return (
    <div
      className={`App ${mode}`}
      style={{
        ...style,
      }}
    >
      <div style={{ maxWidth: 500, margin: "auto" }}>
        <Monitor
          result={result}
          firstOperand={firstOperand}
          currentInput={currentInput}
          operator={operator}
          special={special}
        />
        <Keypad pressKey={pressKey} changeTheme={changeTheme} />
      </div>
    </div>
  );
}

function Keypad({ pressKey, changeTheme }) {
  return (
    <div>
      <div className="keys">
        <button
          onClick={(e) => {
            pressKey("CE");
          }}
        >
          CE
        </button>
        <button
          onClick={(e) => {
            pressKey("sqr");
          }}
        >
          x<sup>2</sup>
        </button>
        <button
          onClick={(e) => {
            pressKey("sqrt");
          }}
        >
          &#8730;
        </button>
        <button
          onClick={(e) => {
            pressKey("/");
          }}
        >
          /
        </button>
        <button
          onClick={(e) => {
            pressKey(7);
          }}
        >
          7
        </button>
        <button
          onClick={(e) => {
            pressKey(8);
          }}
        >
          8
        </button>
        <button
          onClick={(e) => {
            pressKey(9);
          }}
        >
          9
        </button>
        <button
          onClick={(e) => {
            pressKey("*");
          }}
        >
          &times;
        </button>
        <button
          onClick={(e) => {
            pressKey(4);
          }}
        >
          4
        </button>
        <button
          onClick={(e) => {
            pressKey(5);
          }}
        >
          5
        </button>
        <button
          onClick={(e) => {
            pressKey(6);
          }}
        >
          6
        </button>
        <button
          onClick={(e) => {
            pressKey("-");
          }}
        >
          -
        </button>
        <button
          onClick={(e) => {
            pressKey(1);
          }}
        >
          1
        </button>
        <button
          onClick={(e) => {
            pressKey(2);
          }}
        >
          2
        </button>
        <button
          onClick={(e) => {
            pressKey(3);
          }}
        >
          3
        </button>
        <button
          onClick={(e) => {
            pressKey("+");
          }}
        >
          +
        </button>
        <button
          onClick={(e) => {
            pressKey(0);
          }}
        >
          0
        </button>
        <button
          onClick={(e) => {
            pressKey(".");
          }}
        >
          .
        </button>
        <button
          onClick={(e) => {
            changeTheme();
          }}
        >
          &#127769;
        </button>

        <button
          onClick={(e) => {
            pressKey("=");
          }}
        >
          =
        </button>
      </div>
    </div>
  );
}

function Monitor({ firstOperand, result, currentInput, operator, special }) {
  return (
    <div className="monitor">
      <h1 style={{ fontSize: 40 }}>{result !== 0 && result}</h1>
      <h6 style={{ fontSize: 20 }}>
        {special === "sqrt" && <>&#8730;</>}
        {firstOperand && firstOperand}
        {operator}
        {currentInput}
        {!firstOperand && currentInput === "" && 0}
        {special === "sqr" && <sup>2</sup>}
      </h6>
    </div>
  );
}

export default App;
