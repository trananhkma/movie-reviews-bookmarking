import { combineReducers } from "redux";
import AuthReducer from "./auth";
import FolderReducer from "./folder";
import ReviewReducer from "./review";

export default combineReducers({
  reviewReducer: ReviewReducer,
  authReducer: AuthReducer,
  folderReducer: FolderReducer,
});
