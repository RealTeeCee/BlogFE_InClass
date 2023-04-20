import { BLOG_ACTION_TYPES } from "./blog.types";

export const fetchBlogStart = (pageNo, pageSize) => ({
  type: BLOG_ACTION_TYPES.FETCH_BLOG_START,
  payload: { pageNo, pageSize },
});

export const fetchBlogSuccess = (blogs) => ({
  type: BLOG_ACTION_TYPES.FETCH_BLOG_SUCCESS,
  payload: blogs,
});

export const fetchBlogFailed = (error) => ({
  type: BLOG_ACTION_TYPES.FETCH_BLOG_FAILED,
  payload: error,
});

export const insertBlogStart = (blog) => ({
  type: BLOG_ACTION_TYPES.INSERT_BLOG_START,
  payload: blog,
});

export const initialBlog = () => ({
  type: BLOG_ACTION_TYPES.INITIAL_BLOG_FORM,
});

export const insertBlogSuccess = (blog) => ({
  type: BLOG_ACTION_TYPES.INSERT_BLOG_SUCCESS,
  payload: blog,
});

export const insertBlogFailed = (error) => ({
  type: BLOG_ACTION_TYPES.INSERT_BLOG_FAILED,
  payload: error,
});

export const deleteBlogStart = (blog) => ({
  type: BLOG_ACTION_TYPES.DELETE_BLOG_START,
  payload: blog,
});

export const deleteBlogSuccess = (blog) => ({
  type: BLOG_ACTION_TYPES.DELETE_BLOG_SUCCESS,
  payload: blog,
});

export const deleteBlogFailed = (error) => ({
  type: BLOG_ACTION_TYPES.DELETE_BLOG_FAILED,
  payload: error,
});
