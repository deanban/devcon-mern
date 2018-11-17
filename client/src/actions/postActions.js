import axios from "axios";
import {
  GET_POSTS,
  GET_POST,
  ADD_POST,
  DELETE_POST,
  GET_ERRORS,
  POST_LOADING
} from "./types";

export const addPost = postData => dispatch => {
  axios
    .post("/api/posts", postData)
    .then(res =>
      dispatch({
        type: ADD_POST,
        payload: res.data
      })
    )
    .catch(err => {
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      });
    });
};

export const deletePost = id => dispatch => {
  axios
    .delete(`/api/posts/${id}`, id)
    .then(res =>
      dispatch({
        type: DELETE_POST,
        payload: id
      })
    )
    .catch(err => {
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      });
    });
};

export const getPosts = () => dispatch => {
  dispatch(setPostLoading());
  axios
    .get("/api/posts")
    .then(res =>
      dispatch({
        type: GET_POSTS,
        payload: res.data
      })
    )
    .catch(err => {
      dispatch({
        type: GET_POSTS,
        payload: null
      });
    });
};

//get single post
export const getPost = id => dispatch => {
  dispatch(setPostLoading());
  axios
    .get(`/api/posts/${id}`)
    .then(res =>
      dispatch({
        type: GET_POST,
        payload: res.data
      })
    )
    .catch(err => {
      dispatch({
        type: GET_POST,
        payload: null
      });
    });
};

export const addLike = id => dispatch => {
  axios
    .post(`/api/posts/like/${id}`, id)
    .then(res => dispatch(getPosts()))
    .catch(err => {
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      });
    });
};

export const removeLike = id => dispatch => {
  axios
    .post(`/api/posts/unlike/${id}`, id)
    .then(res => dispatch(getPosts()))
    .catch(err => {
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      });
    });
};

//add comment
export const addComment = (postId, commentData) => dispatch => {
  axios
    .post(`/api/posts/comment/${postId}`, commentData)
    .then(res =>
      dispatch({
        type: GET_POST,
        payload: res.data
      })
    )
    .catch(err => {
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      });
    });
};

//set loading
export const setPostLoading = () => {
  return {
    type: POST_LOADING
  };
};
