import React, { useEffect } from "react";
import { Outlet, Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { authLogout, authCheckState } from "../actions/actions";
import { Alert } from "./Alert";
import { Loader } from "./Loader";

export const Layout = () => {
  const navigate = useNavigate();
  const auth = useSelector((state) => state.auth);
  const alert = useSelector((state) => state.app.alert);
  const isAuthenticated = auth.token !== null;
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(authCheckState());
  }, []);
  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container-fluid">
          <Link to="/" className="navbar-brand" href="#">
            Todo App
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarColor03"
            aria-controls="navbarColor03"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarColor03">
            <ul className="navbar-nav me-auto">
              <li className="nav-item">
                <Link to="/" className="nav-link" href="#">
                  Home
                  <span className="visually-hidden">(current)</span>
                </Link>
              </li>
              <li className="nav-item">
                <Link to="about" className="nav-link" href="#">
                  About
                </Link>
              </li>
              <li className="nav-item">
                <Link to="features" className="nav-link" href="#">
                  Features
                </Link>
              </li>
              <li className="nav-item">
                <Link to="create-tasks" className="nav-link" href="#">
                  Create tasks
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="tasks">
                  Tasks
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/not-found" className="btn btn-link">
                  Not found page
                </Link>
              </li>
            </ul>
            <div>
              {isAuthenticated ? (
                <>
                  <Link to="#" className="btn ms-1">
                    Welcome, {auth.user.username}
                  </Link>
                  <button
                    className="btn btn-primary ms-1"
                    onClick={() => dispatch(authLogout(auth.token, navigate))}
                    disabled={auth.loading}
                  >
                    {auth.loading ? (
                      <Loader />
                    ) : (
                      <i className="bi bi-box-arrow-left me-1"></i>
                    )}
                    Log out
                  </button>
                </>
              ) : (
                <>
                  <Link to="account/signin" className="btn btn-outline-primary">
                    <i className="bi bi-box-arrow-in-right me-1"></i>
                    Sign In
                  </Link>
                  <Link to="account/signup" className="btn btn-primary ms-1">
                    <i className="bi bi-person-plus-fill me-1"></i>
                    Sign Up
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </nav>

      <div className="container">
        {alert && (
          <Alert type={alert.type} text={alert.text} prefix={alert.prefix} />
        )}
        <Outlet />
      </div>

      <footer className="py-3 my-4">
        <ul className="nav justify-content-center border-bottom pb-3 mb-3">
          <li className="nav-item">
            <a href="#" className="nav-link px-2 text-muted">
              Home
            </a>
          </li>
          <li className="nav-item">
            <a href="#" className="nav-link px-2 text-muted">
              Features
            </a>
          </li>
          <li className="nav-item">
            <a href="#" className="nav-link px-2 text-muted">
              Pricing
            </a>
          </li>
          <li className="nav-item">
            <a href="#" className="nav-link px-2 text-muted">
              FAQs
            </a>
          </li>
          <li className="nav-item">
            <a href="#" className="nav-link px-2 text-muted">
              About
            </a>
          </li>
        </ul>
        <p className="text-center text-muted">© 2021 Company, Inc</p>
      </footer>
    </>
  );
};
