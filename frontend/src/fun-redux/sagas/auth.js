import { call, put, takeLatest } from "redux-saga/effects";
import { signIn, signUp } from "../../requests";

import TYPE from "../actions";

function* signInFlow(action) {
  try {
    const response = yield call(signIn, action.data);
    if (response.status === 200) {
      yield put({
        type: TYPE.SIGN_IN_SUCCESS,
        data: response.data,
        setToken: action.setToken,
        username: action.data.username,
      });
    } else {
      yield put({
        type: TYPE.SIGN_IN_FAILED,
        data: response.response.data,
      });
    }
  } catch (error) {
    console.log("Unexpected API error!");
    console.log(error);
    yield put({ type: TYPE.SIGN_IN_FAILED, error: error.response.data });
  }
}

function* signUpFlow(action) {
  try {
    const response = yield call(signUp, action.data);
    if (response.status === 201) {
      yield put({
        type: TYPE.SIGN_UP_SUCCESS,
        data: response.data,
      });
    } else {
      yield put({
        type: TYPE.SIGN_UP_FAILED,
        data: response.response.data,
      });
    }
  } catch (error) {
    console.log("Unexpected API error!");
    console.log(error);
    yield put({ type: TYPE.SIGN_UP_FAILED, error: error.response.data });
  }
}

function* AuthWatcher() {
  yield takeLatest(TYPE.SIGN_IN_REQUESTING, signInFlow);
  yield takeLatest(TYPE.SIGN_UP_REQUESTING, signUpFlow);
}

export default AuthWatcher;
