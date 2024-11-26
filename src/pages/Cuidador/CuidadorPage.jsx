import React, { useEffect, useState } from "react";
import Header from "../../components/Header/Header";
import LateralBar from "../../components/LateralBar/LateralBar";
import ListaDeVagas from "../../components/ListaDeVagas/ListaDeVagas";
import ListaDeCandidaturas from "../../components/ListaDeCandidaturas/ListaDeCandidaturas";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { TitleWithGradientUnderline, Container, Content } from "./CuidadorPage.styles";

const CuidadorPage = () => {
  const [vagas, setVagas] = useState([]);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [candidaturas, setCandidaturas] = useState([]);

  // Fetch vagas
  useEffect(() => {
    const fetchVagas = async () => {
      try {
        const response = await axios.get("http://localhost:8030/api/vagas");
        setVagas(response.data.filter((vaga) => vaga.status === "ATIVA"));
      } catch (error) {
        console.error("Erro ao carregar vagas:", error);
        toast.error("Erro ao carregar vagas. Tente novamente mais tarde.");
      }
    };

    fetchVagas();
  }, []);

  const handleToastMessage = (type, message) => {
    if (type === "success") {
      toast.success(message);
    } else if (type === "error") {
      toast.error(message);
    }
  };

  const toggleSidebar = () => {
    setIsMobileMenuOpen((prev) => !prev);
    console.log("Dropdown Toggle:", !isMobileMenuOpen); // Adicionando log para depuração
  };

  // Fetch candidaturas
  useEffect(() => {
    const fetchCandidaturas = async () => {
      try {
        const cuidadorData = JSON.parse(localStorage.getItem("cuidadorData"));
        const response = await axios.get(
          `http://localhost:8030/api/candidaturas/cuidador/${cuidadorData.id}`
        );
        setCandidaturas(response.data);
      } catch (error) {
        console.error("Erro ao carregar candidaturas:", error);
        toast.error("Erro ao carregar candidaturas. Tente novamente mais tarde.");
      }
    };

    fetchCandidaturas();
  }, []);

  return (
    <Container>
      <Header onToggleSidebar={toggleSidebar} />
      <LateralBar isMobileMenuOpen={isMobileMenuOpen} />
      <Content>
        <Toaster position="top-right" reverseOrder={false} />

        {/* Lista de Vagas */}
        <TitleWithGradientUnderline>Vagas</TitleWithGradientUnderline>
        <ListaDeVagas vagas={vagas} onToastMessage={handleToastMessage} />

        {/* Lista de Candidaturas */}
        <TitleWithGradientUnderline>Minhas Candidaturas</TitleWithGradientUnderline>
        <ListaDeCandidaturas candidaturas={candidaturas} />
      </Content>
    </Container>
  );
};

export default CuidadorPage;