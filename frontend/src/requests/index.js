import axios from "axios";
import { getToken } from "../utils";
import { API_URL, METHOD } from "./const";

const { get, post, put, del } = METHOD;

const mainInstance = axios.create({
  baseURL: process.env.REACT_APP_API_ENDPOINT,
});

mainInstance.interceptors.request.use((request) => {
  const token = getToken();
  if (token) {
    request.headers.Authorization = `Token ${token}`;
  }
  return request;
});

// By default, Axios treats all status codes outside of 2xx as error and catch them.
// We need this to handle 4xx error manually
mainInstance.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    if (error.status >= 500) return Promise.reject(error);
    return error;
  }
);

function CallApi(url, method, data = null) {
  console.log(`Calling api: ${method} ${url}`);
  console.log(`Request body: ${data}`);
  return mainInstance({ url: url, method: method, data: data });
}

// Review APIs
export function getPublicReviews(query = "", offset = 0) {
  let url = `${API_URL.publicReview}?query=${query}&offset=${offset}`;
  return CallApi(url, get);
}
export function getUserReview() {
  return CallApi(API_URL.review, get);
}
export function createReview(data) {
  return CallApi(API_URL.review, post, data);
}
export function deleteReview(id) {
  return CallApi(API_URL.review + id, del);
}

// Auth APIs
export function signIn(data) {
  return CallApi(API_URL.signIn, post, data);
}
export function signUp(data) {
  return CallApi(API_URL.register, post, data);
}

// Folder APIs
export function getFolders() {
  return CallApi(API_URL.folder, get);
}
export function createFolder(data) {
  return CallApi(API_URL.folder, post, data);
}
export function deleteFolder(id) {
  return CallApi(API_URL.folder + id, del);
}
