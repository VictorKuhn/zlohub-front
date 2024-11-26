// src/components/ModalDetalhesCuidador/ModalDetalhesCuidador.jsx
import React from "react";
import { FaMapMarkerAlt, FaPhone, FaEnvelope } from "react-icons/fa";
import {
  ModalOverlay,
  ModalContent,
  CloseButton,
  ModalTitle,
  ModalInfoGroup,
  ModalInfoTitle,
  ModalInfoText,
  ModalSection,
  SubmitButton,
} from "./ModalDetalhesCuidador.styles";

const ModalDetalhesCuidador = ({ cuidador, onClose }) => {
  return (
    <ModalOverlay onClick={onClose}>
      <ModalContent onClick={(e) => e.stopPropagation()}>
        <CloseButton onClick={onClose}>×</CloseButton>
        <ModalTitle>
          {cuidador.nome} {cuidador.sobrenome}
        </ModalTitle>

        <ModalSection>
          <ModalInfoGroup>
            <ModalInfoTitle>
              <FaMapMarkerAlt /> Localização:
            </ModalInfoTitle>
            <ModalInfoText>
              {cuidador.cidade} - {cuidador.estado}
            </ModalInfoText>
          </ModalInfoGroup>

          <ModalInfoGroup>
            <ModalInfoTitle>
              <FaPhone /> Contato:
            </ModalInfoTitle>
            <ModalInfoText>{cuidador.telefoneContato1}</ModalInfoText>
          </ModalInfoGroup>

          <ModalInfoGroup>
            <ModalInfoTitle>
              <FaEnvelope /> Email:
            </ModalInfoTitle>
            <ModalInfoText>{cuidador.emailContato}</ModalInfoText>
          </ModalInfoGroup>
        </ModalSection>

        <ModalSection>
          <ModalInfoGroup>
            <ModalInfoTitle>Experiência:</ModalInfoTitle>
            <ModalInfoText>
              {cuidador.tempoExperiencia} anos
            </ModalInfoText>
          </ModalInfoGroup>

          <ModalInfoGroup>
            <ModalInfoTitle>Formação:</ModalInfoTitle>
            <ModalInfoText>
              {cuidador.formacao || "Não informado"}
            </ModalInfoText>
          </ModalInfoGroup>

          <ModalInfoGroup>
            <ModalInfoTitle>Habilidades:</ModalInfoTitle>
            <ModalInfoText>
              {cuidador.habilidades || "Não informado"}
            </ModalInfoText>
          </ModalInfoGroup>
        </ModalSection>

        <ModalSection>
          <ModalInfoTitle>Referências:</ModalInfoTitle>
          <ModalInfoText>
            {cuidador.referencia1 && (
              <div>
                {cuidador.referencia1} - {cuidador.telefoneReferencia1}
              </div>
            )}
            {cuidador.referencia2 && (
              <div>
                {cuidador.referencia2} - {cuidador.telefoneReferencia2}
              </div>
            )}
            {cuidador.referencia3 && (
              <div>
                {cuidador.referencia3} - {cuidador.telefoneReferencia3}
              </div>
            )}
          </ModalInfoText>
        </ModalSection>

        <SubmitButton onClick={onClose}>Fechar</SubmitButton>
      </ModalContent>
    </ModalOverlay>
  );
};

export default ModalDetalhesCuidador;