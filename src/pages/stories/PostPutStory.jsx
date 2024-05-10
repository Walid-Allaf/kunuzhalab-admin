import {
  Box,
  Button,
  CircularProgress,
  Container,
  FormControl,
  Grid,
  InputLabel,
  OutlinedInput,
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

function PostPutStory() {
  const schema = Yup.object().shape({
    title: Yup.string().required("title is required"),
    description: Yup.string().required("description is required"),
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
  const [loadingStory, setLoadingStory] = React.useState(false);
  const [viewImg, setViewImg] = React.useState("");
  const [fileError, setFileError] = React.useState("");
  const [stories, setStories] = React.useState([]);

  const getStories = async () => {
    setLoadingStory(true);
    await axiosClient
      .get(`/Stories/GetAll`)
      .then((res) => {
        setLoadingStory(false);
        setStories(res.data);
      })
      .catch((err) => {
        setLoadingStory(false);
      });
  };

  React.useEffect(() => {
    getStories();
    id && setViewImg(location.state.image1);
  }, []);

  return (
    <Container sx={{ minHeight: "72vh", pb: 2 }}>
      <Title text={!id ? "New story" : `Update ${location.state.title}`} />
      <Box sx={{ height: "calc(100vh - 210px)" }}>
        {updating ? (
          <CircularProgress />
        ) : (
          <Formik
            validationSchema={schema}
            initialValues={{
              title: id ? location.state?.title : "",
              description: id ? location.state?.description : "",
            }}
            onSubmit={async (values) => {
              console.log(values);
              setLoading(true);
              if (!id) {
                await axiosClient
                  .post(`/Stories`, {
                    title: values.title,
                    description: values.description,
                    image1: viewImg,
                  })
                  .then((res) => {
                    if (res.status === 200) {
                      navigate("/stories");
                      setLoading(false);
                    }
                  })
                  .catch(function (error) {
                    setLoading(false);
                  });
              } else {
                await axiosClient
                  .put(`/Stories/${location.state.storyId}`, {
                    title: values.title,
                    description: values.description,
                    image1: viewImg,
                  })
                  .then((res) => {
                    if (res.status === 200) {
                      navigate("/stories");
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
                        <InputLabel htmlFor="title">Name</InputLabel>
                        <OutlinedInput
                          error={errors.title && touched.title && errors.title ? true : false}
                          id="title"
                          title="title"
                          label="Name"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.title}
                          type={"text"}
                          sx={{ background: "#fff" }}
                        />

                        <Typography color={"error"}>
                          {errors.title && touched.title && errors.title}
                        </Typography>
                      </FormControl>
                    </Grid>

                    <Grid item xs={5}>
                      <FormControl sx={{ m: 1, width: "100%" }} variant="outlined">
                        <InputLabel htmlFor="description">Description</InputLabel>
                        <OutlinedInput
                          error={
                            errors.description && touched.description && errors.description
                              ? true
                              : false
                          }
                          id="description"
                          title="description"
                          label="Description"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.description}
                          type={"text"}
                          sx={{ background: "#fff" }}
                        />

                        <Typography color={"error"}>
                          {errors.description && touched.description && errors.description}
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

export default PostPutStory;
