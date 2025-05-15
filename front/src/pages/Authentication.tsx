import { useState } from "react";
import Login from "../components/authentication/Login";
import Register from "../components/authentication/Register";
import { IRegister, IError } from "../@types/auth";
import { registerUser } from "../api/apiAuth";
import { toastError } from "../utils/toast/toastError";
import { toastSuccess } from "../utils/toast/toastSuccess";

const Authentication = () => {
  const [registerData, setRegisterData] = useState<IRegister>({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleRegister = async () => {
    if (registerData.password !== registerData.confirmPassword) {
      toastError("Les mots de passe ne correspondent pas");
      return;
    }
    try {
      await registerUser(registerData);
      toastSuccess("Inscription réussie !");

      setRegisterData({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
      });
    } catch (error: unknown) {
      const apiError = error as IError;
      if (apiError.errors && apiError.errors.length > 0) {
        toastError(apiError.errors);
      } else {
        toastError(apiError.message || "Erreur d'inscription");
      }
    }
  };

  return (
    <section className="pb-14 md:pb-6">
      <Login />
      <Register data={registerData} onChange={setRegisterData} onSubmit={handleRegister} />
    </section>
  );
};

export default Authentication;
