import { useState, useReducer } from "react";

const initialState = { count: 0, step: 1 };

/// "state" and "action" are automatically sent as arguments to reducer function
/// state => count [returned state from useReducer hook]
/// action => object received as a parameter to dispatch function call
/// returns new value to state
function reducer(state, action) {
  switch (action.type) {
    case "increment":
      return { ...state, count: state.count + state.step };

    case "decrement":
      return { ...state, count: state.count - state.step };

    case "defineCount":
      return { ...state, count: action.payload };

    case "defineStep":
      return { ...state, step: action.payload };

    case "reset":
      return initialState;

    default:
      throw new Error("Unknown action type");
  }
}

function DateCounter() {
  /// dispatch function induces state update. It calls the reducer function with "action" object as a prameter
  const [state, dispatch] = useReducer(reducer, initialState);
  const { count, step } = state;

  // This mutates the date object.
  const date = new Date("june 21 2027");
  date.setDate(date.getDate() + count);

  // const [count, setCount] = useState(0);
  // const [step, setStep] = useState(1);
  /*
    const dec = function () {
      setCount((count) => count - step);
    };

    const inc = function () {
      setCount((count) => count + step);
    };

    const defineCount = function (e) {
      setCount(Number(e.target.value));
    };
   */

  // const defineStep = function (e) {
  //   setStep(Number(e.target.value));
  // };

  // const reset = function () {
  //   dispatch(0);
  //   setStep(1);
  // };

  return (
    <div className="counter">
      <div>
        <input
          type="range"
          min="0"
          max="10"
          value={step}
          onChange={(e) =>
            dispatch({ type: "defineStep", payload: Number(e.target.value) })
          }
        />
        <span>{step}</span>
      </div>

      <div>
        <button onClick={() => dispatch({ type: "decrement" })}>-</button>

        <input
          value={count}
          onChange={(e) =>
            dispatch({ type: "defineCount", payload: Number(e.target.value) })
          }
        />

        <button onClick={() => dispatch({ type: "increment" })}>+</button>
      </div>

      <p>{date.toDateString()}</p>

      <div>
        <button onClick={() => dispatch({ type: "reset" })}>Reset</button>
      </div>
    </div>
  );
}
export default DateCounter;
