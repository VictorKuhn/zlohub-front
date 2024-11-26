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
  CheckboxContainer,
} from "./PerfilCuidador.styles";

const PerfilCuidador = () => {
  const [cuidadorData, setCuidadorData] = useState({});
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

      if (!isTokenValid || decoded.roles !== "ROLE_CUIDADOR") {
        localStorage.removeItem("token");
        localStorage.removeItem("cuidadorData");
        navigate("/login");
      }
    } catch (error) {
      console.error("Erro ao decodificar o token:", error);
      navigate("/login");
    }

    const storedData = JSON.parse(localStorage.getItem("cuidadorData"));
    if (storedData) {
      setCuidadorData(storedData);
      setFormData(storedData);
      setCep(storedData.cep || "");
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

    try {
      await axios.put(
        `http://localhost:8030/api/cuidadores/${cuidadorData.id}`,
        formData
      );
      localStorage.setItem("cuidadorData", JSON.stringify(formData));
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
              name="nome"
              value={formData.nome || ""}
              onChange={handleInputChange}
            />
          </InputContainer>
          <InputContainer>
            <Label>Sobrenome</Label>
            <Input
              type="text"
              name="sobrenome"
              value={formData.sobrenome || ""}
              onChange={handleInputChange}
            />
          </InputContainer>
        </Section>
        <Section>
          <InputContainer>
            <Label>CPF</Label>
            <Input type="text" value={formData.cpf || ""} disabled />
          </InputContainer>
          <InputContainer>
            <Label>Data de Nascimento</Label>
            <Input type="date" value={formData.dataNascimento || ""} disabled />
          </InputContainer>
        </Section>
        <Section>
          <InputContainer>
            <Label>CEP</Label>
            <Input
              type="text"
              name="cep"
              value={cep || formData.cep || ""}
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
            <Label>Telefone de Contato 1</Label>
            <Input
              type="text"
              name="telefoneContato1"
              value={formData.telefoneContato1 || ""}
              onChange={handleInputChange}
            />
          </InputContainer>
          <InputContainer>
            <Label>Telefone de Contato 2</Label>
            <Input
              type="text"
              name="telefoneContato2"
              value={formData.telefoneContato2 || ""}
              onChange={handleInputChange}
            />
          </InputContainer>
        </Section>
        <Section>
          <InputContainer>
            <Label>E-mail</Label>
            <Input
              type="email"
              name="emailContato"
              value={formData.emailContato || ""}
              onChange={handleInputChange}
            />
          </InputContainer>
        </Section>
        <Section>
          <InputContainer>
            <Label>Tempo de Experiência</Label>
            <Input
              type="number"
              name="tempoExperiencia"
              value={formData.tempoExperiencia || ""}
              onChange={handleInputChange}
            />
          </InputContainer>
          <InputContainer>
            <Label>Formação</Label>
            <Input
              type="text"
              name="formacao"
              value={formData.formacao || ""}
              onChange={handleInputChange}
            />
          </InputContainer>
          <InputContainer>
            <Label>Habilidades</Label>
            <Input
              type="text"
              name="habilidades"
              value={formData.habilidades || ""}
              onChange={handleInputChange}
            />
          </InputContainer>
        </Section>
        <Section>
          <InputContainer>
            <Label>Referência 1</Label>
            <Input
              type="text"
              name="referencia1"
              value={formData.referencia1 || ""}
              onChange={handleInputChange}
            />
          </InputContainer>
          <InputContainer>
            <Label>Telefone da Referência 1</Label>
            <Input
              type="text"
              name="telefoneReferencia1"
              value={formData.telefoneReferencia1 || ""}
              onChange={handleInputChange}
            />
          </InputContainer>
        </Section>
        <Section>
          <InputContainer>
            <Label>Referência 2</Label>
            <Input
              type="text"
              name="referencia2"
              value={formData.referencia2 || ""}
              onChange={handleInputChange}
            />
          </InputContainer>
          <InputContainer>
            <Label>Telefone da Referência 2</Label>
            <Input
              type="text"
              name="telefoneReferencia2"
              value={formData.telefoneReferencia2 || ""}
              onChange={handleInputChange}
            />
          </InputContainer>
        </Section>
        <Section>
          <InputContainer>
            <Label>Referência 3</Label>
            <Input
              type="text"
              name="referencia3"
              value={formData.referencia3 || ""}
              onChange={handleInputChange}
            />
          </InputContainer>
          <InputContainer>
            <Label>Telefone da Referência 3</Label>
            <Input
              type="text"
              name="telefoneReferencia3"
              value={formData.telefoneReferencia3 || ""}
              onChange={handleInputChange}
            />
          </InputContainer>
        </Section>
        <CheckboxContainer>
          <label>
            <input
              type="checkbox"
              checked={formData.politicaAceita || false}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  politicaAceita: e.target.checked,
                }))
              }
            />
            Aceito as políticas da plataforma
          </label>
        </CheckboxContainer>
        <Button type="submit">Alterar dados</Button>
      </Form>
    </Container>
  );
};

export default PerfilCuidador;