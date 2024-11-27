import React, { useEffect, useState } from "react";
import axios from "axios";
import Header from "../../components/Header/Header";
import LateralBar from "../../components/LateralBar/LateralBar";
import CardCandidatura from "../../components/CardCandidatura/CardCandidatura";
import {
  Container,
  Content,
  Title,
  CardsContainer,
} from "./ContratosCuidador.styles";
import toast, { Toaster } from "react-hot-toast";

const ContratosCuidador = () => {
  const [contratos, setContratos] = useState([]);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const cuidadorData = JSON.parse(localStorage.getItem("cuidadorData"));

  useEffect(() => {
    const fetchContratos = async () => {
      try {
        // Busca todas as candidaturas do cuidador
        const candidaturasResponse = await axios.get(
          `http://zlo-hub-app.us-east-1.elasticbeanstalk.com/api/candidaturas/cuidador/${cuidadorData.id}`
        );
        const candidaturas = candidaturasResponse.data;

        // Filtra as candidaturas com status "ACEITO"
        const contratosAceitos = candidaturas.filter(
          (candidatura) => candidatura.status === "ACEITO"
        );

        setContratos(contratosAceitos);
      } catch (error) {
        console.error("Erro ao carregar contratos:", error);
        toast.error("Erro ao carregar contratos. Tente novamente mais tarde.");
      }
    };

    fetchContratos();
  }, [cuidadorData.id]);

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
            <CardCandidatura
              key={contrato.id}
              candidatura={contrato}
              onToastMessage={toast}
            />
          ))}
        </CardsContainer>
      </Content>
    </Container>
  );
};

export default ContratosCuidador;
