import {
  Container,
  Grid,
  Paper,
  Card,
  CardContent,
  Typography,
  CardActions,
  Button,
  Stack,
  Pagination,
  CircularProgress,
} from "@mui/material";

import qs from "qs";
import { useEffect, useState } from "react";
import client from "../api/client";
import { useNavigate } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import { selectBlogIsFetching, selectBlogs } from "../store/blog/blog.selector";
import { deleteBlogStart, fetchBlogStart } from "../store/blog/blog.action";

const BlogList = () => {
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const blogs = useSelector(selectBlogs);
  console.log(blogs);
  const isFetching = useSelector(selectBlogIsFetching);

  useEffect(() => {
    dispatch(fetchBlogStart(0, 10));
  }, [dispatch]);

  const handleChangePage = async (_e, page) => {
    dispatch(fetchBlogStart(page - 1, 10));
  };

  const handleDelete = async (blog) => {
    console.log(blog);
    dispatch(deleteBlogStart(blog));
  };

  const handleClick = () => {
    navigate("/blog/create");
  };

  const handleEdit = (blog) => {
    navigate("/blog/edit", { state: { blog } });
  };

  return (
    <Container>
      <Paper sx={{ padding: "10px" }}>
        {isFetching ? (
          <CircularProgress />
        ) : (
          <Grid container spacing={3}>
            <Grid item md={12} xs={12}>
              <Typography variant="h3" align="center">
                My Blogs
              </Typography>
            </Grid>
            <Grid item md={12} xs={12}>
              <Button variant="contained" onClick={handleClick} color="success">
                Create Blog
              </Button>
            </Grid>
            {blogs.data?.map((item) => (
              <Grid item md={4} xs={12} key={item.blogId}>
                <Card>
                  <CardContent>
                    <Typography gutterBottom variant="h5">
                      {item.title}
                    </Typography>
                    <Typography gutterBottom variant="p">
                      {item.url}
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button onClick={() => handleEdit(item)}>EDIT</Button>
                    <Button onClick={() => handleDelete(item)}>DELETE</Button>
                  </CardActions>
                </Card>
              </Grid>
            ))}

            {!blogs.empty ? (
              <Grid item md={12} xs={12}>
                <Stack>
                  <Pagination
                    count={blogs.totalPages}
                    page={blogs.number + 1}
                    onChange={handleChangePage}
                  ></Pagination>
                </Stack>
              </Grid>
            ) : null}
          </Grid>
        )}
      </Paper>
    </Container>
  );
};

export default BlogList;
