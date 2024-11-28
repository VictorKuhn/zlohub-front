import React, { useState, useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { useLocation, useNavigate } from "react-router-dom";
import {
  LoginContainer,
  Form,
  Input,
  LinksContainer,
  LinkText,
  Image,
  Button,
  Title,
  Subtitle,
} from "./LoginPage.styles";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  // Exibe mensagem de sucesso se houver no estado de navegação
  useEffect(() => {
    if (location.state?.successMessage) {
      toast.success(location.state.successMessage);
    }
  }, [location.state]);

  // Função para lidar com o login de responsáveis
  const handleResponsavelLogin = async (decoded, token) => {
    try {
      const response = await axios.get(
        `http://zlo-main-app.us-east-1.elasticbeanstalk.com/api/responsible/commonuser/findByEmail/${encodeURIComponent(decoded.sub)}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      const responsavelData = response.data.contentResponse;

      if (responsavelData) {
        localStorage.setItem("responsavelData", JSON.stringify(responsavelData));
        navigate("/responsavel");
      } else {
        throw new Error("Dados do RESPONSAVEL não encontrados.");
      }
    } catch (error) {
      console.error("Erro ao buscar dados do RESPONSAVEL:", error);
      toast.error(
        "Erro ao buscar dados do RESPONSAVEL. Tente novamente mais tarde."
      );
    }
  };

  // Função para lidar com o login de cuidadores
  const handleCuidadorLogin = async (decoded, token) => {
    try {
      const response = await axios.post(
        "http://zlo-hub-app.us-east-1.elasticbeanstalk.com/api/cuidadores/buscar-por-email",
        { email: decoded.sub },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      const cuidadorData = response.data;
      localStorage.setItem("cuidadorData", JSON.stringify(cuidadorData));
      navigate("/cuidador");
    } catch (error) {
      console.error("Erro ao buscar dados do cuidador:", error);
      toast.error(
        "Erro ao buscar dados do cuidador. Tente novamente mais tarde."
      );
    }
  };

  // Função para lidar com roles
  const handleRoleBasedLogin = async (decoded, token) => {
    switch (decoded.roles) {
      case "ROLE_RESPONSAVEL":
        await handleResponsavelLogin(decoded, token);
        break;
      case "ROLE_CUIDADOR":
        await handleCuidadorLogin(decoded, token);
        break;
      case "ROLE_ADMIN":
        navigate("/admin");
        break;
      default:
        console.error("Role desconhecida:", decoded.roles);
    }
  };

  // Função principal de login
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const authResponse = await axios.post(
        "http://zlo-login-microservice-env-2.eba-cm4nxyyj.us-east-1.elasticbeanstalk.com/auth/login",
        { email, password }
      );

      const token = authResponse.data;
      if (token) {
        localStorage.setItem("token", token);
        const decoded = jwtDecode(token);

        await handleRoleBasedLogin(decoded, token);
      } else {
        console.error("Token JWT não recebido.");
      }
    } catch (error) {
      console.error("Erro no Login:", error);
      const errorMessage =
        error.response && error.response.data
          ? error.response.data
          : "Erro ao realizar o login. Tente novamente.";
      toast.error(errorMessage);
    }
  };

  const handleRegisterClick = () => navigate("/register");
  const handleRecoverClick = () => navigate("/recoverPassword");

  return (
    <LoginContainer>
      <Toaster position="top-center" reverseOrder={false} />
      <Image src="https://i.imgur.com/fk4J5Fk.png" alt="Logo" />
      <Title>zloHub</Title>
      <Subtitle>Conectando quem tem zelo por você.</Subtitle>
      <Form onSubmit={handleLogin}>
        <Input
          type="email"
          placeholder="E-mail..."
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Input
          type="password"
          placeholder="Senha..."
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button type="submit">Entrar</Button>
        <LinksContainer>
          <LinkText align="left" onClick={handleRegisterClick}>
            Cadastrar-se
          </LinkText>
          <LinkText align="right" onClick={handleRecoverClick}>
            Esqueci a senha
          </LinkText>
        </LinksContainer>
      </Form>
    </LoginContainer>
  );
};

export default LoginPage;