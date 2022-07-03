import React, { useState } from "react";
import { authSignup } from "../actions/actions";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { Loader } from "../components/Loader";
import signUpImg from "../assets/images/5272.jpg";

export const SignUp = () => {
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
  });
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);
  const navigate = useNavigate();

  const changeHandler = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(authSignup(form.username, form.email, form.password, navigate));
    setForm({
      username: "",
      email: "",
      password: "",
    });
  };

  return (
    <>
      <div className="d-flex align-items-center justify-content-around flex-lg-row flex-md-column flex-sm-column flex-column">
        <div className="col-10 col-sm-12 col-md-10 col-lg-5">
          <img src={signUpImg} alt="" className="img-fluid" />
        </div>
        <div className="col-10 col-sm-12 col-md-10 col-lg-5">
          <h1 className="text-center display-5 mt-4">Sign Up</h1>
          <form onSubmit={submitHandler}>
            <div className="form-group">
              <label htmlFor="exampleInputUsername" className="form-label mt-4">
                Username
              </label>
              <input
                type="text"
                name="username"
                value={form.username}
                onChange={changeHandler}
                className="form-control"
                id="exampleInputUsername"
                placeholder="Username"
              />
              <small id="usernameHelp" className="form-text text-muted">
                We'll never share your email with anyone else.
              </small>
            </div>
            <div className="form-group">
              <label htmlFor="exampleInputEmail1" className="form-label mt-4">
                Email address
              </label>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={changeHandler}
                className="form-control"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
                placeholder="Enter email"
              />
              <small id="emailHelp" className="form-text text-muted">
                We'll never share your email with anyone else.
              </small>
            </div>
            <div className="form-group">
              <label
                htmlFor="exampleInputPassword1"
                className="form-label mt-4"
              >
                Password
              </label>
              <input
                type="password"
                name="password"
                value={form.password}
                onChange={changeHandler}
                className="form-control"
                id="exampleInputPassword1"
                placeholder="Password"
              />
              <small id="emailHelp" className="form-text text-muted">
                We'll never share your email with anyone else.
              </small>
            </div>
            <button
              type="submit"
              className="btn btn-primary mt-4"
              onClick={submitHandler}
              disabled={auth.loading}
            >
              {auth.loading ? (
                <Loader />
              ) : (
                <i className="bi bi-check2 me-1"></i>
              )}
              Sign Up
            </button>
            <p className="text-muted mt-2">
              Already have an account? You can login here{" "}
              <Link to="/account/signin" className="btn-link">
                Sign In
              </Link>
            </p>
          </form>
        </div>
      </div>
    </>
  );
};
