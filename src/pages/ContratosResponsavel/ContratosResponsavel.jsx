import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";
import Header from "../../components/Header/Header";
import LateralBar from "../../components/LateralBar/LateralBar";
import CardCandidato from "../../components/CardCandidato/CardCandidato";
import ModalContratoResponsavel from "../../components/ModalContratoResponsavel/ModalContratoResponsavel";
import {
  Container,
  Content,
  Title,
  CardsContainer,
} from "./ContratosResponsavel.styles";
import toast, { Toaster } from "react-hot-toast";

const ContratosResponsavel = () => {
  const [contratos, setContratos] = useState([]);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [selectedContrato, setSelectedContrato] = useState(null);

  const responsavelData = JSON.parse(localStorage.getItem("responsavelData"));

  // Função para buscar as vagas
  const fetchVagas = async (cpfRes) => {
    try {
      const response = await axios.get(
        `http://zlo-hub-app.us-east-1.elasticbeanstalk.com/api/vagas/responsavel/${cpfRes}`
      );
      return response.data;
    } catch (error) {
      console.error("Erro ao buscar vagas:", error);
      toast.error("Erro ao buscar vagas. Tente novamente mais tarde.");
      return [];
    }
  };

  // Função para buscar candidaturas de uma vaga
  const fetchCandidaturasForVaga = useCallback(async (vaga) => {
    try {
      const response = await axios.get(
        `http://zlo-hub-app.us-east-1.elasticbeanstalk.com/api/candidaturas/vaga/${vaga.id}`
      );
      return response.data.map((candidatura) => ({
        ...candidatura,
        vaga,
      }));
    } catch (error) {
      console.error(
        `Erro ao buscar candidaturas para a vaga ${vaga.id}:`,
        error
      );
      return [];
    }
  }, []);

  // Função para buscar candidaturas de todas as vagas
  const fetchAllCandidaturas = useCallback(
    async (vagas) => {
      const candidaturasPromises = vagas.map(fetchCandidaturasForVaga);
      const candidaturas = (await Promise.all(candidaturasPromises)).flat();
      return candidaturas.filter((candidatura) => candidatura.status === "ACEITO");
    },
    [fetchCandidaturasForVaga]
  );

  // Função para buscar dados de cuidadores
  const fetchCuidadorForContrato = async (contrato) => {
    try {
      const response = await axios.get(
        `http://zlo-hub-app.us-east-1.elasticbeanstalk.com/api/cuidadores/${contrato.cuidadorId}`
      );
      return { ...contrato, cuidador: response.data };
    } catch (error) {
      console.error(
        `Erro ao buscar dados do cuidador com ID ${contrato.cuidadorId}:`,
        error
      );
      return { ...contrato, cuidador: null };
    }
  };

  // Função para carregar todos os contratos
  const fetchContratos = useCallback(async () => {
    try {
      const vagas = await fetchVagas(responsavelData.cpfRes);
      const candidaturasAceitas = await fetchAllCandidaturas(vagas);
      const contratosComCuidadores = await Promise.all(
        candidaturasAceitas.map(fetchCuidadorForContrato)
      );
      setContratos(contratosComCuidadores);
    } catch (error) {
      console.error("Erro ao carregar contratos:", error);
      toast.error("Erro ao carregar contratos. Tente novamente mais tarde.");
    }
  }, [responsavelData.cpfRes, fetchAllCandidaturas]);

  useEffect(() => {
    fetchContratos();
  }, [fetchContratos]);

  const toggleSidebar = () => {
    setIsMobileMenuOpen((prev) => !prev);
  };

  return (
    <Container>
      <Header onToggleSidebar={toggleSidebar} />
      <LateralBar isMobileMenuOpen={isMobileMenuOpen} />
      <Toaster position="top-right" reverseOrder={false} />
      <Content>
        <Title>Contratos Aceitos</Title>
        <CardsContainer>
          {contratos.map((contrato) => (
            <CardCandidato
              key={contrato.id}
              candidatura={contrato}
              onClick={() => setSelectedContrato(contrato)}
            />
          ))}
        </CardsContainer>
      </Content>
      {selectedContrato && (
        <ModalContratoResponsavel
          contrato={selectedContrato}
          onClose={() => setSelectedContrato(null)}
        />
      )}
    </Container>
  );
};

export default ContratosResponsavel;