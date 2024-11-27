import React, { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Toaster, toast } from "react-hot-toast";
import {
  ResetContainer,
  BackButton,
  Image,
  Title,
  Subtitle,
  Form,
  Input,
  Button,
  PasswordContainer,
  PasswordToggleIcon,
  ErrorMessage,
} from "./ResetPasswordPage.styles";
import axios from "axios";

const ResetPasswordPage = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({
    senha: {
      minLength: false,
      hasUppercase: false,
      hasNumber: false,
      hasSymbol: false,
      isValid: false,
    },
    confirmPassword: "",
  });
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");

  const validatePassword = (value) => {
    const minLength = value.length >= 8;
    const hasUppercase = /[A-Z]/.test(value);
    const hasNumber = /\d/.test(value);
    const hasSymbol = /[!@#$%^&*(),.?":{}|<>]/.test(value);

    setErrors((prev) => ({
      ...prev,
      senha: {
        minLength,
        hasUppercase,
        hasNumber,
        hasSymbol,
        isValid: minLength && hasUppercase && hasNumber && hasSymbol,
      },
    }));
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();

    if (!errors.senha.isValid || confirmPassword !== password) {
      setErrors((prev) => ({
        ...prev,
        confirmPassword:
          confirmPassword !== password ? "As senhas não coincidem." : "",
      }));
      return;
    }

    try {
      // eslint-disable-next-line no-unused-vars
      const response = await axios.post(
        "http://zlo-login-microservice-env-2.eba-cm4nxyyj.us-east-1.elasticbeanstalk.com/auth/reset-password",
        {
          token,
          newPassword: password,
        }
      );

      // Redirecionar com toaster de sucesso
      navigate("/", {
        state: { successMessage: "Senha redefinida com sucesso!" },
      });
    } catch (error) {
      console.error("Erro ao redefinir senha:", error);

      // Obtém a mensagem de erro do backend ou define uma mensagem padrão
      const errorMessage =
        error.response?.data ||
        "Erro ao redefinir senha. Verifique o link ou tente novamente.";

      // Força a exibição do toast
      toast.error(errorMessage.toString(), { position: "top-center" });
    }
  };

  return (
    <ResetContainer>
      <Toaster position="top-center" reverseOrder={false} />
      <BackButton onClick={() => navigate("/")}>Voltar</BackButton>
      <Image src="https://i.imgur.com/fk4J5Fk.png" alt="Logo" />
      <Title>Redefinir senha</Title>
      <Subtitle>Insira sua nova senha abaixo.</Subtitle>
      <Form onSubmit={handleResetPassword}>
        <PasswordContainer>
          <Input
            type={showPassword ? "text" : "password"}
            placeholder="Nova senha..."
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              validatePassword(e.target.value);
            }}
            style={{
              borderColor: errors.senha.isValid ? "green" : "red",
            }}
            required
          />
          <PasswordToggleIcon onClick={() => setShowPassword(!showPassword)}>
            {showPassword ? "👁️" : "👁️‍🗨️"}
          </PasswordToggleIcon>
        </PasswordContainer>
        <div>
          <ErrorMessage
            style={{ color: errors.senha.minLength ? "green" : "red" }}
          >
            Mínimo 8 caracteres
          </ErrorMessage>
          <ErrorMessage
            style={{ color: errors.senha.hasUppercase ? "green" : "red" }}
          >
            Uma letra maiúscula
          </ErrorMessage>
          <ErrorMessage
            style={{ color: errors.senha.hasNumber ? "green" : "red" }}
          >
            Um número
          </ErrorMessage>
          <ErrorMessage
            style={{ color: errors.senha.hasSymbol ? "green" : "red" }}
          >
            Um símbolo
          </ErrorMessage>
        </div>
        <PasswordContainer>
          <Input
            type={showPassword ? "text" : "password"}
            placeholder="Confirme a nova senha..."
            value={confirmPassword}
            onChange={(e) => {
              setConfirmPassword(e.target.value);
              setErrors((prev) => ({
                ...prev,
                confirmPassword:
                  e.target.value !== password ? "As senhas não coincidem." : "",
              }));
            }}
            style={{
              borderColor:
                errors.confirmPassword || confirmPassword !== password
                  ? "red"
                  : "green",
            }}
            required
          />
          <PasswordToggleIcon onClick={() => setShowPassword(!showPassword)}>
            {showPassword ? "👁️" : "👁️‍🗨️"}
          </PasswordToggleIcon>
        </PasswordContainer>
        {errors.confirmPassword && (
          <ErrorMessage>{errors.confirmPassword}</ErrorMessage>
        )}
        <Button type="submit">Redefinir Senha</Button>
      </Form>
    </ResetContainer>
  );
};

export default ResetPasswordPage;