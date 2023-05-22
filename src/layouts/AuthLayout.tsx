import React from "react";
import Container from "@mui/material/Container";
interface IProps {
  children?: React.ReactNode;
}
const AuthLayout: React.FC<IProps> = ({ children }) => {
  return <Container maxWidth="sm">{children}</Container>;
};

export default AuthLayout;
