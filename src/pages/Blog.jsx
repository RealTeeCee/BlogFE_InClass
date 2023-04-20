import {
  Alert,
  AlertTitle,
  Button,
  Container,
  Grid,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import client from "../api/client";
import { useDispatch, useSelector } from "react-redux";
import { initialBlog, insertBlogStart } from "../store/blog/blog.action";
import {
  selectBlogError,
  selectBlogIsFailed,
  selectBlogIsSuccess,
} from "../store/blog/blog.selector";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";

const schema = yup.object().shape({
  blogId: yup
    .number()
    .typeError("BlogId must be a Number")
    .min(1)
    .required("BlogId must be required"),
  title: yup
    .string()
    .typeError("Title must be a String")
    .required("Title must be required"),
  url: yup
    .string()
    .typeError("Url must be a String")
    .required("Url must be required"),
  //rating: yup.number().required(),
});

const Blog = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { setValue, getValues, register, formState, handleSubmit } = useForm({
    resolver: yupResolver(schema),
  });

  const isEdit = location.state?.blog.blogId ? true : false;
  const initalBlog = {
    blogId: "",
    title: "",
    url: "",
  };
  const isSuccess = useSelector(selectBlogIsSuccess);
  const error = useSelector(selectBlogError);
  console.log(error);

  const [blog, setBlog] = useState(isEdit ? location.state?.blog : initalBlog);

  const handleChange = (event) => {
    setBlog((prev) => ({
      ...prev,
      [event.target.name]:
        event.target.type === "checkbox"
          ? event.target.checked
          : event.target.value,
    }));
  };

  // useEffect(() => {
  //   schema
  //     .validate(blog)
  //     .then((res) => console.log(res))
  //     .catch((err) => {
  //       console.log({ name: err.name, error: err.errors });
  //     });
  // }, [blog]);

  const handleAdd = (data, event) => {
    console.log(data);
    dispatch(insertBlogStart(data));
    console.log(isSuccess);
    if (isSuccess) {
      alert("Insert blog successfully!");
      navigate(-1);
    }
  };

  const handleEdit = async () => {
    const res = await client.put("/blogs/update", blog);
    try {
      if (res.status === 200) {
        alert("Edit blog successfully!!!");
        navigate("/");
      }
    } catch (error) {
      alert("Edit blog fail!!!");
    }
  };

  useEffect(() => {
    dispatch(initialBlog());
  }, [dispatch]);
  return (
    <Container>
      <Paper sx={{ padding: "20px" }}>
        {error !== "" ? (
          <Alert severity="error">
            <AlertTitle>Error</AlertTitle>
            Insert Blog — <strong>Failed!</strong>
          </Alert>
        ) : (
          isSuccess && (
            <Alert severity="success">
              <AlertTitle>Success</AlertTitle>
              Insert Blog — <strong>Successfully!</strong>
            </Alert>
          )
        )}
        <form onSubmit={handleSubmit(handleAdd)}>
          <Grid container spacing={3}>
            <Grid item md={12} xs={12} mt={5}>
              <Typography align="center" variant="h4">
                {isEdit ? "Edit Blog" : "Create Blog"}
              </Typography>
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField
                // name="blogId"
                {...register("blogId")}
                label="Id"
                fullWidth
                size="small"
                defaultValue={getValues("blogId")}
                onChange={(e) => setValue("blogId", e.target.value)}
                disabled={isEdit ?? false}
                error={formState.errors.blogId !== undefined}
                helperText={formState.errors?.blogId?.message}
              />
              {
                // formState.errors.blogId && (
                // <div className="text-danger">
                //   {formState.errors.blogId.message}
                // </div>
                //   )
              }
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField
                // name="title"
                {...register("title")}
                label="Title"
                fullWidth
                size="small"
                defaultValue={getValues("title")}
                onChange={(e) => setValue("title", e.target.value)}
                error={formState.errors.title !== undefined}
                helperText={formState.errors?.title?.message}
              />
            </Grid>
            <Grid item md={12} xs={12}>
              <TextField
                // name="url"
                {...register("url")}
                label="Url"
                fullWidth
                size="small"
                defaultValue={getValues("url")}
                onChange={(e) => setValue("url", e.target.value)}
                error={formState.errors.url !== undefined}
                helperText={formState.errors?.url?.message}
              />
            </Grid>
            <Grid item md={12} xs={12} textAlign={"center"}>
              <Button variant="contained" type="submit">
                Save
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Container>
  );
};

export default Blog;
