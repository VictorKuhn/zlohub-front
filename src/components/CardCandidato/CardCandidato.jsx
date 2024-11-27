import React from "react";
import { FaMapMarkerAlt } from "react-icons/fa";
import {
  CardContainer,
  CardTitle,
  CardInfo,
  CardLocation,
  ViewMoreButton,
} from "./CardCandidato.styles";

const CardCandidato = ({ candidatura, onClick }) => {
  const cuidador = candidatura.cuidador;

  // Valida se o cuidador existe antes de renderizar o card
  if (!cuidador) {
    return null; // Retorna null para não renderizar nada se os dados estiverem incompletos
  }

  return (
    <CardContainer>
      <CardTitle>{cuidador.nome}</CardTitle>
      <CardLocation>
        <FaMapMarkerAlt /> {cuidador.cidade} - {cuidador.estado}
      </CardLocation>
      <CardInfo>
        <strong>Experiência:</strong> {cuidador.tempoExperiencia} anos
      </CardInfo>
      <CardInfo>
        <strong>Valor/hora:</strong> R${candidatura.valorHora}
      </CardInfo>
      <CardInfo>
        <strong>Status:</strong> {candidatura.status}
      </CardInfo>
      <ViewMoreButton onClick={onClick}>Ver mais</ViewMoreButton>
    </CardContainer>
  );
};

export default CardCandidato;