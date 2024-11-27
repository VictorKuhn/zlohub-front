import React, { useEffect, useState } from "react";
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
  const [selectedContrato, setSelectedContrato] = useState(null); // Estado para o contrato selecionado no modal

  const responsavelData = JSON.parse(localStorage.getItem("responsavelData"));

  // Fetch contratos relacionados às vagas do responsável
  useEffect(() => {
    const fetchContratos = async () => {
      try {
        // Busca as vagas pelo CPF do responsável
        const vagasResponse = await axios.get(
          `http://localhost:8030/api/vagas/responsavel/${responsavelData.cpfRes}`
        );
        const vagas = vagasResponse.data;

        // Busca as candidaturas de cada vaga e adiciona os detalhes da vaga a cada candidatura
        const candidaturasPromises = vagas.map(async (vaga) => {
          const candidaturasResponse = await axios.get(
            `http://localhost:8030/api/candidaturas/vaga/${vaga.id}`
          );
          return candidaturasResponse.data.map((candidatura) => ({
            ...candidatura,
            vaga, // Adiciona os detalhes da vaga à candidatura
          }));
        });

        const candidaturas = (await Promise.all(candidaturasPromises)).flat();

        // Filtra as candidaturas com status ACEITO
        const contratosAceitos = candidaturas.filter(
          (candidatura) => candidatura.status === "ACEITO"
        );

        // Para cada candidatura aceita, busca os dados do cuidador
        const contratosComCuidadores = await Promise.all(
          contratosAceitos.map(async (contrato) => {
            try {
              const cuidadorResponse = await axios.get(
                `http://localhost:8030/api/cuidadores/${contrato.cuidadorId}`
              );
              return { ...contrato, cuidador: cuidadorResponse.data };
            } catch (error) {
              console.error(
                `Erro ao buscar dados do cuidador com ID ${contrato.cuidadorId}:`,
                error
              );
              return { ...contrato, cuidador: null }; // Marca como nulo se falhar
            }
          })
        );

        setContratos(contratosComCuidadores);
      } catch (error) {
        console.error("Erro ao carregar contratos:", error);
        toast.error(
          "Erro ao carregar contratos. Tente novamente mais tarde."
        );
      }
    };

    fetchContratos();
  }, [responsavelData.cpfRes]);

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
              onClick={() => setSelectedContrato(contrato)} // Define o contrato selecionado ao clicar
            />
          ))}
        </CardsContainer>
      </Content>
      {selectedContrato && (
        <ModalContratoResponsavel
          contrato={selectedContrato}
          onClose={() => setSelectedContrato(null)} // Fecha o modal
        />
      )}
    </Container>
  );
};

export default ContratosResponsavel;