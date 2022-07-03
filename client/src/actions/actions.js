import {
  DECREMENT,
  INCREMENT,
  HIDE_ALERT,
  SHOW_ALERT,
  AUTH_START,
  AUTH_SUCCESS,
  AUTH_FAIL,
  AUTH_LOGOUT,
  ADD_TASK,
  GET_TASKS,
  DELETE_TASK,
  DONE_TASK,
  EDIT_TASK,
} from "../types";
import axios from "axios";

export const increment = () => {
  return {
    type: INCREMENT,
  };
};

export const decrement = () => {
  return {
    type: DECREMENT,
  };
};

export const showAlert = (type, text, prefix) => {
  return (dispatch) => {
    dispatch({
      type: SHOW_ALERT,
      payload: { type, text, prefix },
    });

    setTimeout(() => {
      dispatch(hideAlert());
    }, 5000);
  };
};

export const hideAlert = () => {
  return {
    type: HIDE_ALERT,
  };
};

// --- Actions AUTH ---

export const authStart = () => {
  return {
    type: AUTH_START,
  };
};

export const authSuccess = (token, user) => {
  return {
    type: AUTH_SUCCESS,
    token,
    user,
  };
};

export const authFail = (error) => {
  return {
    type: AUTH_FAIL,
    error,
  };
};

export const authLogout = (token, navigate) => {
  localStorage.removeItem("UserInfo");
  return (dispatch) => {
    axios
      .post("http://localhost:8000/api-auth/signout", null, {
        headers: {
          Authorization: `Token ${token}`,
        },
      })
      .then((res) => {
        dispatch(
          showAlert(
            "success",
            "You have been logged out succeessfully!",
            "Well done!"
          )
        );
        navigate("/account/signin");
      })
      .catch((err) => {
        dispatch(authFail(err));
      });
    dispatch({
      type: AUTH_LOGOUT,
    });
  };
};

export const authLogin = (username, password, navigate) => {
  return (dispatch) => {
    dispatch(authStart());
    axios
      .post("http://localhost:8000/api-auth/signin", { username, password })
      .then((res) => {
        localStorage.setItem("UserInfo", JSON.stringify(res.data));
        dispatch(authSuccess(res.data.token, res.data.user));
        dispatch(
          showAlert(
            "success",
            "You have been logged in succeessfully!",
            "Well done!"
          )
        );
        navigate("/tasks");
      })
      .catch((err) => {
        dispatch(authFail(err));
        dispatch(showAlert("danger", "Incorrect data", "Ohh..no"));
      });
  };
};

export const authSignup = (username, email, password, navigate) => {
  return async (dispatch) => {
    dispatch(authStart());
    axios
      .post("http://localhost:8000/api-auth/signup", {
        username,
        email,
        password,
      })
      .then((res) => {
        dispatch(authSuccess(null, null));
        dispatch(
          showAlert(
            "success",
            "You have been signed up succeessfully!",
            "Well done!"
          )
        );
        navigate("/account/signin");
      })
      .catch((err) => {
        dispatch(authFail(err));
        dispatch(showAlert("danger", "Something went wrong", "Ohh..no"));
      });
  };
};

export const authCheckState = () => {
  return (dispatch) => {
    try {
      const token = JSON.parse(localStorage.getItem("UserInfo")).token;
      const user = JSON.parse(localStorage.getItem("UserInfo")).user;
      if (!token) {
        dispatch(authLogout());
      } else {
        dispatch(authSuccess(token, user));
      }
    } catch (error) {}
  };
};

// --- Actions AUTH End ---

// --- Actions Tasks ----

function getState() {
  const token = JSON.parse(localStorage.getItem("UserInfo")).token;
  const user = JSON.parse(localStorage.getItem("UserInfo")).user;
  return { token, user };
}

export const addTask = (task) => (dispatch) => {
  axios
    .post("http://localhost:8000/task/create", task, {
      headers: {
        Authorization: `Token ${getState().token}`,
      },
    })
    .then((res) => {
      dispatch(
        showAlert("success", "Task has been added successfully!", "Well done!")
      );
      dispatch({
        type: ADD_TASK,
        payload: res.data,
      });
    })
    .catch((err) => {
      dispatch(authFail(err));
    });
};

export const getTasks = () => {
  return (dispatch) => {
    axios
      .get("http://localhost:8000/task/of_user", {
        headers: {
          Authorization: `Token ${getState().token}`,
        },
      })
      .then((res) => {
        dispatch({
          type: GET_TASKS,
          payload: res.data,
        });
      })
      .catch((err) => {
        dispatch(authFail(err));
      });
  };
};

export const deleteTask = (id) => {
  return (dispatch) => {
    axios
      .delete(`http://localhost:8000/task/change_or_delete/${id}`, {
        headers: {
          Authorization: `Token ${getState().token}`,
        },
      })
      .then((res) => {
        dispatch({
          type: DELETE_TASK,
          id: id,
        });
        dispatch(
          showAlert(
            "success",
            "Task has been deleted successfully!",
            "Well done!"
          )
        );
      })
      .catch((err) => {
        dispatch(authFail(err));
      });
  };
};

export const doneTask = (id, done) => {
  return (dispatch) => {
    axios
      .put(`http://localhost:8000/task/change_or_delete/${id}`, done, {
        headers: {
          Authorization: `Token ${getState().token}`,
        },
      })
      .then((res) => {
        dispatch({
          type: DONE_TASK,
          payload: res.data,
          id: id,
        });
        dispatch(
          showAlert("success", "Task has been done successfully!", "Well done!")
        );
      })
      .catch((err) => {
        dispatch(authFail(err));
      });
  };
};

export const editTask = (id, task) => {
  return (dispatch) => {
    axios
      .put(`http://localhost:8000/task/change_or_delete/${id}`, task, {
        headers: {
          Authorization: `Token ${getState().token}`,
        },
      })
      .then((res) => {
        dispatch({
          type: EDIT_TASK,
          payload: res.data,
          id: id,
        });
        dispatch(
          showAlert(
            "success",
            "Task has been changed successfully!",
            "Well done!"
          )
        );
      })
      .catch((err) => {
        dispatch(authFail(err));
      });
  };
};
