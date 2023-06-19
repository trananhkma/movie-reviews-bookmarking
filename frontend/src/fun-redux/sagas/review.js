import { call, put, takeLatest } from "redux-saga/effects";
import {
  createReview,
  deleteReview,
  getPublicReviews,
  getUserReview,
} from "../../requests";

import TYPE from "../actions";

function* getPublicReviewsFlow(action) {
  try {
    const response = yield call(getPublicReviews, action.query, action.offset);
    if (response.status === 200) {
      yield put({
        type: TYPE.GET_PUBLIC_REVIEW_SUCCESS,
        data: response.data,
        loadMore: action.loadMore,
      });
    } else {
      yield put({
        type: TYPE.GET_PUBLIC_REVIEW_FAILED,
        data: response.response.data,
      });
    }
  } catch (error) {
    console.log("Unexpected API error!");
    console.log(error);
    yield put({
      type: TYPE.GET_PUBLIC_REVIEW_FAILED,
      error: error.response.data,
    });
  }
}
function* getUserReviewsFlow() {
  try {
    const response = yield call(getUserReview);
    if (response.status === 200) {
      yield put({
        type: TYPE.GET_USER_REVIEW_SUCCESS,
        data: response.data,
      });
    } else {
      yield put({
        type: TYPE.GET_USER_REVIEW_FAILED,
        data: response.response.data,
      });
    }
  } catch (error) {
    console.log("Unexpected API error!");
    console.log(error);
    yield put({
      type: TYPE.GET_USER_REVIEW_FAILED,
      error: error.response.data,
    });
  }
}

function* createReviewFlow(action) {
  try {
    const response = yield call(createReview, action.data);
    if (response.status === 201) {
      yield put({
        type: TYPE.CREATE_REVIEW_SUCCESS,
        data: response.data,
      });
    } else {
      yield put({
        type: TYPE.CREATE_REVIEW_FAILED,
        data: response.response.data,
      });
    }
  } catch (error) {
    console.log("Unexpected API error!");
    console.log(error);
    yield put({
      type: TYPE.CREATE_REVIEW_FAILED,
      error: error.response.data,
    });
  }
}

function* deleteReviewFlow(action) {
  try {
    const response = yield call(deleteReview, action.id);
    if (response.status === 204) {
      yield put({
        type: TYPE.DELETE_REVIEW_SUCCESS,
        data: action.id,
      });
    } else {
      yield put({
        type: TYPE.CREATE_REVIEW_FAILED,
        data: response.response.data,
      });
    }
  } catch (error) {
    console.log("Unexpected API error!");
    console.log(error);
    yield put({
      type: TYPE.DELETE_REVIEW_FAILED,
      error: error.response.data,
    });
  }
}

function* ReviewWatcher() {
  yield takeLatest(TYPE.GET_PUBLIC_REVIEW_REQUESTING, getPublicReviewsFlow);
  yield takeLatest(TYPE.GET_USER_REVIEW_REQUESTING, getUserReviewsFlow);
  yield takeLatest(TYPE.CREATE_REVIEW_REQUESTING, createReviewFlow);
  yield takeLatest(TYPE.DELETE_REVIEW_REQUESTING, deleteReviewFlow);
}

export default ReviewWatcher;
