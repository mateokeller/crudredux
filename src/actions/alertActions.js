import { DISPLAY_ALERT, HIDE_ALERT } from "../types";

// Show alert

export function displayAlert(alert) {
  return (dispatch) => {
    dispatch(createAlert(alert));
  };
}

const createAlert = (alert) => ({
  type: DISPLAY_ALERT,
  payload: alert,
});

// hide alert

export function hideAlertAction() {
  return (dispatch) => {
    dispatch(hideAlert());
  };
}

const hideAlert = () => ({
  type: HIDE_ALERT,
});
