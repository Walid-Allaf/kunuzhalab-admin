import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { Paper } from "@mui/material";
import { LoginBg } from "../../assets";
import { useStateContext } from "../../contexts/ContextProvider";
import { useNavigate } from "react-router-dom";

function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {"Copyright © "}
      <Box
        component={"a"}
        href="/google.com"
        sx={{ textDecoration: "underline", color: "inherit" }}
      >
        Kunuzhalab
      </Box>{" "}
      {new Date().getFullYear()}
    </Typography>
  );
}

const Login = () => {
  const { setToken } = useStateContext();
  const navigate = useNavigate();
  const [loading, setLoading] = React.useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get("email"),
      password: data.get("password"),
    });
    if (
      data.get("email") === "kunuzhalab@admin.com" &&
      data.get("password") === "$kunuzhalab@admin053$"
    ) {
      setToken(data.get("email"));
      navigate("/");
    }
  };

  return (
    <Box component="main" sx={{ width: "100%" }}>
      <CssBaseline />
      <Grid container component="main" sx={{ height: "100vh" }}>
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage: `url(${LoginBg})`,
            backgroundRepeat: "no-repeat",
            backgroundColor: (t) =>
              t.palette.mode === "light" ? t.palette.grey[50] : t.palette.grey[900],
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />

        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              marginTop: 8,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: "secondary.main", mb: 2 }}>
              {/* <LockOutlinedIcon /> */}
            </Avatar>
            <Typography component="h1" variant="h5" marginBottom={5}>
              تسجيل الدخول
            </Typography>
            <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    id="email"
                    label="الايميل"
                    name="email"
                    autoComplete="email"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    name="password"
                    label="كلمة المرور"
                    type="password"
                    id="password"
                    autoComplete="new-password"
                  />
                </Grid>
                {/* <Grid item xs={12}>
              <FormControlLabel
                control={<Checkbox value="allowExtraEmails" color="primary" />}
                label="I want to receive inspiration, marketing promotions and updates via email."
              />
            </Grid> */}
              </Grid>
              <Button
                disabled={loading ? true : false}
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                {loading ? "...جاري تسجيل الدخول" : "تسجيل دخول"}
              </Button>
            </Box>
            <Copyright sx={{ mt: 5 }} />
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Login;
