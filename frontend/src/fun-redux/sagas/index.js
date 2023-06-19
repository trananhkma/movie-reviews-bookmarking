import { all } from "redux-saga/effects";
import AuthWatcher from "./auth";
import FolderWatcher from "./folder";
import ReviewWatcher from "./review";

export default function* rootSaga() {
  yield all([ReviewWatcher(), AuthWatcher(), FolderWatcher()]);
}
