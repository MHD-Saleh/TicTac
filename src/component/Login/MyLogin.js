import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import { useFormik, Form, FormikProvider } from "formik";

import * as Yup from "yup";
import { Stack } from "@mui/material";
import { useDispatch } from "react-redux";
import { setNameRoom, testset } from "../../redux/LoginSlice";
import { useNavigate } from "react-router-dom";

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="https://mui.com/">
        MHD Saleh 😊.
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

export default function MyLogin() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmitt = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get("email"),
      password: data.get("password"),
    });
  };

  const LoginSchema = Yup.object().shape({
    name: Yup.string().required("name is required"),
    room: Yup.string().required("room is required"),
  });

  const formik = useFormik({
    initialValues: {
      name: "",
      room: "",
    },
    validationSchema: LoginSchema,
    onSubmit: () => {
      console.log("name :", getFieldProps("name").value);
      console.log("room is :", getFieldProps("room").value);
      console.log("setting in reducers");

      //loginn(getFieldProps("email").value, getFieldProps("password").value);
    },
  });

  const handelsubmitt = () => {
    dispatch(
      testset({
        name: getFieldProps("name").value,
        room: getFieldProps("room").value,
      })
    );
    navigate("/main");
  };

  const {
    errors,
    touched,
    values,
    isSubmitting,
    handleSubmit,
    getFieldProps,
  } = formik;

  return (
    <Box borderRadius="50%">
      <Paper sx={{ margin: "20px", borderRadius: "20px" }}>
        <Grid container component="main" sx={{ height: "100vh" }}>
          <CssBaseline />
          <Grid
            item
            xs={false}
            sm={4}
            md={7}
            sx={{
              backgroundImage: "url(https://source.unsplash.com/random)",
              backgroundRepeat: "no-repeat",
              backgroundColor: (t) =>
                t.palette.mode === "light"
                  ? t.palette.grey[100]
                  : t.palette.grey[900],
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          />
          <Grid
            item
            xs={12}
            sm={8}
            md={5}
            component={Paper}
            elevation={6}
            square
          >
            <Box
              sx={{
                my: 8,
                mx: 4,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Avatar sx={{ m: 1, bgcolor: "primary.main" }}>
                <LockOutlinedIcon />
              </Avatar>
              <Typography component="h1" variant="h5">
                Sign in
              </Typography>
            </Box>
            <Box component="form" noValidate sx={{ margin: "30px 30px" }}>
              <FormikProvider value={formik}>
                <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
                  <Stack spacing={3}>
                    <TextField
                      autoComplete="name"
                      type="text"
                      label="name"
                      {...getFieldProps("name")}
                      error={Boolean(touched.name && errors.name)}
                      helperText={touched.name && errors.name}
                    />

                    <TextField
                      autoComplete="room"
                      type="text"
                      label="room"
                      {...getFieldProps("room")}
                      error={Boolean(touched.room && errors.room)}
                      helperText={touched.room && errors.room}
                    />
                  </Stack>

                  <Button
                    sx={{ marginTop: "20px" }}
                    fullWidth
                    size="large"
                    type="submit"
                    variant="contained"
                  >
                    Enter
                  </Button>
                </Form>
              </FormikProvider>
              <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Remember me"
              />
              <Button
                sx={{ marginTop: "20px" }}
                fullWidth
                size="large"
                type="submit"
                variant="contained"
                onClick={() => {
                  handelsubmitt();
                }}
              >
                redux
              </Button>

              <Copyright sx={{ mt: 5 }} />
            </Box>
          </Grid>
        </Grid>
      </Paper>
    </Box>
  );
}
