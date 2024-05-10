import {
  Box,
  Button,
  CircularProgress,
  Container,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
  Typography,
  styled,
} from "@mui/material";
import React from "react";
import * as Yup from "yup";
import { Formik, Form } from "formik";
import { LoadingButton } from "@mui/lab";
// MUI ICONS
import SaveIcon from "@mui/icons-material/Save";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { Image, Title } from "../../components";
import { compressImg } from "../../helpers";
import axiosClient from "../../api/axiosClient";
import { useLocation, useNavigate, useParams } from "react-router-dom";

function PostPutImageSlider() {
  const schema = Yup.object().shape({
    order: Yup.string().required("order is required"),
  });
  const VisuallyHiddenInput = styled("input")({
    height: "100%",
    overflow: "hidden",
    position: "absolute",
    bottom: 0,
    left: 0,
    whiteSpace: "nowrap",
    width: "100%",
    opacity: 0,
    cursor: "pointer",
  });

  const navigate = useNavigate();
  const location = useLocation();
  const { id } = useParams();

  const [loading, setLoading] = React.useState(false);
  const [updating, setUpdating] = React.useState(false);
  const [loadingSlider, setLoadingSlider] = React.useState(false);
  const [viewImg, setViewImg] = React.useState("");
  const [fileError, setFileError] = React.useState("");

  React.useEffect(() => {
    id && setViewImg(location.state.image1);
  }, []);

  return (
    <Container sx={{ minHeight: "72vh", pb: 2 }}>
      <Title text={!id ? "New image slider" : `Update image`} />
      <Box sx={{ height: "calc(100vh - 210px)" }}>
        {updating ? (
          <CircularProgress />
        ) : (
          <Formik
            validationSchema={schema}
            initialValues={{
              order: id ? location.state?.order : 1,
            }}
            onSubmit={async (values) => {
              console.log(values);
              setLoading(true);
              if (!id) {
                await axiosClient
                  .post(`/ImageSlider`, {
                    order: values.order,
                    image1: viewImg,
                  })
                  .then((res) => {
                    if (res.status === 200) {
                      navigate("/image-slider");
                      setLoading(false);
                    }
                  })
                  .catch(function (error) {
                    setLoading(false);
                  });
              } else {
                await axiosClient
                  .put(`/ImageSlider/${location.state.imageSliderId}`, {
                    order: values.order,
                    image1: viewImg,
                  })
                  .then((res) => {
                    if (res.status === 200) {
                      navigate("/image-slider");
                      setLoading(false);
                    }
                  })
                  .catch(function (error) {
                    setLoading(false);
                  });
              }
            }}
          >
            {({ values, errors, touched, handleChange, handleBlur, handleSubmit }) => (
              <Box className="form pb-4">
                <Form noValidate className="d-flex flex-column" onSubmit={handleSubmit}>
                  <Grid container spacing={3}>
                    <Grid item xs={5}>
                      <FormControl sx={{ m: 1, width: "100%" }} variant="outlined">
                        <InputLabel htmlFor="order">Order</InputLabel>
                        <OutlinedInput
                          error={errors.order && touched.order && errors.order ? true : false}
                          id="order"
                          order="order"
                          label="Order"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.order}
                          type={"text"}
                          sx={{ background: "#fff" }}
                        />

                        <Typography color={"error"}>
                          {errors.order && touched.order && errors.order}
                        </Typography>
                      </FormControl>
                    </Grid>

                    <Grid item xs={12}>
                      <Button
                        catonent="button"
                        variant="contained"
                        color="secondary"
                        startIcon={<CloudUploadIcon />}
                        onChange={(e) => {
                          if (e.target.files[0].size > 1024 * 1024 * 2) {
                            e.target.value = "";
                            setFileError("File size is more then 2MB!");
                          } else {
                            setFileError("");
                            compressImg(e.target.files[0]).then((res) => {
                              setViewImg(res);
                            });
                          }
                        }}
                      >
                        Upload file
                        <VisuallyHiddenInput type="file" />
                      </Button>
                      <Typography color={"error"}>{fileError}</Typography>
                      {viewImg && (
                        <Box sx={{ py: "1rem" }}>
                          <Image src={`${viewImg}`} alt="projImg" width={350} />
                        </Box>
                      )}
                    </Grid>
                  </Grid>
                  <LoadingButton
                    endIcon={<SaveIcon />}
                    loading={loading}
                    loadingPosition="center"
                    variant="contained"
                    type="submit"
                    sx={{ mt: "1rem" }}
                  >
                    {!id ? "Save" : `Update`}
                  </LoadingButton>
                </Form>
              </Box>
            )}
          </Formik>
        )}
      </Box>
    </Container>
  );
}

export default PostPutImageSlider;
