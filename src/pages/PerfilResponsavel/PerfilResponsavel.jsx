import React, { useState, useEffect } from "react";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";
import Header from "../../components/Header/Header";
import LateralBar from "../../components/LateralBar/LateralBar";
import {
  Container,
  Form,
  InputContainer,
  Label,
  Input,
  Button,
  Title,
  Section,
} from "./PerfilResponsavel.styles";

const PerfilResponsavel = () => {
  const [, setResponsavelData] = useState({});
  const [formData, setFormData] = useState({});
  const [cep, setCep] = useState("");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/login");
      return;
    }

    try {
      const decoded = jwtDecode(token);
      const isTokenValid = decoded.exp * 1000 > Date.now();

      if (!isTokenValid || decoded.roles !== "ROLE_RESPONSÁVEL") {
        localStorage.removeItem("token");
        localStorage.removeItem("responsavelData");
        navigate("/login");
      }
    } catch (error) {
      console.error("Erro ao decodificar o token:", error);
      navigate("/login");
    }

    const storedData = JSON.parse(localStorage.getItem("responsavelData"));
    if (storedData) {
      setResponsavelData(storedData);
      setFormData(storedData);
      setCep(storedData.cepRes || "");
    }
  }, [navigate]);

  const toggleSidebar = () => {
    setIsMobileMenuOpen((prev) => !prev);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCepChange = (e) => {
    let newCep = e.target.value.replace(/\D/g, ""); // Remove caracteres não numéricos
    if (newCep.length > 8) newCep = newCep.slice(0, 8); // Limita a 8 dígitos

    // Aplica a máscara xxxxx-xxx
    if (newCep.length > 5) {
      newCep = `${newCep.slice(0, 5)}-${newCep.slice(5)}`;
    }

    setCep(newCep);

    // Quando o CEP estiver completo, tenta buscar os dados do endereço
    if (newCep.length === 9) {
      const rawCep = newCep.replace("-", ""); // Remove o hífen para consulta
      axios
        .get(`https://viacep.com.br/ws/${rawCep}/json/`)
        .then((response) => {
          if (response.data) {
            setFormData((prev) => ({
              ...prev,
              logradouro: response.data.logradouro || "",
              bairro: response.data.bairro || "",
              cidade: response.data.localidade || "",
              estado: response.data.uf || "",
            }));
          }
        })
        .catch((error) => {
          console.error("Erro ao buscar dados do CEP:", error);
          toast.error("CEP inválido ou não encontrado.");
        });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const updatedData = {
      ...formData,
      planoAssinado: 1, // Sempre será 1
    };

    try {
      await axios.put(
        "http://localhost:8080/api/responsible/commonuser/update",
        updatedData
      );
      localStorage.setItem("responsavelData", JSON.stringify(updatedData));
      toast.success("Dados atualizados com sucesso!");
    } catch (error) {
      console.error("Erro ao atualizar dados:", error);
      toast.error("Não foi possível atualizar seus dados.");
    }
  };

  return (
    <Container>
      <Header onToggleSidebar={toggleSidebar} />
      <LateralBar isMobileMenuOpen={isMobileMenuOpen} />
      <Toaster position="top-center" reverseOrder={false} />
      <Title>Editar Perfil</Title>
      <Form onSubmit={handleSubmit}>
        <Section>
          <InputContainer>
            <Label>Nome</Label>
            <Input
              type="text"
              name="nomeRes"
              value={formData.nomeRes || ""}
              onChange={handleInputChange}
            />
          </InputContainer>
          <InputContainer>
            <Label>CPF</Label>
            <Input type="text" value={formData.cpfRes || ""} disabled />
          </InputContainer>
        </Section>
        <Section>
          <InputContainer>
            <Label>Idade</Label>
            <Input
              type="number"
              name="idadeRes"
              value={formData.idadeRes || ""}
              onChange={handleInputChange}
            />
          </InputContainer>
          <InputContainer>
            <Label>RG</Label>
            <Input
              type="text"
              name="rgRes"
              value={formData.rgRes || ""}
              onChange={handleInputChange}
            />
          </InputContainer>
        </Section>
        <Section>
          <InputContainer>
            <Label>CEP</Label>
            <Input
              type="text"
              name="cepRes"
              value={cep || formData.cepRes || ""}
              onChange={handleCepChange}
            />
          </InputContainer>
          <InputContainer>
            <Label>Logradouro</Label>
            <Input
              type="text"
              name="logradouro"
              value={formData.logradouro || ""}
              disabled
            />
          </InputContainer>
        </Section>
        <Section>
          <InputContainer>
            <Label>Número</Label>
            <Input
              type="text"
              name="numero"
              value={formData.numero || ""}
              onChange={handleInputChange}
            />
          </InputContainer>
          <InputContainer>
            <Label>Complemento</Label>
            <Input
              type="text"
              name="complemento"
              value={formData.complemento || ""}
              onChange={handleInputChange}
            />
          </InputContainer>
        </Section>
        <Section>
          <InputContainer>
            <Label>Bairro</Label>
            <Input
              type="text"
              name="bairro"
              value={formData.bairro || ""}
              disabled
            />
          </InputContainer>
          <InputContainer>
            <Label>Cidade</Label>
            <Input
              type="text"
              name="cidade"
              value={formData.cidade || ""}
              disabled
            />
          </InputContainer>
          <InputContainer>
            <Label>Estado</Label>
            <Input
              type="text"
              name="estado"
              value={formData.estado || ""}
              disabled
            />
          </InputContainer>
        </Section>
        <Section>
          <InputContainer>
            <Label>Contato 1</Label>
            <Input
              type="text"
              name="contato1Res"
              value={formData.contato1Res || ""}
              onChange={handleInputChange}
            />
          </InputContainer>
          <InputContainer>
            <Label>Contato 2</Label>
            <Input
              type="text"
              name="contato2Res"
              value={formData.contato2Res || ""}
              onChange={handleInputChange}
            />
          </InputContainer>
          <InputContainer>
            <Label>Contato 3</Label>
            <Input
              type="text"
              name="contato3Res"
              value={formData.contato3Res || ""}
              onChange={handleInputChange}
            />
          </InputContainer>
        </Section>
        <Section>
          <InputContainer>
            <Label>E-mail</Label>
            <Input
              type="email"
              name="emailRes"
              value={formData.emailRes || ""}
              onChange={handleInputChange}
            />
          </InputContainer>
        </Section>
        <p>Caso deseje alterar sua senha, retorne a tela de Login e clique em "Esqueci a senha".</p>
        <Button type="submit">Atualizar Dados</Button>
      </Form>
    </Container>
  );
};

export default PerfilResponsavel;