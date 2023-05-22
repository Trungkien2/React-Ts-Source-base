import React from "react";
import { TextField } from "@mui/material";

interface Iprops {
  field: any;
  name: string;
  disabled?: boolean;
}
const InputField: React.FC<Iprops> = ({ field, name, disabled }: Iprops) => {
  return (
    <TextField
      {...field}
      fullWidth
      label={name}
      defaultValue={""}
      name={name}
      disabled={disabled}
      sx={{
        "&": {
          backgroundColor: "white",
          borderRadius: 1,
        },
      }}
    />
  );
};

export default InputField;
