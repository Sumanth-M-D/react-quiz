import { useEffect, useReducer } from "react";
import Header from "./Header";
import Main from "./Main";
import Loader from "./Loader";
import Error from "./Error";
import StartScreen from "./StartScreen";
import Question from "./Question";
import NextButton from "./NextButton";
import Progress from "./Progress";
import FinishScreen from "./FinishScreen";
import Timer from "./Timer";
import Footer from "./Footer";
import defaultQuestions from "../questions";

const initialState = {
  questions: [],
  status: "loading", /// 'loading', 'error', 'ready', 'active', 'finished'
  currentIndex: 0,
  answer: null,
  points: 0,
  highscore: 0,
  // secondsRemaining: 10,
};

const SECS_PER_QUESTION = 30;
//.
//? Reducer function
function reducer(state, action) {
  switch (action.type) {
    case "dataReceived":
      return { ...state, questions: action.payload, status: "ready" };

    case "dataFailed":
      return { ...state, status: "error" };

    case "start":
      return { ...state, status: "active" };

    case "newAnswer":
      const question = state.questions[state.currentIndex];
      return {
        ...state,
        answer: action.payload,
        points:
          question.correctOption === action.payload
            ? state.points + question.points
            : state.points,
      };

    case "nextQuestion":
      return {
        ...state,
        currentIndex: state.currentIndex + 1,
        answer: null,
      };

    case "finished":
      return {
        ...state,
        status: "finished",
        answer: null,
        highscore:
          state.points > state.highscore ? state.points : state.highscore,
      };

    case "restart":
      return {
        ...initialState,
        status: "ready",
        questions: state.questions,
      };

    /*
    case "tick":
      return {
        ...state,
        secondsRemaining: state.secondsRemaining - 1,
        status: state.secondsRemaining === 0 ? "finished" : state.status,
      };
       */

    default:
      throw new Error("Unknown action");
  }
}

//.
//? App component
export default function App() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const {
    questions,
    status,
    currentIndex,
    answer,
    points,
    highscore,
    // secondsRemaining,
  } = state;

  const numQuestions = questions.length;
  const maxPossiblePoints = questions.reduce((acc, q) => acc + q.points, 0);
  const seconds = SECS_PER_QUESTION * numQuestions;

  useEffect(function () {
    async function getQuestions() {
      try {
        const res = await fetch("http://localhost:8000/questions");
        const questions = await res.json();
        dispatch({ type: "dataReceived", payload: questions });
      } catch (err) {
        dispatch({ type: "dataFailed" });
        // dispatch({ type: "dataReceived", payload: defaultQuestions });
      }
    }
    getQuestions();
  }, []);

  return (
    <div className="app">
      <Header />
      <Main className="main">
        {status === "loading" && <Loader />}
        {status === "error" && <Error />}
        {status === "ready" && (
          <StartScreen numQuestions={numQuestions} dispatch={dispatch} />
        )}
        {status === "active" && (
          <>
            <Progress
              currentIndex={currentIndex}
              numQuestions={numQuestions}
              points={points}
              maxPossiblePoints={maxPossiblePoints}
              answer={answer}
            />
            <Question
              question={questions[currentIndex]}
              dispatch={dispatch}
              answer={answer}
            />

            <Footer>
              <NextButton
                dispatch={dispatch}
                answer={answer}
                currentIndex={currentIndex}
                numQuestions={numQuestions}
              />
              <Timer
                dispatch={dispatch}
                seconds={seconds}
                // secondsRemaining={secondsRemaining}
              />
            </Footer>
          </>
        )}
        {status === "finished" && (
          <FinishScreen
            points={points}
            maxPossiblePoints={maxPossiblePoints}
            highscore={highscore}
            dispatch={dispatch}
          />
        )}
      </Main>
    </div>
  );
}
