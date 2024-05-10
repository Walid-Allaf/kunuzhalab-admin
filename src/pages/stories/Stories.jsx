import {
  Box,
  Button,
  Container,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { Image, Title } from "../../components";
import { useNavigate } from "react-router-dom";
import axiosClient from "../../api/axiosClient";
import { useConfirm } from "material-ui-confirm";

const Stories = () => {
  const [stories, setStories] = useState([]);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const confirm = useConfirm();

  const getStories = async () => {
    setLoading(true);
    await axiosClient
      .get(`/Stories/GetAll`)
      .then((res) => {
        setLoading(false);
        setStories(res.data);
        console.log(res.data);
      })
      .catch((err) => {
        setLoading(false);
      });
  };

  const deleteStory = async (Id) => {
    confirm({
      title: "Are you sure?",
      description: "You are about to delete this story!",
      cancellationText: "Cancel",
      confirmationText: "Ok",
      confirmationButtonProps: { color: "error", variant: "contained" },
    })
      .then(async () => {
        setLoading(true);
        await axiosClient
          .delete(`/Stories/${Id}`)
          .then(() => {
            setLoading(false);
            getStories();
          })
          .catch(() => {
            setLoading(false);
          });
      })
      .catch(() => {});
  };

  useEffect(() => {
    getStories();
  }, []);

  return (
    <Container sx={{ width: "100%" }}>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Title text="Stories" />
        <Box>
          <Button variant="contained" onClick={() => navigate("/stories/create")}>
            New story
          </Button>
        </Box>
      </Box>
      <Paper sx={{ width: "100%", overflow: "hidden" }}>
        {loading ? (
          <Typography>Loading...</Typography>
        ) : (
          <TableContainer sx={{ maxHeight: 640 }}>
            <Table stickyHeader aria-label="sticky table">
              <TableHead>
                <TableRow>
                  <TableCell>#</TableCell>
                  <TableCell>Title</TableCell>
                  <TableCell>Description</TableCell>
                  <TableCell>Image</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {stories.length > 0 ? (
                  stories.map((story = {}, key) => {
                    const { storyId, title, description, image1, image2 } = story;
                    return (
                      <TableRow hover role="checkbox" tabIndex={-1} key={storyId}>
                        <TableCell>{storyId}</TableCell>
                        <TableCell>{title}</TableCell>
                        <TableCell>{description}</TableCell>
                        <TableCell>
                          <Image src={image1} width={50} height={50} key={storyId} />
                        </TableCell>
                        <TableCell>
                          <Button
                            variant="outlined"
                            onClick={() =>
                              navigate(`/stories/${storyId}`, {
                                state: story,
                              })
                            }
                            sx={{ mr: 2 }}
                          >
                            Update
                          </Button>
                          <Button
                            variant="outlined"
                            color="error"
                            onClick={() => deleteStory(storyId)}
                          >
                            Delete
                          </Button>
                        </TableCell>
                      </TableRow>
                    );
                  })
                ) : (
                  <TableRow>
                    <TableCell colSpan={10} sx={{ textAlign: "center" }}>
                      no stories
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </Paper>
    </Container>
  );
};
export default Stories;
