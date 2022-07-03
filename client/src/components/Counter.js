import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { increment, decrement } from "../actions/actions";

export const Counter = () => {
  const counter = useSelector((state) => state.counter);
  const dispatch = useDispatch();
  return (
    <>
      <h1 className="text-center mt-4 mb-4">
        Counter: <strong>{counter}</strong>
      </h1>
      <div className="text-center mx-auto mt-4">
        <button
          className="btn btn-primary me-1"
          onClick={() => dispatch(increment())}
        >
          Increment
        </button>
        <button
          className="btn btn-primary"
          onClick={() => dispatch(decrement())}
        >
          Decrement
        </button>
      </div>
    </>
  );
};
