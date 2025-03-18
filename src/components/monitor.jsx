import React from "react";

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

export default Monitor;
