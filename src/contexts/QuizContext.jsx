import { createContext, useContext, useEffect, useReducer } from "react";
import defaultQuestions from "../questions.js";

const initialState = {
  questions: [],
  status: "loading", /// 'loading', 'error', 'ready', 'active', 'finished'
  currentIndex: 0,
  answer: null,
  points: 0,
  highscore: 0,
  // secondsRemaining: 10,
};

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
//? Creating the context
const QuizContext = createContext();

//.
//? Providing the context
function QuizProvider({ children }) {
  const [
    { questions, status, currentIndex, answer, points, highscore },
    dispatch,
  ] = useReducer(reducer, initialState);

  useEffect(function () {
    async function getQuestions() {
      try {
        /// Use json-server to start a fake server & fetch data
        const res = await fetch("http://localhost:8000/questions");
        const questions = await res.json();
        dispatch({ type: "dataReceived", payload: questions });
      } catch (err) {
        dispatch({ type: "dataFailed" });
        dispatch({ type: "dataReceived", payload: defaultQuestions.questions });
      }
    }
    getQuestions();
  }, []);

  return (
    <QuizContext.Provider
      value={{
        questions,
        status,
        currentIndex,
        answer,
        points,
        highscore,
        dispatch,
      }}
    >
      {children}
    </QuizContext.Provider>
  );
}

//.
//? Using the context
function useQuiz() {
  const context = useContext(QuizContext);

  if (!context) throw new Error("The quizContext is being used outside ");

  return context;
}

export { useQuiz, QuizProvider };
