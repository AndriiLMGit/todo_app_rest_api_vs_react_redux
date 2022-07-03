import { AUTH_START, AUTH_SUCCESS, AUTH_FAIL, AUTH_LOGOUT } from "../types";
import { updateObject } from "../utils";

const initialState = {
  loading: false,
  error: null,
  token: null,
  user: null,
};

export const authStart = (state, action) => {
  return updateObject(state, {
    loading: true,
    error: null,
  });
};

export const authSuccess = (state, action) => {
  return updateObject(state, {
    loading: false,
    token: action.token,
    user: action.user,
  });
};

export const authFail = (state, action) => {
  return updateObject(state, {
    loading: false,
    error: action.error,
  });
};

export const authLogout = (state, action) => {
  return updateObject(state, {
    loading: false,
    token: null,
    user: null,
  });
};

export const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case AUTH_START:
      return authStart(state, action);
    case AUTH_SUCCESS:
      return authSuccess(state, action);
    case AUTH_FAIL:
      return authFail(state, action);
    case AUTH_LOGOUT:
      return authLogout(state, action);
    default:
      return state;
  }
};
