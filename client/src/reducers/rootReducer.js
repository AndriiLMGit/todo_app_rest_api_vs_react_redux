import { combineReducers } from "redux";
import { appReducer } from "./appReducer";
import { authReducer } from "./authReducer";
import { counterReducer } from "./counterReducer";
import { taskReducer } from "./taskReducer";

export const rootReducer = combineReducers({
  counter: counterReducer,
  app: appReducer,
  auth: authReducer,
  tasks: taskReducer,
});
