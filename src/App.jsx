import React, { useEffect, useState } from "react";
import "./App.css";
import Keypad from "./components/keypad.jsx";
import Monitor from "./components/monitor.jsx";

function App() {
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
        position: "absolute",
        height: "100%",
        width: "100%",
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

export default App;
