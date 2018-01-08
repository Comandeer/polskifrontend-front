import * as constants from '../constants';

export function feedbackTextChanged(value) {
  return {
    type: constants.FEEDBACK_TEXT_CHANGED,
    payload: {
      value
    }
  };
}

export function feedbackEmailChanged(value) {
  return {
    type: constants.FEEDBACK_EMAIL_CHANGED,
    payload: {
      value
    }
  };
}

export function feedbackCaptchaChanged(value) {
  return {
    type: constants.FEEDBACK_CAPTCHA_CHANGED,
    payload: {
      value
    }
  };
}

export function feedbackSend(email, feedback) {
  return {
    type: constants.FEEDBACK_SEND,
    payload: {
      email,
      feedback
    }
  };
}

export function feedbackStateReset() {
  return {
    type: constants.FEEDBACK_STATE_RESET
  };
}
