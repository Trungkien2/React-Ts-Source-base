import React from "react";
import { LoginComponent } from "../components";
import { AuthLayout } from "../layouts";
const LoginView: React.FC = () => {
  return (
    <AuthLayout>
      <LoginComponent />
    </AuthLayout>
  );
};

export default LoginView;
