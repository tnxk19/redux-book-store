import React, { useEffect } from "react";
import {
  Container,
  Button,
  Box,
  Grid,
  Stack,
  Typography,
} from "@mui/material";

import { ClipLoader } from "react-spinners";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";

import { useDispatch, useSelector } from "react-redux";

import { getBookDetail } from "../service/bookDetailSlice";
import { addFavorite } from "../service/favoriteSlice";

const BACKEND_API = process.env.REACT_APP_BACKEND_API;

const BookDetailPage = () => {
  const dispatch = useDispatch();

  const { id } = useParams();

  const { book, loading, error } = useSelector(
    (state) => state.bookDetail
  );

  useEffect(() => {
    dispatch(getBookDetail(id));
  }, [dispatch, id]);

  useEffect(() => {
    if (error) {
      toast.error(error);
    }
  }, [error]);

  const handleAddReadingList = async () => {
    await dispatch(addFavorite(book));
    toast.success("The book has been added to the reading list!");
  };

  if (loading) {
    return (
      <Box textAlign="center">
        <ClipLoader size={150} />
      </Box>
    );
  }

  return (
    <Container>
      {book && (
        <Grid
          container
          spacing={2}
          p={4}
          mt={5}
          sx={{ border: "1px solid black" }}
        >
          <Grid item md={4}>
            <img
              width="100%"
              src={`${BACKEND_API}/${book.imageLink}`}
              alt={book.title}
            />
          </Grid>

          <Grid item md={8}>
            <Stack spacing={1}>
              <Typography variant="h4">
                {book.title}
              </Typography>

              <Typography>
                <strong>Author:</strong> {book.author}
              </Typography>

              <Typography>
                <strong>Year:</strong> {book.year}
              </Typography>

              <Typography>
                <strong>Country:</strong> {book.country}
              </Typography>

              <Typography>
                <strong>Pages:</strong> {book.pages}
              </Typography>

              <Typography>
                <strong>Language:</strong> {book.language}
              </Typography>

              <Button
                variant="outlined"
                sx={{ width: "fit-content" }}
                onClick={handleAddReadingList}
              >
                Add to Reading List
              </Button>
            </Stack>
          </Grid>
        </Grid>
      )}
    </Container>
  );
};

export default BookDetailPage;