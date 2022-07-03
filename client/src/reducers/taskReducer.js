import {
  ADD_TASK,
  GET_TASKS,
  DELETE_TASK,
  DONE_TASK,
  EDIT_TASK,
} from "../types";

const initialState = {
  tasks: [],
};

export const taskReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_TASK:
      return { ...state, tasks: [...state.tasks, action.payload] };
    case GET_TASKS:
      return { ...state, tasks: action.payload };
    case DELETE_TASK:
      return {
        ...state,
        tasks: [...state.tasks.filter((task) => task.id !== action.id)],
      };
    case DONE_TASK:
      return {
        ...state,
        tasks: [
          action.payload,
          ...state.tasks.filter((task) => task.id !== action.id),
        ],
      };
    case EDIT_TASK:
      return {
        ...state,
        tasks: [
          action.payload,
          ...state.tasks.filter((task) => task.id !== action.id),
        ],
      };
    default:
      return state;
  }
};
