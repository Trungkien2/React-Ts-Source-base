import React from "react";
import { Formik, Form, Field } from "formik";
import { useNavigate } from "react-router-dom";
import InputField from "./InputField";
import { UserApi } from "../api";

import { Stack, Button, TextField } from "@mui/material";

const RegisterComponent: React.FC = () => {
  const navigate = useNavigate();
  const handleSubmit = async (values: any, { setSubmitting }: any) => {
    try {
      await UserApi.add(values);
      setSubmitting(false);
      alert("Register success");
      navigate("/login");
    } catch (error) {
      console.log(error);

      alert(error);
    }
  };
  return (
    <div>
      <h1>Register </h1>
      <Formik
        initialValues={{ email: "", password: "" }}
        validate={(values) => {
          const errors: any = {};
          if (!values.email) {
            errors.email = "Required";
          } else if (
            !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
          ) {
            errors.email = "Invalid email address";
          }
          return errors;
        }}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <Form>
            <Stack
              spacing={2}
              sx={{
                background: "#eff5fa;",
                p: 3,
              }}
            >
              <Field
                type="text"
                name="username"
                render={({ field }: any) => (
                  <InputField field={field} name="username" />
                )}
              />
              <Field
                type="email"
                name="email"
                render={({ field }: any) => (
                  <InputField field={field} name="email" />
                )}
              />

              <Field
                type="text"
                name="password"
                render={({ field }: any) => (
                  <InputField field={field} name="password" />
                )}
              />

              <Stack
                direction={"row"}
                justifyContent="center"
                alignItems="center"
                spacing={3}
              >
                <Button variant="contained" onClick={() => navigate("/login")}>
                  Back
                </Button>
                <Button
                  type="submit"
                  variant="contained"
                  disabled={isSubmitting}
                >
                  Register
                </Button>
              </Stack>
            </Stack>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default RegisterComponent;
