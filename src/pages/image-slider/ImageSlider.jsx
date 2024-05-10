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

const ImageSlider = () => {
  const [imageSlider, setImageSlider] = useState([]);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const confirm = useConfirm();

  const getImageSlider = async () => {
    setLoading(true);
    await axiosClient
      .get(`/ImageSlider/GetAll`)
      .then((res) => {
        setLoading(false);
        setImageSlider(res.data);
        console.log(res.data);
      })
      .catch((err) => {
        setLoading(false);
      });
  };

  const deleteImage = async (Id) => {
    confirm({
      title: "Are you sure?",
      description: "You are about to delete this imageSlider!",
      cancellationText: "Cancel",
      confirmationText: "Ok",
      confirmationButtonProps: { color: "error", variant: "contained" },
    })
      .then(async () => {
        setLoading(true);
        await axiosClient
          .delete(`/ImageSlider/${Id}`)
          .then(() => {
            setLoading(false);
            getImageSlider();
          })
          .catch(() => {
            setLoading(false);
          });
      })
      .catch(() => {});
  };

  useEffect(() => {
    getImageSlider();
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
        <Title text="Image Slider" />
        <Box>
          <Button variant="contained" onClick={() => navigate("/image-slider/create")}>
            New image slider
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
                  <TableCell>Order</TableCell>
                  <TableCell>Image</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {imageSlider.length > 0 ? (
                  imageSlider.map((imageSlider = {}, key) => {
                    const { imageSliderId, order, image1 } = imageSlider;
                    return (
                      <TableRow hover role="checkbox" tabIndex={-1} key={imageSliderId}>
                        <TableCell>{imageSliderId}</TableCell>
                        <TableCell>{order}</TableCell>
                        <TableCell>
                          <Image src={image1} width={50} height={50} key={imageSliderId} />
                        </TableCell>
                        <TableCell>
                          <Button
                            variant="outlined"
                            onClick={() =>
                              navigate(`/image-slider/${imageSliderId}`, {
                                state: imageSlider,
                              })
                            }
                            sx={{ mr: 2 }}
                          >
                            Update
                          </Button>
                          <Button
                            variant="outlined"
                            color="error"
                            onClick={() => deleteImage(imageSliderId)}
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
                      no images
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

export default ImageSlider;
