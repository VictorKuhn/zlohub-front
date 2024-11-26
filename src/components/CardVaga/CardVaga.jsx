import React, { useState } from "react";
import { FaMapMarkerAlt } from "react-icons/fa";
import {
  CardContainer,
  CardTitle,
  CardInfo,
  CardLocation,
  ViewMoreButton,
} from "./CardVaga.styles";
import ModalDetalhesVaga from "../ModalDetalhesVaga/ModalDetalhesVaga";

const CardVaga = ({ vaga, onToastMessage }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const truncateText = (text, maxLength) => {
    return text.length > maxLength ? `${text.substring(0, maxLength)}...` : text;
  };

  return (
    <>
      <CardContainer>
        <CardTitle title={vaga.titulo}>
          {truncateText(vaga.titulo, 40)}
        </CardTitle>
        <CardInfo>
          <strong>Doença:</strong> {vaga.doencaDiagnosticada}
        </CardInfo>
        <CardInfo>
          <strong>Idade:</strong> {vaga.idadeDependente} anos
        </CardInfo>
        <CardLocation>
          <FaMapMarkerAlt /> {vaga.cidade} - {vaga.estado}
        </CardLocation>
        <ViewMoreButton onClick={() => setIsModalOpen(true)}>
          Ver mais
        </ViewMoreButton>
      </CardContainer>
      {isModalOpen && (
        <ModalDetalhesVaga
          vaga={vaga}
          onClose={() => setIsModalOpen(false)}
          onToastMessage={onToastMessage}
        />
      )}
    </>
  );
};

export default CardVaga;