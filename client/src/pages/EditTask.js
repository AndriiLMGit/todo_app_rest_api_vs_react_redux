import React, { useState, useCallback, useEffect } from "react";
import { editTask } from "../actions/actions";
import { useSelector, useDispatch } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";

export const EditTask = () => {
  const params = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const task = useSelector((state) =>
    state.tasks.tasks.find((task) => task.id == params.id)
  );

  const [form, setForm] = useState({
    title: task.title,
  });

  const changeHandler = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const submitHandler = (e, id, taskObj) => {
    e.preventDefault();
    dispatch(editTask((id = task.id), (taskObj = form)));
    setForm({
      title: "",
    });
    navigate("/tasks");
  };
  return (
    <>
      <h1 className="text-center display-5 mt-4">Edit task - {task.title}</h1>
      <div className="col-8 mx-auto mt-5">
        <form>
          <div className="form-group">
            <label htmlFor="task" className="form-label mt-4">
              Change task here
            </label>
            <input
              type="text"
              name="title"
              value={form.title}
              autoFocus={true}
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
              <i className="bi bi-pen me-1"></i>
              Change task
            </button>
          </div>
        </form>
      </div>
    </>
  );
};
