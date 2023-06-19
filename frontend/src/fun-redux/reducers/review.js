import { toast } from "react-toastify";
import TYPE from "../actions";
import {
  CREATE_REVIEW_SUCCESS,
  DEFAULT_ERROR,
  DELETE_REVIEW_SUCCESS,
} from "../messages";

const initialState = {
  reviews: [],
  loading: false,
  createdReview: null,
  deletedReview: null,
  userReviews: [],
};

const ReviewReducer = (state = initialState, action) => {
  switch (action.type) {
    case TYPE.GET_PUBLIC_REVIEW_REQUESTING:
      return {
        ...state,
        loading: true,
      };
    case TYPE.GET_PUBLIC_REVIEW_SUCCESS:
      let data = action.data;
      if (action.loadMore) {
        data = [...state.reviews, ...action.data];
      }
      return {
        ...state,
        loading: false,
        reviews: data,
      };
    case TYPE.GET_PUBLIC_REVIEW_FAILED:
      if (action.error) {
        toast.error(DEFAULT_ERROR);
      } else {
        toast.error(action.data.detail);
      }
      return {
        ...state,
        loading: false,
      };
    case TYPE.CREATE_REVIEW_REQUESTING:
      return {
        ...state,
        loading: true,
      };
    case TYPE.CREATE_REVIEW_SUCCESS:
      toast.success(CREATE_REVIEW_SUCCESS);
      return {
        ...state,
        loading: false,
        createdReview: action.data,
      };
    case TYPE.CREATE_REVIEW_FAILED:
      toast.error(DEFAULT_ERROR);
      return {
        ...state,
        loading: false,
        createdReview: action.data,
      };
    case TYPE.DELETE_REVIEW_SUCCESS:
      toast.success(DELETE_REVIEW_SUCCESS);
      return {
        ...state,
        deletedReview: action.data,
      };
    case TYPE.DELETE_REVIEW_FAILED:
      toast.error(DEFAULT_ERROR);
      return {
        ...state,
        deletedReview: action.data,
      };
    case TYPE.GET_USER_REVIEW_SUCCESS:
      return {
        ...state,
        userReviews: action.data,
      };

    default:
      return state;
  }
};

export default ReviewReducer;
