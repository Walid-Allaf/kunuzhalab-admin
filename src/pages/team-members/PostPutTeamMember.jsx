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

function PostPutTeamMember() {
  const schema = Yup.object().shape({
    firstName: Yup.string().required("first name is a required"),
    lastName: Yup.string().required("last name is a required"),
    email: Yup.string().required("email is a required").email("email not valid"),
    phone: Yup.string().required("phone is a required"),
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
  const [viewImg, setViewImg] = React.useState("");
  const [fileError, setFileError] = React.useState("");

  React.useEffect(() => {
    console.log(location.state);
    id && setViewImg(location.state.image1);
  }, []);

  return (
    <Container sx={{ minHeight: "72vh" }}>
      <Title text={!id ? "New team member" : `Update ${location.state.email}`} />
      <Box sx={{ height: "calc(100vh - 210px)" }}>
        {updating ? (
          <CircularProgress />
        ) : (
          <Formik
            validationSchema={schema}
            initialValues={{
              firstName: id ? location.state?.firstName : "",
              lastName: id ? location.state?.lastName : "",
              email: id ? location.state?.email : "",
              phone: id ? location.state?.phone : "",
            }}
            onSubmit={async (values) => {
              console.log(values);
              setLoading(true);
              if (!id) {
                await axiosClient
                  .post(`/TeamMembers`, {
                    firstName: values.firstName,
                    lastName: values.lastName,
                    email: values.email,
                    phone: values.phone,
                    image1: viewImg,
                  })
                  .then((res) => {
                    if (res.status === 200) {
                      navigate("/team-members");
                      setLoading(false);
                    }
                  })
                  .catch(function (error) {
                    setLoading(false);
                  });
              } else {
                await axiosClient
                  .put(`/TeamMembers/${location.state.teamMemberId}`, {
                    firstName: values.firstName,
                    lastName: values.lastName,
                    email: values.email,
                    phone: values.phone,
                    image1: viewImg,
                  })
                  .then((res) => {
                    if (res.status === 200) {
                      navigate("/team-members");
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
                        <InputLabel htmlFor="firstName">First name</InputLabel>
                        <OutlinedInput
                          error={
                            errors.firstName && touched.firstName && errors.firstName ? true : false
                          }
                          id="firstName"
                          name="firstName"
                          label="First name"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.firstName}
                          type={"text"}
                          sx={{ background: "#fff" }}
                        />

                        <Typography color={"error"}>
                          {errors.firstName && touched.firstName && errors.firstName}
                        </Typography>
                      </FormControl>
                    </Grid>
                    <Grid item xs={5}>
                      <FormControl sx={{ m: 1, width: "100%" }} variant="outlined">
                        <InputLabel htmlFor="lastName">Last name</InputLabel>
                        <OutlinedInput
                          error={
                            errors.lastName && touched.lastName && errors.lastName ? true : false
                          }
                          id="lastName"
                          name="lastName"
                          label="Last name"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.lastName}
                          type={"text"}
                          sx={{ background: "#fff" }}
                        />

                        <Typography color={"error"}>
                          {errors.lastName && touched.lastName && errors.lastName}
                        </Typography>
                      </FormControl>
                    </Grid>

                    <Grid item xs={5}>
                      <FormControl sx={{ m: 1, width: "100%" }} variant="outlined">
                        <InputLabel htmlFor="email">Email</InputLabel>
                        <OutlinedInput
                          error={errors.email && touched.email && errors.email ? true : false}
                          id="email"
                          name="email"
                          label="Email"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.email}
                          type={"email"}
                          sx={{ background: "#fff" }}
                        />

                        <Typography color={"error"}>
                          {errors.email && touched.email && errors.email}
                        </Typography>
                      </FormControl>
                    </Grid>

                    <Grid item xs={5}>
                      <FormControl sx={{ m: 1, width: "100%" }} variant="outlined">
                        <InputLabel htmlFor="phone">Phone</InputLabel>
                        <OutlinedInput
                          error={errors.phone && touched.phone && errors.phone ? true : false}
                          id="phone"
                          name="phone"
                          label="Phone"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.phone}
                          type={"text"}
                          sx={{ background: "#fff" }}
                        />

                        <Typography color={"error"}>
                          {errors.phone && touched.phone && errors.phone}
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

export default PostPutTeamMember;
