import {
  Box,
  Button,
  createTheme,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  FormControl,
  FormControlLabel,
  FormLabel,
  Grid,
  ListItem,
  Paper,
  Radio,
  RadioGroup,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useFormik, Form, FormikProvider } from "formik";
import React from "react";
import * as Yup from "yup";

const Login = () => {
  const LoginSchema = Yup.object().shape({
    name: Yup.string().required("name is required"),
    image: Yup.string().required("image is required"),
  });

  const formik = useFormik({
    initialValues: {
      name: "",
      image: "",
    },
    validationSchema: LoginSchema,
    onSubmit: () => {
      console.log("name :", getFieldProps("name").value);
      console.log("image is :", getFieldProps("image").value);

      //loginn(getFieldProps("email").value, getFieldProps("password").value);
    },
  });

  const {
    errors,
    touched,
    values,
    isSubmitting,
    handleSubmit,
    getFieldProps,
  } = formik;

  return (
    <div>
      <Grid item xs={6}>
        <Paper sx={{ padding: "50px", marginTop: "50px" }}>
          <FormikProvider value={formik}>
            <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
              <Stack spacing={3}>
                <TextField
                  fullWidth
                  autoComplete="name"
                  type="name"
                  label="name"
                  {...getFieldProps("name")}
                  error={Boolean(touched.name && errors.name)}
                  helperText={touched.name && errors.name}
                />

                <TextField
                  fullWidth
                  autoComplete="image"
                  type={"text"}
                  label="image"
                  {...getFieldProps("image")}
                  error={Boolean(touched.image && errors.image)}
                  helperText={touched.image && errors.image}
                />
              </Stack>

              <Button
                sx={{ marginTop: "20px" }}
                fullWidth
                size="large"
                type="submit"
                variant="contained"
              >
                add
              </Button>
            </Form>
          </FormikProvider>
        </Paper>
      </Grid>
    </div>
  );
};

export default Login;
