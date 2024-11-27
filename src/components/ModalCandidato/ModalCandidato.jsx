import React, { useState } from "react";
import {
  ModalContainer,
  ModalContent,
  CloseButton,
  ModalTitle,
  ModalInfoGroup,
  ModalInfoTitle,
  ModalInfoText,
  CloseModalButton,
  StatusSelect,
  UpdateButton,
} from "./ModalCandidato.styles";
import { FaTimes } from "react-icons/fa";
import axios from "axios";

const ModalCandidato = ({ candidatura, onClose, onToastMessage }) => {
  const [selectedStatus, setSelectedStatus] = useState(candidatura.status);
  const [isUpdating, setIsUpdating] = useState(false);

  const handleStatusChange = (e) => {
    setSelectedStatus(e.target.value);
  };

  const handleStatusUpdate = async () => {
    setIsUpdating(true);
    try {
      const payload = {
        id: candidatura.id,
        status: selectedStatus,
      };

      await axios.patch("http://localhost:8030/api/candidaturas/status", payload);

      onToastMessage("success", "Status atualizado com sucesso!");
      candidatura.status = selectedStatus; // Atualiza o status localmente
      onClose(); // Fecha o modal após a atualização
    } catch (error) {
      console.error("Erro ao atualizar o status:", error);
      onToastMessage("error", "Erro ao atualizar o status. Tente novamente.");
    } finally {
      setIsUpdating(false);
    }
  };

  // Desabilitar alterações se o status for RECUSADO ou ACEITO
  const isStatusFinal = candidatura.status === "RECUSADO" || candidatura.status === "ACEITO";

  return (
    <ModalContainer>
      <ModalContent>
        <CloseButton onClick={onClose}>
          <FaTimes />
        </CloseButton>
        <ModalTitle>{candidatura.vaga.titulo}</ModalTitle>

        <ModalInfoGroup>
          <ModalInfoTitle>Descrição:</ModalInfoTitle>
          <ModalInfoText>{candidatura.vaga.descricao}</ModalInfoText>
        </ModalInfoGroup>

        <ModalInfoGroup>
          <ModalInfoTitle>Status Atual:</ModalInfoTitle>
          <ModalInfoText>{candidatura.status}</ModalInfoText>
        </ModalInfoGroup>

        {/* Input para alterar o status */}
        <ModalInfoGroup>
          <ModalInfoTitle>Alterar Status:</ModalInfoTitle>
          <StatusSelect
            value={selectedStatus}
            onChange={handleStatusChange}
            disabled={isUpdating || isStatusFinal} // Desabilita o select
          >
            <option value="AGUARDANDO">AGUARDANDO</option>
            <option value="RECUSADO">RECUSADO</option>
            <option value="ACEITO">ACEITO</option>
          </StatusSelect>
        </ModalInfoGroup>

        <UpdateButton
          onClick={handleStatusUpdate}
          disabled={isUpdating || isStatusFinal} // Desabilita o botão
        >
          {isUpdating ? "Atualizando..." : "Alterar Status"}
        </UpdateButton>

        <CloseModalButton onClick={onClose}>Fechar</CloseModalButton>
      </ModalContent>
    </ModalContainer>
  );
};

export default ModalCandidato;