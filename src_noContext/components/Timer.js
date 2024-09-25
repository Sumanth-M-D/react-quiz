import { useEffect, useState } from "react";

function Timer({ dispatch, seconds }) {
  const [time, setTime] = useState(seconds);
  const [hasFinished, setHasFinished] = useState(false);

  const minute = Math.floor(time / 60);
  const second = time % 60;

  useEffect(
    function () {
      const setTimer = setInterval(function () {
        setTime((prev) => {
          if (prev <= 1) {
            clearInterval(setTimer);
            setHasFinished(true); // Set the flag to true when the timer finishes
            return 0;
          }
          return prev - 1;
        });
      }, 1000);

      return () => clearInterval(setTimer);
    },
    [dispatch]
  );

  useEffect(() => {
    if (hasFinished) {
      dispatch({ type: "finished" });
    }
  }, [hasFinished, dispatch]); // Dispatch only when the timer has finished

  return (
    <div className="timer">
      {minute < 10 && "0"}
      {minute}:{second < 10 && "0"}
      {second}
    </div>
  );
}

export default Timer;
