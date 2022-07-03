import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { showAlert, getTasks, deleteTask, doneTask } from "../actions/actions";
import { useDispatch, useSelector } from "react-redux";
import loginImg from "../assets/images/5270.jpg";

export const Tasks = () => {
  const auth = useSelector((state) => state.auth);
  const tasks = useSelector((state) => state.tasks.tasks);
  const dispatch = useDispatch();
  useEffect(() => {
    if (auth.token) {
      dispatch(getTasks());
    }
  }, [auth.token]);
  return (
    <>
      {auth.token ? (
        <>
          <h1 className="text-center display-5 mt-4">Tasks</h1>
          <div className="text-center mb-4">
            <button
              className="btn btn-sm btn-success me-2"
              onClick={() =>
                dispatch(showAlert("success", "Success text!", "Wow!!"))
              }
            >
              Show alert success
            </button>
            <button
              className="btn btn-sm btn-warning"
              onClick={() =>
                dispatch(showAlert("warning", "Warning text!", "Wow!!"))
              }
            >
              Show alert warning
            </button>
          </div>
          <>
            <ul>
              {tasks.length > 0 ? (
                tasks.map((task, index) => (
                  <div
                    className="card mb-2 flex-row align-items-center"
                    key={index}
                  >
                    <div
                      className="card-body"
                      style={
                        task.done
                          ? { textDecoration: "line-through" }
                          : { textDecoration: "none" }
                      }
                    >
                      {index + 1}. {task.title} -
                      <span className="text-muted">{task.date}</span>
                    </div>
                    <div className="me-2">
                      <button
                        type="button"
                        className="btn btn-success"
                        onClick={() =>
                          dispatch(doneTask(task.id, { done: !task.done }))
                        }
                        disabled={task.done ? true : false}
                        data-bs-toggle="tooltip"
                        data-bs-placement="top"
                        title="Tooltip on top"
                      >
                        <i className="bi bi-check2-square"></i>
                      </button>
                      <Link
                        to={`/edit-task/${task.id}`}
                        className={
                          task.done
                            ? "btn btn-warning ms-2 disabled"
                            : "btn btn-warning ms-2"
                        }
                      >
                        <i className="bi bi-pencil"></i>
                      </Link>
                      <button
                        className="btn btn-danger ms-2"
                        onClick={() => dispatch(deleteTask(task.id))}
                      >
                        <i className="bi bi-trash3-fill"></i>
                      </button>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center">
                  <h1 className="text-center display-5 mt-4">
                    There are no tasks yet! Create your first task!
                  </h1>
                  <Link to="/create-tasks" className="btn btn-lg btn-info mt-2">
                    Create first task
                  </Link>
                </div>
              )}
            </ul>
          </>
        </>
      ) : (
        <>
          <div className="text-center">
            <img src={loginImg} alt="img login" className="img-fluid" />
            <h6 className="text-center display-6">
              You need login to view your tasks!
            </h6>
            <Link className="btn btn-primary ms-3" to="/account/signin">
              Sign In
            </Link>
          </div>
        </>
      )}
    </>
  );
};
