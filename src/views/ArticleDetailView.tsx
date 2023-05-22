import React, { useEffect, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useNavigate, useParams } from "react-router-dom";
import InputField from "../components/InputField";

import { useDispatch } from "react-redux";

import { Stack, Button, TextField } from "@mui/material";
import { Article } from "../api";

const LoginComponent: React.FC = () => {
  const navigate = useNavigate();
  const [item, setItem] = useState(null);

  const getItem = async (slug: string) => {
    try {
    } catch (error: any) {
      alert(error.response.data.message);
    }
  };

  const handleSubmit = async (values: any, { setSubmitting }: any) => {
    try {
      const response = await Article.add(values);
    } catch (error) {}
  };
  return (
    <div>
      <h1>Detail Article </h1>
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
                  Edit
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
