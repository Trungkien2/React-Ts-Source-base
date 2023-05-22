import { useEffect, useState } from "react";

import {
  Stack,
  Button,
  Modal,
  Fade,
  Backdrop,
  Box,
  Typography,
} from "@mui/material";

import { Formik, Form, Field } from "formik";
import InputField from "./InputField";
import { UserApi } from "../api";
import { Iuser } from "../interface";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function TransitionsModal({
  open,
  type,
  handleClose,
}: {
  open: boolean;
  type: string;
  handleClose: () => void;
}) {
  const [item, setitem] = useState<Iuser>({
    username: "",
    email: "",
    bio: "",
  });

  const token = localStorage.getItem("token")
    ? JSON.parse(localStorage.getItem("token") as string)
    : "";

  const getUserProfile = async () => {
    try {
      const res = await UserApi.Getme(token as string);

      setitem(res.data.user);
    } catch (error: any) {
      alert(error.response.data.message);
    }
  };
  const handleSubmit = async (values: Iuser, { setSubmitting }: any) => {
    try {
      await UserApi.updateMe(values);
      alert("Profile updated successfully");
      handleClose();
      getUserProfile();
    } catch (error: any) {
      alert(error.response.data.message);
    }
  };

  useEffect(() => {
    getUserProfile();
  }, []);

  return (
    <div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <Fade in={open}>
          <Box sx={style}>
            <Typography id="transition-modal-title" variant="h6" component="h2">
              {type === "profile" ? "Profile" : "Edit"}
            </Typography>
            <Formik initialValues={item} onSubmit={handleSubmit}>
              {({ isSubmitting, values }) => (
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
                      value={values.username}
                      render={({ field }: any) => (
                        <InputField
                          field={field}
                          name="username"
                          disabled={type === "profile" ? true : false}
                        />
                      )}
                    />

                    <Field
                      type="email"
                      name="email"
                      value={values.email}
                      render={({ field }: any) => (
                        <InputField
                          field={field}
                          name="email"
                          disabled={type === "profile" ? true : false}
                        />
                      )}
                    />
                    <Field
                      type="text"
                      name="bio"
                      value={values.bio}
                      render={({ field }: any) => (
                        <InputField
                          field={field}
                          name="bio"
                          disabled={type === "profile" ? true : false}
                        />
                      )}
                    />

                    <Stack
                      direction={"row"}
                      justifyContent="center"
                      alignItems="center"
                      spacing={3}
                    >
                      {type === "profile" ? null : (
                        <Button
                          type="submit"
                          variant="contained"
                          disabled={isSubmitting}
                        >
                          Edit
                        </Button>
                      )}
                    </Stack>
                  </Stack>
                </Form>
              )}
            </Formik>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}
