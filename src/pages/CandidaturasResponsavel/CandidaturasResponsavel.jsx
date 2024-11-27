import React, { useEffect, useState } from "react";
import axios from "axios";
import Header from "../../components/Header/Header";
import LateralBar from "../../components/LateralBar/LateralBar";
import CardCandidato from "../../components/CardCandidato/CardCandidato";
import ModalCandidato from "../../components/ModalCandidato/ModalCandidato.jsx";
import {
  Container,
  Content,
  Title,
  CardsContainer,
} from "./CandidaturasResponsavel.styles";
import toast, { Toaster } from "react-hot-toast";

const CandidaturasResponsavel = () => {
  const [candidaturas, setCandidaturas] = useState([]);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [selectedCandidatura, setSelectedCandidatura] = useState(null);

  const responsavelData = JSON.parse(localStorage.getItem("responsavelData"));

  // Função para exibir mensagens de sucesso ou erro
  const onToastMessage = (type, message) => {
    if (type === "success") {
      toast.success(message);
    } else if (type === "error") {
      toast.error(message);
    }
  };

  // Fetch candidaturas relacionadas às vagas do responsável
  useEffect(() => {
    const fetchCandidaturas = async () => {
      try {
        // Busca as vagas pelo CPF do responsável
        const vagasResponse = await axios.get(
          `http://localhost:8030/api/vagas/responsavel/${responsavelData.cpfRes}`
        );
        const vagas = vagasResponse.data;

        // Busca as candidaturas de cada vaga
        const candidaturasPromises = vagas.map((vaga) =>
          axios.get(`http://localhost:8030/api/candidaturas/vaga/${vaga.id}`)
        );

        const candidaturasResponses = await Promise.all(candidaturasPromises);
        const allCandidaturas = candidaturasResponses.flatMap(
          (response) => response.data
        );

        // Para cada candidatura, busca os dados do cuidador
        const candidaturasWithCuidadores = await Promise.all(
          allCandidaturas.map(async (candidatura) => {
            try {
              const cuidadorResponse = await axios.get(
                `http://localhost:8030/api/cuidadores/${candidatura.cuidadorId}`
              );
              return { ...candidatura, cuidador: cuidadorResponse.data };
            } catch (error) {
              console.error(
                `Erro ao buscar dados do cuidador com ID ${candidatura.cuidadorId}:`,
                error
              );
              return { ...candidatura, cuidador: null }; // Marca como nulo se falhar
            }
          })
        );

        setCandidaturas(candidaturasWithCuidadores);
      } catch (error) {
        console.error("Erro ao carregar candidaturas:", error);
        toast.error(
          "Erro ao carregar candidaturas. Tente novamente mais tarde."
        );
      }
    };

    fetchCandidaturas();
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
        <Title>Candidaturas Recebidas</Title>
        <CardsContainer>
          {candidaturas.map((candidatura) => (
            <CardCandidato
              key={candidatura.id}
              candidatura={candidatura}
              onClick={() => setSelectedCandidatura(candidatura)}
            />
          ))}
        </CardsContainer>
      </Content>
      {selectedCandidatura && (
        <ModalCandidato
          candidatura={selectedCandidatura}
          onClose={() => setSelectedCandidatura(null)}
          onToastMessage={onToastMessage} // Passa a função para o modal
        />
      )}
    </Container>
  );
};

export default CandidaturasResponsavel;