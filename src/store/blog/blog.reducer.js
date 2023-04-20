import { BLOG_ACTION_TYPES } from "./blog.types";

const BLOG_INITIAL_STATE = {
  isFetching: false,
  isSuccess: false,
  error: "",
  blogs: {},
};

export const blogReducer = (state = BLOG_INITIAL_STATE, action = {}) => {
  const { type, payload } = action;
  switch (type) {
    case BLOG_ACTION_TYPES.FETCH_BLOG_START:
      return {
        ...state,
        isFetching: true,
      };
    case BLOG_ACTION_TYPES.INITIAL_BLOG_FORM:
      return {
        ...state,
        isFetching: false,
        isSuccess: false,
        error: "",
      };
    case BLOG_ACTION_TYPES.FETCH_BLOG_SUCCESS:
      return {
        ...state,
        isFetching: false,
        blogs: payload,
      };
    case BLOG_ACTION_TYPES.FETCH_BLOG_FAILED:
      return {
        ...state,
        isFetching: false,
        error: payload,
      };
    case BLOG_ACTION_TYPES.DELETE_BLOG_SUCCESS:
      const newBlogs = state.blogs.data.filter(
        (item) => item.blogId !== payload.blogId
      );
      return {
        ...state,
        blogs: {
          ...state.blogs,
          data: newBlogs,
        },
      };
    case BLOG_ACTION_TYPES.DELETE_BLOG_FAILED:
      return {
        ...state,
        error: payload,
      };
    case BLOG_ACTION_TYPES.INSERT_BLOG_START:
      return {
        ...state,
        isFetching: true,
        isSuccess: false,
      };
    case BLOG_ACTION_TYPES.INSERT_BLOG_SUCCESS:
      return {
        ...state,
        isFetching: false,
        isSuccess: true,
        blogs: { ...state.blogs, data: [...state.blogs.data, payload] },
        error: "",
      };
    case BLOG_ACTION_TYPES.INSERT_BLOG_FAILED:
      return {
        ...state,
        isFetching: false,
        isSuccess: false,
        error: payload,
      };
    default:
      return state;
  }
};
