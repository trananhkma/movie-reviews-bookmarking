import { toast } from "react-toastify";
import TYPE from "../actions";
import {
  DEFAULT_ERROR,
  LOGIN_FAILED,
  SIGNUP_FAILED,
  SIGNUP_SUCCESS,
} from "../messages";

const initialState = {
  loading: false,
  success: false,
  username: localStorage.getItem("username"),
};

const AuthReducer = (state = initialState, action) => {
  switch (action.type) {
    case TYPE.SIGN_IN_REQUESTING:
      return {
        ...state,
        loading: true,
      };
    case TYPE.SIGN_IN_SUCCESS:
      action.setToken(action.data);
      localStorage.setItem("username", action.username);
      return {
        ...state,
        loading: false,
        username: action.username,
      };
    case TYPE.SIGN_IN_FAILED:
      if (action.error) {
        toast.error(DEFAULT_ERROR);
        toast.error(action.error);
        return {
          ...state,
          loading: false,
        };
      }
      toast.error(LOGIN_FAILED);
      return {
        ...state,
        loading: false,
      };
    case TYPE.SIGN_UP_REQUESTING:
      return {
        ...state,
        loading: true,
      };
    case TYPE.SIGN_UP_SUCCESS:
      toast.success(SIGNUP_SUCCESS);
      return {
        ...state,
        loading: false,
        success: true,
      };
    case TYPE.SIGN_UP_FAILED:
      if (action.error) {
        toast.error(DEFAULT_ERROR);
        toast.error(action.error);
        return {
          ...state,
          loading: false,
        };
      }
      if (action.data.password) {
        action.data.password.map((e) => toast.error(e));
      } else if (action.data.detail) {
        toast.error(SIGNUP_FAILED);
      }
      return {
        ...state,
        loading: false,
      };
    case TYPE.SIGN_OUT:
      localStorage.clear();
      window.location.reload();
      return {
        ...state,
        username: null,
      };

    default:
      return state;
  }
};

export default AuthReducer;
