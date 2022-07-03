import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addTask, showAlert } from "../actions/actions";
import { useNavigate } from "react-router-dom";

export const CreateTask = () => {
  const [form, setForm] = useState({
    title: "",
    owner: JSON.parse(localStorage.getItem("UserInfo")).user.id || null,
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const changeHandler = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const submitHandler = (e) => {
    e.preventDefault();

    if (form.title.length > 3) {
      const task = { title: form.title, owner: form.owner };
      dispatch(addTask(task));
      navigate("/tasks");
    } else {
      dispatch(
        showAlert("warning", "Task must be contains 3 more symbols", "Oops..")
      );
    }

    setForm({
      title: "",
      owner: JSON.parse(localStorage.getItem("UserInfo")).user.id || null,
    });
  };
  return (
    <div className="col-8 mx-auto mt-5">
      <form onSubmit={submitHandler}>
        <div className="form-group">
          <label htmlFor="task" className="form-label mt-4">
            Create task here
          </label>
          <input
            type="text"
            name="title"
            value={form.title}
            onChange={changeHandler}
            className="form-control"
            id="task"
            aria-describedby="taskHelp"
            placeholder="Enter task"
          />
          <small id="taskHelp" className="form-text text-muted">
            You can press enter to submit your task too!
          </small>
        </div>
        <div className="mt-3">
          <button
            type="submit"
            className="btn btn-success"
            onClick={submitHandler}
          >
            <i className="bi bi-plus"></i>
            Create
          </button>
        </div>
      </form>
    </div>
  );
};
