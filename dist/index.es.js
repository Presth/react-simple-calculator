import React, { useState, useEffect } from 'react';

function styleInject(css, ref) {
  if ( ref === void 0 ) ref = {};
  var insertAt = ref.insertAt;

  if (typeof document === 'undefined') { return; }

  var head = document.head || document.getElementsByTagName('head')[0];
  var style = document.createElement('style');
  style.type = 'text/css';

  if (insertAt === 'top') {
    if (head.firstChild) {
      head.insertBefore(style, head.firstChild);
    } else {
      head.appendChild(style);
    }
  } else {
    head.appendChild(style);
  }

  if (style.styleSheet) {
    style.styleSheet.cssText = css;
  } else {
    style.appendChild(document.createTextNode(css));
  }
}

var css_248z = ".App{height:100%;padding:20px;transition:.12s ease-in}.App.light{background:#fff;color:#111}.App.dark{background:#444;color:#fff}.monitor{border:2px solid #bce0ffd8;border-radius:15px;margin:20px 5%;min-height:100px;padding:5px 20px;text-align:right}.keys{display:flex;flex-wrap:wrap;justify-content:space-between;margin:10px 5%;width:90%}.keys>button{background:#fafafa;border:none;border-radius:10px;box-shadow:.3px 3px 4px #d9f0fd;color:#1b8bec;flex:1;font-size:large;height:60px;margin:1%;min-width:23%;transition:.15s ease-in}.App.dark .keys>button{background:none}.keys>button:hover{background:#e8f9fe}h1,h6{font-weight:500;margin:0;overflow:hidden;padding:0;text-overflow:ellipsis;width:100%}h6{margin-top:10px}";
styleInject(css_248z);

function App({
  style
}) {
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
  const pressKey = key => {
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
  const runSpecialCalculation = num => {
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
  return /*#__PURE__*/React.createElement("div", {
    className: `App ${mode}`,
    style: {
      ...style
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 500,
      margin: "auto"
    }
  }, /*#__PURE__*/React.createElement(Monitor, {
    result: result,
    firstOperand: firstOperand,
    currentInput: currentInput,
    operator: operator,
    special: special
  }), /*#__PURE__*/React.createElement(Keypad, {
    pressKey: pressKey,
    changeTheme: changeTheme
  })));
}
function Keypad({
  pressKey,
  changeTheme
}) {
  return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "keys"
  }, /*#__PURE__*/React.createElement("button", {
    onClick: e => {
      pressKey("CE");
    }
  }, "CE"), /*#__PURE__*/React.createElement("button", {
    onClick: e => {
      pressKey("sqr");
    }
  }, "x", /*#__PURE__*/React.createElement("sup", null, "2")), /*#__PURE__*/React.createElement("button", {
    onClick: e => {
      pressKey("sqrt");
    }
  }, "\u221A"), /*#__PURE__*/React.createElement("button", {
    onClick: e => {
      pressKey("/");
    }
  }, "/"), /*#__PURE__*/React.createElement("button", {
    onClick: e => {
      pressKey(7);
    }
  }, "7"), /*#__PURE__*/React.createElement("button", {
    onClick: e => {
      pressKey(8);
    }
  }, "8"), /*#__PURE__*/React.createElement("button", {
    onClick: e => {
      pressKey(9);
    }
  }, "9"), /*#__PURE__*/React.createElement("button", {
    onClick: e => {
      pressKey("*");
    }
  }, "\xD7"), /*#__PURE__*/React.createElement("button", {
    onClick: e => {
      pressKey(4);
    }
  }, "4"), /*#__PURE__*/React.createElement("button", {
    onClick: e => {
      pressKey(5);
    }
  }, "5"), /*#__PURE__*/React.createElement("button", {
    onClick: e => {
      pressKey(6);
    }
  }, "6"), /*#__PURE__*/React.createElement("button", {
    onClick: e => {
      pressKey("-");
    }
  }, "-"), /*#__PURE__*/React.createElement("button", {
    onClick: e => {
      pressKey(1);
    }
  }, "1"), /*#__PURE__*/React.createElement("button", {
    onClick: e => {
      pressKey(2);
    }
  }, "2"), /*#__PURE__*/React.createElement("button", {
    onClick: e => {
      pressKey(3);
    }
  }, "3"), /*#__PURE__*/React.createElement("button", {
    onClick: e => {
      pressKey("+");
    }
  }, "+"), /*#__PURE__*/React.createElement("button", {
    onClick: e => {
      pressKey(0);
    }
  }, "0"), /*#__PURE__*/React.createElement("button", {
    onClick: e => {
      pressKey(".");
    }
  }, "."), /*#__PURE__*/React.createElement("button", {
    onClick: e => {
      changeTheme();
    }
  }, "\uD83C\uDF19"), /*#__PURE__*/React.createElement("button", {
    onClick: e => {
      pressKey("=");
    }
  }, "=")));
}
function Monitor({
  firstOperand,
  result,
  currentInput,
  operator,
  special
}) {
  return /*#__PURE__*/React.createElement("div", {
    className: "monitor"
  }, /*#__PURE__*/React.createElement("h1", {
    style: {
      fontSize: 40
    }
  }, result !== 0 && result), /*#__PURE__*/React.createElement("h6", {
    style: {
      fontSize: 20
    }
  }, special === "sqrt" && /*#__PURE__*/React.createElement(React.Fragment, null, "\u221A"), firstOperand && firstOperand, operator, currentInput, !firstOperand && currentInput === "" && 0, special === "sqr" && /*#__PURE__*/React.createElement("sup", null, "2")));
}

export { App as default };
