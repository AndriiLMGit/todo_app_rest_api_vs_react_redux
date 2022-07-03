import React from "react";
import { CreateTask } from "../components/CreateTask";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import createTask from "../assets/images/5271.jpg";

export const CreateTasks = () => {
  const auth = useSelector((state) => state.auth);
  return (
    <>
      {auth.token ? (
        <>
          <h1 className="text-center display-5 mt-4">
            You can create your own tasks
          </h1>
          <CreateTask />
        </>
      ) : (
        <>
          <div className="text-center">
            <img
              src={createTask}
              alt="Create Task Image"
              className="img-fluid"
            />
          </div>
          <h6 className="text-center display-6">
            You need login to create your tasks!
          </h6>
          <p className="text-center">
            <Link className="btn btn-primary ms-3" to="/account/signin">
              Sign In
            </Link>
          </p>
        </>
      )}
    </>
  );
};
