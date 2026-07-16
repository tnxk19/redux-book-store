import React, { useEffect } from "react";
import {
  Container,
  Button,
  Box,
  Card,
  Stack,
  CardMedia,
  CardActionArea,
  Typography,
  CardContent,
} from "@mui/material";
import { ClipLoader } from "react-spinners";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import { useDispatch, useSelector } from "react-redux";

import {
  getFavorites,
  removeFavorite,
} from "../service/favoriteSlice";

const BACKEND_API = process.env.REACT_APP_BACKEND_API;

const ReadingPage = () => {
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const { books, loading, error } = useSelector(
    (state) => state.favorite
  );

  useEffect(() => {
    dispatch(getFavorites());
  }, [dispatch]);

  useEffect(() => {
    if (error) {
      toast.error(error);
    }
  }, [error]);

  const handleClickBook = (bookId) => {
    navigate(`/books/${bookId}`);
  };

  const handleRemove = async (bookId) => {
    await dispatch(removeFavorite(bookId));

    toast.success("The book has been removed");
  };

  return (
    <Container>
      <Typography
        variant="h3"
        textAlign="center"
        m={3}
      >
        Book Store
      </Typography>

      {loading ? (
        <Box textAlign="center">
          <ClipLoader size={150} />
        </Box>
      ) : (
        <Stack
          direction="row"
          spacing={2}
          justifyContent="space-around"
          flexWrap="wrap"
        >
          {books.map((book) => (
            <Card
              key={book.id}
              sx={{
                width: "12rem",
                height: "27rem",
                mb: 2,
              }}
            >
              <CardActionArea>
                <CardMedia
                  component="img"
                  image={`${BACKEND_API}/${book.imageLink}`}
                  alt={book.title}
                  onClick={() =>
                    handleClickBook(book.id)
                  }
                />

                <CardContent>
                  <Typography
                    gutterBottom
                    variant="h5"
                  >
                    {book.title}
                  </Typography>

                  <Typography variant="body1">
                    {book.author}
                  </Typography>

                  <Button
                    sx={{
                      position: "absolute",
                      top: 5,
                      right: 5,
                      backgroundColor: "secondary.light",
                      color:
                        "secondary.contrastText",
                      minWidth: "1.5rem",
                      p: 0,
                    }}
                    onClick={() =>
                      handleRemove(book.id)
                    }
                  >
                    &times;
                  </Button>
                </CardContent>
              </CardActionArea>
            </Card>
          ))}
        </Stack>
      )}
    </Container>
  );
};

export default ReadingPage;