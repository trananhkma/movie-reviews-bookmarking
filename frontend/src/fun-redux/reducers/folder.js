import { toast } from "react-toastify";
import TYPE from "../actions";

import {
  CREATE_FOLDER_FAILED,
  CREATE_FOLDER_SUCCESS,
  DEFAULT_ERROR,
} from "../messages";

const initialState = { folders: [], loading: false };

const FolderReducer = (state = initialState, action) => {
  switch (action.type) {
    case TYPE.GET_FOLDER_REQUESTING:
      return {
        ...state,
        loading: true,
      };
    case TYPE.GET_FOLDER_SUCCESS:
      state.folders = action.data;
      return {
        ...state,
        loading: false,
      };
    case TYPE.GET_FOLDER_FAILED:
      toast.error(DEFAULT_ERROR);
      return {
        ...state,
        loading: false,
        error: "Unexpected API error!",
      };

    case TYPE.CREATE_FOLDER_REQUESTING:
      return {
        ...state,
        loading: true,
      };
    case TYPE.CREATE_FOLDER_SUCCESS:
      toast.success(CREATE_FOLDER_SUCCESS);
      return {
        ...state,
        loading: false,
        folders: [action.data, ...state.folders],
      };
    case TYPE.CREATE_FOLDER_FAILED:
      toast.error(CREATE_FOLDER_FAILED);
      return {
        ...state,
        loading: false,
      };

    default:
      return state;
  }
};

export default FolderReducer;
