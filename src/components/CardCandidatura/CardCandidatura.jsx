import React, { useState } from "react";
import { FaMapMarkerAlt } from "react-icons/fa";
import {
  CardContainer,
  CardTitle,
  CardInfo,
  CardLocation,
  ViewMoreButton,
} from "./CardCandidatura.styles";
import ModalDetalhesCandidatura from "../ModalDetalhesCandidatura/ModalDetalhesCandidatura";

const CardCandidatura = ({ candidatura, onToastMessage }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const truncateText = (text, maxLength) => {
    return text.length > maxLength ? `${text.substring(0, maxLength)}...` : text;
  };

  return (
    <>
      <CardContainer data-testid="card-candidatura">
        <CardTitle title={candidatura.vaga.titulo}>
          {truncateText(candidatura.vaga.titulo, 40)}
        </CardTitle>
        <CardInfo>
          <strong>Doença:</strong> {candidatura.vaga.doencaDiagnosticada}
        </CardInfo>
        <CardInfo>
          <strong>Idade:</strong> {candidatura.vaga.idadeDependente} anos
        </CardInfo>
        <CardInfo>
          <strong>R$:</strong> {candidatura.valorHora}
        </CardInfo>
        <CardInfo>
          <strong>Status:</strong> {candidatura.status}
        </CardInfo>
        <CardLocation>
          <FaMapMarkerAlt /> {candidatura.vaga.cidade} - {candidatura.vaga.estado}
        </CardLocation>
        <ViewMoreButton onClick={() => setIsModalOpen(true)}>
          Ver mais
        </ViewMoreButton>
      </CardContainer>
      {isModalOpen && (
        <ModalDetalhesCandidatura
          candidatura={candidatura}
          onClose={() => setIsModalOpen(false)}
          onToastMessage={onToastMessage}
        />
      )}
    </>
  );
};

export default CardCandidatura;