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
  Switch,
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

function PostPutSoap() {
  const schema = Yup.object().shape({
    name: Yup.string().required("first name is required"),
    description: Yup.string().required("last name is required"),
    soapAge: Yup.string().required("soap age is required"),
    oliveOil: Yup.string().required("olive oil is required"),
    laurelOil: Yup.string().required("laurel oil is required"),
    categoryId: Yup.string().required("category is required"),
    order: Yup.number().min(1, "order can not be negative"),
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
  const [loadingCategory, setLoadingCategory] = React.useState(false);
  const [viewImg, setViewImg] = React.useState("");
  const [fileError, setFileError] = React.useState("");
  const [categories, setCategories] = React.useState([]);

  const getCategories = async () => {
    setLoadingCategory(true);
    await axiosClient
      .get(`/Categories/GetAll`)
      .then((res) => {
        setLoadingCategory(false);
        setCategories(res.data);
      })
      .catch((err) => {
        setLoadingCategory(false);
      });
  };

  React.useEffect(() => {
    getCategories();
    console.log(location.state);
    id && setViewImg(location.state.image1);
  }, []);

  return (
    <Container sx={{ minHeight: "72vh", pb: 2 }}>
      <Title text={!id ? "New product" : `Update ${location.state.name}`} />
      <Box sx={{ height: "calc(100vh - 210px)" }}>
        {updating ? (
          <CircularProgress />
        ) : (
          <Formik
            validationSchema={schema}
            initialValues={{
              name: id ? location.state?.name : "",
              description: id ? location.state?.description : "",
              soapAge: id ? location.state?.soapAge : "",
              oliveOil: id ? location.state?.oliveOil : "",
              laurelOil: id ? location.state?.laurelOil : "",
              categoryId: id ? location.state?.categoryId : 1,
              color: id ? location.state?.color : "#000000",
              order: id ? location.state?.order : 1,
              mostWanted: id ? location.state?.mostWanted : false,
            }}
            onSubmit={async (values) => {
              console.log(values);
              setLoading(true);
              if (!id) {
                await axiosClient
                  .post(`/Soaps`, {
                    name: values.name,
                    description: values.description,
                    soapAge: values.soapAge,
                    oliveOil: values.oliveOil,
                    laurelOil: values.laurelOil,
                    categoryId: values.categoryId,
                    image1: viewImg,
                    color: values.color,
                    order: values.order,
                    mostWanted: values.mostWanted,
                  })
                  .then((res) => {
                    if (res.status === 200) {
                      navigate("/soaps");
                      setLoading(false);
                    }
                  })
                  .catch(function (error) {
                    setLoading(false);
                  });
              } else {
                await axiosClient
                  .put(`/Soaps/${location.state.soapId}`, {
                    name: values.name,
                    description: values.description,
                    soapAge: values.soapAge,
                    oliveOil: values.oliveOil,
                    laurelOil: values.laurelOil,
                    categoryId: values.categoryId,
                    image1: viewImg,
                    color: values.color,
                    order: values.order,
                    mostWanted: values.mostWanted,
                  })
                  .then((res) => {
                    if (res.status === 200) {
                      navigate("/soaps");
                      setLoading(false);
                    }
                  })
                  .catch(function (error) {
                    setLoading(false);
                  });
              }
            }}
          >
            {({
              values,
              errors,
              touched,
              handleChange,
              handleBlur,
              handleSubmit,
              setFieldValue,
            }) => (
              <Box className="form pb-4">
                <Form noValidate className="d-flex flex-column" onSubmit={handleSubmit}>
                  <Grid container spacing={3}>
                    <Grid item xs={5}>
                      <FormControl sx={{ m: 1, width: "100%" }} variant="outlined">
                        <InputLabel htmlFor="name">Name</InputLabel>
                        <OutlinedInput
                          error={errors.name && touched.name && errors.name ? true : false}
                          id="name"
                          name="name"
                          label="Name"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.name}
                          type={"text"}
                          sx={{ background: "#fff" }}
                        />

                        <Typography color={"error"}>
                          {errors.name && touched.name && errors.name}
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
                          name="description"
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

                    <Grid item xs={5}>
                      <FormControl sx={{ m: 1, width: "100%" }} variant="outlined">
                        <InputLabel htmlFor="soapAge">Soap Age</InputLabel>
                        <OutlinedInput
                          error={errors.soapAge && touched.soapAge && errors.soapAge ? true : false}
                          id="soapAge"
                          name="soapAge"
                          label="Soap Age"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.soapAge}
                          type={"soapAge"}
                          sx={{ background: "#fff" }}
                        />

                        <Typography color={"error"}>
                          {errors.soapAge && touched.soapAge && errors.soapAge}
                        </Typography>
                      </FormControl>
                    </Grid>

                    <Grid item xs={5}>
                      <FormControl sx={{ m: 1, width: "100%" }} variant="outlined">
                        <InputLabel htmlFor="oliveOil">Laurel Oil</InputLabel>
                        <OutlinedInput
                          error={
                            errors.oliveOil && touched.oliveOil && errors.oliveOil ? true : false
                          }
                          id="oliveOil"
                          name="oliveOil"
                          label="Laurel Oil"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.oliveOil}
                          type={"text"}
                          sx={{ background: "#fff" }}
                        />

                        <Typography color={"error"}>
                          {errors.oliveOil && touched.oliveOil && errors.oliveOil}
                        </Typography>
                      </FormControl>
                    </Grid>

                    <Grid item xs={5}>
                      <FormControl sx={{ m: 1, width: "100%" }} variant="outlined">
                        <InputLabel htmlFor="laurelOil">Laurel Oil</InputLabel>
                        <OutlinedInput
                          error={
                            errors.laurelOil && touched.laurelOil && errors.laurelOil ? true : false
                          }
                          id="laurelOil"
                          name="laurelOil"
                          label="Laurel Oil"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.laurelOil}
                          type={"text"}
                          sx={{ background: "#fff" }}
                        />

                        <Typography color={"error"}>
                          {errors.laurelOil && touched.laurelOil && errors.laurelOil}
                        </Typography>
                      </FormControl>
                    </Grid>

                    <Grid item xs={5}>
                      <FormControl sx={{ m: 1, width: "100%" }} variant="outlined">
                        <InputLabel id="categoryId">Category</InputLabel>
                        <Select
                          error={
                            errors.categoryId && touched.categoryId && errors.categoryId
                              ? true
                              : false
                          }
                          id="categoryId"
                          name="categoryId"
                          label="Category"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.categoryId}
                          sx={{ background: "#fff" }}
                        >
                          {loadingCategory ? (
                            <MenuItem disabled>Loading...</MenuItem>
                          ) : (
                            categories.map((item, index) => {
                              const { categoryName, categoryId } = item;
                              return (
                                <MenuItem key={index} value={categoryId}>
                                  {categoryName}
                                </MenuItem>
                              );
                            })
                          )}
                        </Select>
                        <Typography color={"error"}>
                          {errors.categoryId && touched.categoryId && errors.categoryId}
                        </Typography>
                      </FormControl>
                    </Grid>

                    <Grid item xs={3}>
                      <FormControl sx={{ m: 1, width: "100%" }} variant="outlined">
                        <InputLabel htmlFor="order">Order</InputLabel>
                        <OutlinedInput
                          error={errors.order && touched.order && errors.order ? true : false}
                          id="order"
                          name="order"
                          label="Order"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.order}
                          type={"number"}
                          sx={{ background: "#fff" }}
                        />

                        <Typography color={"error"}>
                          {errors.order && touched.order && errors.order}
                        </Typography>
                      </FormControl>
                    </Grid>

                    <Grid item xs={3}>
                      <Box
                        sx={{
                          height: "100%",
                          display: "flex",
                          justifyContent: "space-around",
                          alignItems: "center",
                        }}
                      >
                        <input
                          type="color"
                          value={values.color}
                          id="color"
                          name="color"
                          label="Color"
                          onChange={handleChange}
                          onBlur={handleBlur}
                        />
                        ({values.color})
                      </Box>
                    </Grid>

                    <Grid item xs={3} sx={{ display: "flex", alignItems: "center" }}>
                      <Switch
                        checked={values.mostWanted}
                        onChange={(e) => setFieldValue("mostWanted", e.target.checked)}
                      />
                      <Typography
                        sx={{ cursor: "pointer", userSelect: "none" }}
                        onClick={() => setFieldValue("mostWanted", !values.mostWanted)}
                      >
                        Most Wanted
                      </Typography>
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

export default PostPutSoap;
