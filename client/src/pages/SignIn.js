import React, { useState } from "react";
import { authLogin } from "../actions/actions";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { Loader } from "../components/Loader";
import signInImg from "../assets/images/5273.jpg";

export const SignIn = () => {
  const [form, setForm] = useState({
    username: "",
    password: "",
  });
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);
  const navigate = useNavigate();

  if (auth.token) {
    navigate("/tasks");
  }
  const changeHandler = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(authLogin(form.username, form.password, navigate));
    setForm({
      username: "",
      password: "",
    });
  };
  return (
    <>
      <div className="d-flex align-items-center justify-content-around flex-lg-row flex-md-column flex-sm-column flex-column">
        <div className="col-sm-12 col-md-10 col-lg-5">
          <img src={signInImg} alt="" className="img-fluid" />
        </div>
        <div className="col-10 col-sm-12 col-md-10 col-lg-5">
          <h1 className="text-center display-5">Sign In</h1>
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
              Log In
            </button>
            <p className="text-muted mt-2">
              Don't have an account? You can register here
              <Link to="/account/signup" className="btn-link ms-2">
                Sign Up
              </Link>
            </p>
          </form>
        </div>
      </div>
    </>
  );
};
