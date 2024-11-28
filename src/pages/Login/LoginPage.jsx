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

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      // Faz login no serviço de autenticação
      const authResponse = await axios.post(
        "http://zlo-login-microservice-env-2.eba-cm4nxyyj.us-east-1.elasticbeanstalk.com/auth/login",
        {
          email,
          password,
        }
      );

      const token = authResponse.data;
      console.log("Token JWT Recebido:", token);

      if (token) {
        // Armazena o token no localStorage
        localStorage.setItem("token", token);

        // Decodifica o token para obter o e-mail e a role
        const decoded = jwtDecode(token);
        console.log("Token Decodificado:", decoded);

        if (decoded.roles === "ROLE_RESPONSAVEL") {
          try {
            const responsibleResponse = await axios.get(
              `http://zlo-main-app.us-east-1.elasticbeanstalk.com/api/responsible/commonuser/findByEmail/${encodeURIComponent(decoded.sub)}`,
              {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              }
            );

            console.log("Authorization Header:", `Bearer ${token}`);

            const responsavelData = responsibleResponse.data.contentResponse;
            console.log("Response Data:", responsavelData);

            if (responsavelData) {
              console.log("Dados do RESPONSAVEL:", responsavelData);

              // Armazene os dados no localStorage
              localStorage.setItem(
                "responsavelData",
                JSON.stringify(responsavelData)
              );

              // Redireciona para a página do RESPONSAVEL
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
        } else if (decoded.roles === "ROLE_CUIDADOR") {
          // Faz a consulta dos dados do cuidador usando o e-mail
          try {
            const cuidadorResponse = await axios.post(
              "http://zlo-hub-app.us-east-1.elasticbeanstalk.com/api/cuidadores/buscar-por-email",
              {
                email: decoded.sub, // Usa o email extraído do token JWT
              },
              {
                headers: {
                  Authorization: `Bearer ${token}`, // Adiciona o token no cabeçalho da requisição
                },
              }
            );

            const cuidadorData = cuidadorResponse.data;
            console.log("Dados do Cuidador:", cuidadorData);

            // Armazena os dados no localStorage
            localStorage.setItem("cuidadorData", JSON.stringify(cuidadorData));

            // Redireciona para a página do cuidador
            navigate("/cuidador");
          } catch (error) {
            console.error("Erro ao buscar dados do cuidador:", error);
            toast.error(
              "Erro ao buscar dados do cuidador. Tente novamente mais tarde."
            );
          }
        } else if (decoded.roles === "ROLE_ADMIN") {
          navigate("/admin");
        } else {
          console.error("Role desconhecida:", decoded.roles);
        }
      } else {
        console.error("Token JWT não recebido.");
      }
    } catch (error) {
      console.error("Erro no Login:", error);

      // Verifica se existe uma mensagem no response.data e exibe no toaster
      if (error.response && error.response.data) {
        toast.error(error.response.data);
      } else {
        toast.error("Erro ao realizar o login. Tente novamente.");
      }
    }
  };

  const handleRegisterClick = () => {
    navigate("/register"); // Redireciona para a página de cadastro
  };

  const handleRecoverClick = () => {
    navigate("/recoverPassword"); // Redireciona para a página de recuperação de acesso
  };

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
