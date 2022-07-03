import React from "react";
import { hideAlert } from "../actions/actions";
import { useDispatch } from "react-redux";

export const Alert = ({ type, text, prefix }) => {
  const dispatch = useDispatch();
  return (
    <div className={`alert alert-dismissible mt-4 alert-${type || "warning"}`}>
      <button
        type="button"
        className="btn-close"
        onClick={() => dispatch(hideAlert())}
      ></button>
      <strong>{prefix}</strong>
      &nbsp;{text}
    </div>
  );
};
