import React, { useState } from "react";
import axios from "axios";
import {
  ModalOverlay,
  ModalContent,
  CloseButton,
  Form,
  Input,
  Label,
  Select,
  Button,
  Section,
  ModalTitle,
} from "./ModalCriarVaga.styles";

const ModalCriarVaga = ({ onClose, onToastMessage }) => {
  const responsavelData = JSON.parse(localStorage.getItem("responsavelData"));
  const [formData, setFormData] = useState({
    cpfResponsavel: responsavelData.cpfRes,
    titulo: "",
    descricao: "",
    dataHoraInicio: "",
    dataHoraFim: "",
    cidade: "",
    estado: "",
    tipoDependente: "",
    idadeDependente: "",
    doencaDiagnosticada: "",
    status: "ATIVA",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    if (
      !formData.titulo ||
      !formData.descricao ||
      !formData.dataHoraInicio ||
      !formData.dataHoraFim ||
      !formData.cidade ||
      !formData.estado ||
      !formData.tipoDependente ||
      !formData.idadeDependente ||
      !formData.doencaDiagnosticada
    ) {
      onToastMessage("error", "Confira os dados preenchidos.");
      return;
    }

    console.log("Dados enviados para a API:", formData);
    try {
      await axios.post("http://localhost:8030/api/vagas", formData);
      onToastMessage("success", "Vaga criada com sucesso.");
      onClose();
    } catch (error) {
      console.error("Erro ao criar vaga:", error);
      onToastMessage("error", "Erro ao criar a vaga.");
    }
  };

  return (
    <ModalOverlay onClick={onClose}>
      <ModalContent onClick={(e) => e.stopPropagation()}>
        <ModalTitle>Criar vaga</ModalTitle>
        <CloseButton onClick={onClose}>X</CloseButton>
        <Form>
          <Section>
            <Label>Título</Label>
            <Input
              type="text"
              name="titulo"
              value={formData.titulo}
              onChange={handleInputChange}
            />
          </Section>
          <Section>
            <Label>Descrição</Label>
            <Input
              type="text"
              name="descricao"
              value={formData.descricao}
              onChange={handleInputChange}
            />
          </Section>
          <Section>
            <Label>Data/Hora Início</Label>
            <Input
              type="datetime-local"
              name="dataHoraInicio"
              value={formData.dataHoraInicio}
              onChange={handleInputChange}
            />
          </Section>
          <Section>
            <Label>Data/Hora Fim</Label>
            <Input
              type="datetime-local"
              name="dataHoraFim"
              value={formData.dataHoraFim}
              onChange={handleInputChange}
            />
          </Section>
          <Section>
            <Label>Cidade</Label>
            <Input
              type="text"
              name="cidade"
              value={formData.cidade}
              onChange={handleInputChange}
            />
          </Section>
          <Section>
            <Label>Estado</Label>
            <Select
              name="estado"
              value={formData.estado}
              onChange={handleInputChange}
            >
              <option value="">Selecione</option>
              <option value="AC">AC</option>
              <option value="AL">AL</option>
              <option value="AP">AP</option>
              <option value="AM">AM</option>
              <option value="BA">BA</option>
              <option value="CE">CE</option>
              <option value="DF">DF</option>
              <option value="ES">ES</option>
              <option value="GO">GO</option>
              <option value="MA">MA</option>
              <option value="MT">MT</option>
              <option value="MS">MS</option>
              <option value="MG">MG</option>
              <option value="PA">PA</option>
              <option value="PB">PB</option>
              <option value="PR">PR</option>
              <option value="PE">PE</option>
              <option value="PI">PI</option>
              <option value="RJ">RJ</option>
              <option value="RN">RN</option>
              <option value="RS">RS</option>
              <option value="RO">RO</option>
              <option value="RR">RR</option>
              <option value="SC">SC</option>
              <option value="SP">SP</option>
              <option value="SE">SE</option>
              <option value="TO">TO</option>
              {/* Adicione outros estados */}
            </Select>
          </Section>
          <Section>
            <Label>Tipo de Dependente</Label>
            <Select
              name="tipoDependente"
              value={formData.tipoDependente}
              onChange={handleInputChange}
            >
              <option value="">Selecione</option>
              <option value="IDOSO">IDOSO</option>
              <option value="CRIANCA">CRIANCA</option>
            </Select>
          </Section>
          <Section>
            <Label>Idade do Dependente</Label>
            <Input
              type="number"
              name="idadeDependente"
              value={formData.idadeDependente}
              onChange={handleInputChange}
            />
          </Section>
          <Section>
            <Label>Doença Diagnosticada</Label>
            <Input
              type="text"
              name="doencaDiagnosticada"
              value={formData.doencaDiagnosticada}
              onChange={handleInputChange}
            />
          </Section>
          <Button type="button" onClick={handleSubmit}>
            Criar Vaga
          </Button>
        </Form>
      </ModalContent>
    </ModalOverlay>
  );
};

export default ModalCriarVaga;
