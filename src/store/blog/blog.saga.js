import { all, call, delay, put, takeLatest } from "redux-saga/effects";
import client from "../../api/client";

import { BLOG_ACTION_TYPES } from "./blog.types";

import {
  fetchBlogSuccess,
  fetchBlogFailed,
  deleteBlogSuccess,
  deleteBlogFailed,
  insertBlogSuccess,
  insertBlogFailed,
} from "./blog.action";

const getBlogs = async ({ pageNo, pageSize = 10 }) => {
  const resp = await client.get(`/blogs?pageNo=${pageNo}&pageSize=${pageSize}`);
  return resp;
};

const insertBlogs = async (blog) => {
  const resp = await client({
    method: "POST",
    url: "blogs/add",
    data: blog,
  });
  return resp;
};

const deleteBlogs = async (blog) => {
  const resp = await client({
    method: "DELETE",
    url: "blogs/delete",
    data: blog,
  });

  return resp;
};

function* fetchBlogAsync({ payload }) {
  try {
    yield delay(300);
    const resp = yield call(getBlogs, payload);
    const {
      empty,
      first,
      last,
      numberOfElements,
      totalElements,
      totalPages,
      content,
      number,
    } = resp.data;
    yield put(
      fetchBlogSuccess({
        empty,
        first,
        last,
        numberOfElements,
        totalElements,
        totalPages,
        data: content,
        number,
      })
    );
  } catch (error) {
    yield put(fetchBlogFailed(error));
  }
}

function* deleteBlogAsync({ payload }) {
  try {
    yield call(deleteBlogs, payload);
    yield put(deleteBlogSuccess(payload));
  } catch (error) {
    yield put(deleteBlogFailed(error));
  }
}

function* insertBlogAsync({ payload }) {
  try {
    const resp = yield call(insertBlogs, payload);

    yield put(insertBlogSuccess(resp.data));
  } catch (error) {
    yield put(insertBlogFailed(error.response.data));
  }
}

export function* onFecthBlogs() {
  yield takeLatest(BLOG_ACTION_TYPES.FETCH_BLOG_START, fetchBlogAsync);
}

export function* onDeleteBlogs() {
  yield takeLatest(BLOG_ACTION_TYPES.DELETE_BLOG_START, deleteBlogAsync);
}

export function* onInsertBlogs() {
  yield takeLatest(BLOG_ACTION_TYPES.INSERT_BLOG_START, insertBlogAsync);
}

export function* blogsSaga() {
  yield all([call(onFecthBlogs), call(onDeleteBlogs), call(onInsertBlogs)]);
}
