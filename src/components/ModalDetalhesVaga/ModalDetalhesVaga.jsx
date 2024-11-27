import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaArrowLeft, FaTimes } from "react-icons/fa";
import { jwtDecode } from "jwt-decode"; // Certifique-se de ter instalado essa biblioteca
import {
  ModalOverlay,
  ModalContent,
  CloseButton,
  BackButton,
  SlideContainer,
  ModalTitle,
  ModalInfoGroup,
  ModalInfoTitle,
  ModalInfoText,
  InputField,
  TextArea,
  SubmitButton,
  CheckboxContainer,
  CharacterCount,
} from "./ModalDetalhesVaga.styles";

const ModalDetalhesVaga = ({ vaga, onClose, onToastMessage }) => {
  const [isApplying, setIsApplying] = useState(false);
  const [valorHora, setValorHora] = useState(""); // Input para valor por hora
  const [mensagemEnvio, setMensagemEnvio] = useState(""); // Input para mensagem
  const [politicaPrivacidade, setPoliticaPrivacidade] = useState(false); // Checkmark de política
  const [userRole, setUserRole] = useState(null); // Role do usuário

  const cuidadorData = JSON.parse(localStorage.getItem("cuidadorData"));

  // Decodificar o token para obter a role
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decoded = jwtDecode(token);
        setUserRole(decoded.roles);
      } catch (error) {
        console.error("Erro ao decodificar o token:", error);
      }
    }
  }, []);

  const handleApply = () => {
    setIsApplying(true);
  };

  const handleBack = () => {
    setIsApplying(false);
  };

  const handleValorHoraChange = (e) => {
    let valor = e.target.value.replace(/[^\d]/g, ""); // Remove caracteres não numéricos
    if (valor.length > 5) valor = valor.slice(0, 5); // Limita a 5 números no total

    if (valor.length <= 2) {
      valor = `R$0,${valor.padEnd(2, "0")}`;
    } else {
      valor = `R$${valor.slice(0, -2)},${valor.slice(-2)}`;
    }

    setValorHora(valor);
  };

  const handleSubmit = async () => {
    if (!politicaPrivacidade) {
      onToastMessage(
        "error",
        "Você precisa aceitar as políticas da plataforma."
      );
      return;
    }

    try {
      const valorSemMascara = parseFloat(
        valorHora.replace(/[^\d]/g, "").slice(0, -2)
      );
      const candidaturaData = {
        vaga: { id: vaga.id },
        cuidadorId: cuidadorData.id,
        valorHora: valorSemMascara,
        mensagemEnvio,
        politicaPrivacidade,
      };

      await axios.post(
        "http://localhost:8030/api/candidaturas",
        candidaturaData
      );

      // Notifica o componente pai sobre o sucesso
      onToastMessage("success", "Candidatura enviada com sucesso!");
      onClose(); // Fecha o modal após sucesso
    } catch (error) {
      console.error("Erro ao enviar candidatura:", error);
      // Notifica o componente pai sobre o erro
      onToastMessage("error", "Ocorreu um erro ao enviar a candidatura.");
    }
  };

  return (
    <ModalOverlay onClick={onClose}>
      <ModalContent onClick={(e) => e.stopPropagation()}>
        <CloseButton onClick={onClose} data-testid="close-button">
          <FaTimes />
        </CloseButton>
        {!isApplying ? (
          <SlideContainer>
            <ModalTitle>{vaga.titulo}</ModalTitle>
            <ModalInfoGroup>
              <ModalInfoTitle>Descrição:</ModalInfoTitle>
              <ModalInfoText>{vaga.descricao}</ModalInfoText>
            </ModalInfoGroup>
            <ModalInfoGroup>
              <ModalInfoTitle>Local:</ModalInfoTitle>
              <ModalInfoText>
                {vaga.cidade} - {vaga.estado}
              </ModalInfoText>
            </ModalInfoGroup>
            <ModalInfoGroup>
              <ModalInfoTitle>Idade do Dependente:</ModalInfoTitle>
              <ModalInfoText>{vaga.idadeDependente}</ModalInfoText>
            </ModalInfoGroup>
            <ModalInfoGroup>
              <ModalInfoTitle>Doença Diagnosticada:</ModalInfoTitle>
              <ModalInfoText>{vaga.doencaDiagnosticada}</ModalInfoText>
            </ModalInfoGroup>
            {/* Exibe o botão apenas se a role for ROLE_CUIDADOR */}
            {userRole === "ROLE_CUIDADOR" && (
              <SubmitButton onClick={handleApply}>
                Quero me candidatar
              </SubmitButton>
            )}
          </SlideContainer>
        ) : (
          <SlideContainer>
            <BackButton onClick={handleBack}>
              <FaArrowLeft />
            </BackButton>
            <ModalTitle>Candidatar-se à vaga</ModalTitle>
            <InputField
              type="text"
              placeholder="Valor por hora (R$)"
              value={valorHora}
              onChange={handleValorHoraChange}
            />
            <TextArea
              placeholder="Mensagem para o responsável pela vaga"
              value={mensagemEnvio}
              onChange={(e) => {
                const newValue = e.target.value;
                if (newValue.length <= 255) {
                  setMensagemEnvio(newValue);
                }
              }}
            />
            <CharacterCount>
              {mensagemEnvio.length}/255 caracteres
            </CharacterCount>
            <CheckboxContainer>
              <label>
                <input
                  type="checkbox"
                  checked={politicaPrivacidade}
                  onChange={(e) => setPoliticaPrivacidade(e.target.checked)}
                />
                Aceito as políticas da plataforma
              </label>
            </CheckboxContainer>
            <SubmitButton onClick={handleSubmit}>Candidatar-se</SubmitButton>
          </SlideContainer>
        )}
      </ModalContent>
    </ModalOverlay>
  );
};

export default ModalDetalhesVaga;