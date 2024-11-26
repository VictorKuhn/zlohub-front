// src/components/CardCuidador/CardCuidador.jsx
import React, { useState } from "react";
import {
  CardContainer,
  CardTitle,
  CardInfo,
  ViewMoreButton,
} from "./CardCuidador.styles";
import ModalDetalhesCuidador from "../ModalDetalhesCuidador/ModalDetalhesCuidador";

const CardCuidador = ({ cuidador }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <CardContainer>
        <CardTitle>{cuidador.nome}</CardTitle>
        <CardInfo>
          <strong>Experiência:</strong> {cuidador.tempoExperiencia} anos
        </CardInfo>
        <CardInfo>
          <strong>Formação:</strong> {cuidador.formacao || "Não informado"}
        </CardInfo>
        <CardInfo>
          <strong>Habilidades:</strong> {cuidador.habilidades || "Não informado"}
        </CardInfo>
        <ViewMoreButton onClick={() => setIsModalOpen(true)}>
          Ver mais
        </ViewMoreButton>
      </CardContainer>
      {isModalOpen && (
        <ModalDetalhesCuidador
          cuidador={cuidador}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </>
  );
};

export default CardCuidador;
