import React from "react";

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

export default Keypad;
