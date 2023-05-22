import React from "react";
import { RegisterComponent } from "../components";
import { AuthLayout } from "../layouts";
const RegisterView: React.FC = () => {
  return (
    <AuthLayout>
      <RegisterComponent />
    </AuthLayout>
  );
};

export default RegisterView;
