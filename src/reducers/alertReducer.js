import { DISPLAY_ALERT, HIDE_ALERT } from "../types";

// Cada reducer tiene su state

const initialState = {
  alert: null,
};

// eslint-disable-next-line import/no-anonymous-default-export
export default function (state = initialState, action) {
  switch (action.type) {
    case DISPLAY_ALERT:
      return {
        ...state,
        alert: action.payload,
      };
    case HIDE_ALERT:
      return {
        ...state,
        alert: null,
      };

    default:
      return state;
  }
}
