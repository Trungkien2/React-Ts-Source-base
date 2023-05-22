import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useNavigate } from "react-router-dom";
import InputField from "./InputField";
import { AuthApi } from "../api";
import { useDispatch } from "react-redux";
import { Iuser } from "../interface";
import { setUser } from "../redux/slice/userSlice";

import { Stack, Button, TextField } from "@mui/material";

const LoginComponent: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleSubmit = async (values: any, { setSubmitting }: any) => {
    try {
      const response = await AuthApi.add(values);

      const userInfo: {
        token: string;
        object: Iuser;
      } = {
        token: response?.data?.user?.token,
        object: response?.data?.user,
      };
      dispatch(setUser(userInfo));
      setSubmitting(false);
      alert("Login Success");
      navigate("/");
    } catch (error) {}
  };
  return (
    <div>
      <h1>Login </h1>
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
                type="email"
                name="email"
                render={({ field }: any) => (
                  <InputField field={field} name="email" />
                )}
              />

              <Field
                type="password"
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
                <Button
                  type="submit"
                  variant="contained"
                  disabled={isSubmitting}
                >
                  Submit
                </Button>
                <Button
                  variant="contained"
                  onClick={() => navigate("/register")}
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

export default LoginComponent;
