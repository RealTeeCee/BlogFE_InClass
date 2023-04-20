import { createSelector } from "reselect";

const selectBlogReducer = (state) => state.blogs;

export const selectBlogs = createSelector(
  [selectBlogReducer],
  (blogSlice) => blogSlice.blogs
);

export const selectBlogIsFetching = createSelector(
  [selectBlogReducer],
  (blogSlice) => blogSlice.isFetching
);

export const selectBlogIsSuccess = createSelector(
  [selectBlogReducer],
  (blogSlice) => blogSlice.isSuccess
);

export const selectBlogError = createSelector(
  [selectBlogReducer],
  (blogSlice) => blogSlice.error
);
