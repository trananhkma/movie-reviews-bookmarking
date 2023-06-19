import { call, put, takeLatest } from "redux-saga/effects";
import { createFolder, getFolders } from "../../requests";

import TYPE from "../actions";

function* getFoldersFlow() {
  try {
    const response = yield call(getFolders);
    if (response.status === 200) {
      yield put({
        type: TYPE.GET_FOLDER_SUCCESS,
        data: response.data,
      });
    } else {
      yield put({
        type: TYPE.GET_FOLDER_FAILED,
        data: response.response.data,
      });
    }
  } catch (error) {
    console.log("Unexpected API error!");
    console.log(error);
    yield put({
      type: TYPE.GET_FOLDER_FAILED,
      error: error.response.data,
    });
  }
}

function* createFoldersFlow(action) {
  try {
    const response = yield call(createFolder, action.data);
    if (response.status === 201) {
      yield put({
        type: TYPE.CREATE_FOLDER_SUCCESS,
        data: response.data,
      });
    } else {
      yield put({
        type: TYPE.CREATE_FOLDER_FAILED,
        data: response.response.data,
      });
    }
  } catch (error) {
    console.log("Unexpected API error!");
    console.log(error);
    yield put({
      type: TYPE.CREATE_FOLDER_FAILED,
      error: error.response.data,
    });
  }
}

function* FolderWatcher() {
  yield takeLatest(TYPE.GET_FOLDER_REQUESTING, getFoldersFlow);
  yield takeLatest(TYPE.CREATE_FOLDER_REQUESTING, createFoldersFlow);
}

export default FolderWatcher;
