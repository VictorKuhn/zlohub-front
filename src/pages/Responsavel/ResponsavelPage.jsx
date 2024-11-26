import React, { useEffect, useState } from "react";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import Header from "../../components/Header/Header";
import LateralBar from "../../components/LateralBar/LateralBar";
import ListaDeCuidadores from "../../components/ListaDeCuidadores/ListaDeCuidadores";
import ListaDeVagas from "../../components/ListaDeVagas/ListaDeVagas";
import ModalCriarVaga from "../../components/ModalCriarVaga/ModalCriarVaga";
import {
  Container,
  Content,
  TitleSection,
  TitleWithGradientUnderline,
  CreateVagaButton,
  NoVagasText,
} from "./ResponsavelPage.styles";

const ResponsavelPage = () => {
  const [cuidadores, setCuidadores] = useState([]);
  const [minhasVagas, setMinhasVagas] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const responsavelData = JSON.parse(localStorage.getItem("responsavelData"));

  useEffect(() => {
    // Fetch cuidadores disponíveis
    const fetchCuidadores = async () => {
      try {
        const response = await axios.get("http://localhost:8030/api/cuidadores");
        setCuidadores(response.data);
      } catch (error) {
        console.error("Erro ao carregar cuidadores:", error);
        toast.error("Erro ao carregar cuidadores. Tente novamente mais tarde.");
      }
    };

    // Fetch vagas do responsável
    const fetchMinhasVagas = async () => {
      try {
        const response = await axios.get("http://localhost:8030/api/vagas");
        setMinhasVagas(
          response.data.filter(
            (vaga) => vaga.cpfResponsavel === responsavelData.cpfRes
          )
        );
      } catch (error) {
        console.error("Erro ao carregar vagas:", error);
        toast.error("Erro ao carregar vagas. Tente novamente mais tarde.");
      }
    };

    fetchCuidadores();
    fetchMinhasVagas();
  }, [responsavelData.cpfRes]);

  const handleToastMessage = (type, message) => {
    if (type === "success") {
      toast.success(message);
    } else if (type === "error") {
      toast.error(message);
    }
  };

  const toggleSidebar = () => {
    setIsMobileMenuOpen((prev) => !prev);
  };

  return (
    <Container>
      <Header onToggleSidebar={toggleSidebar} />
      <LateralBar isMobileMenuOpen={isMobileMenuOpen} />
      <Content>
        <Toaster position="top-right" reverseOrder={false} />

        {/* Lista de Cuidadores */}
        <TitleWithGradientUnderline>Cuidadores Disponíveis</TitleWithGradientUnderline>
        <ListaDeCuidadores cuidadores={cuidadores} />

        {/* Minhas Vagas */}
        <TitleSection>
          <TitleWithGradientUnderline>Minhas Vagas</TitleWithGradientUnderline>
          <CreateVagaButton onClick={() => setIsModalOpen(true)}>
            Criar Vaga
          </CreateVagaButton>
        </TitleSection>
        {minhasVagas.length > 0 ? (
          <ListaDeVagas vagas={minhasVagas} onToastMessage={handleToastMessage} />
        ) : (
          <NoVagasText>Você ainda não tem vagas criadas.</NoVagasText>
        )}

        {isModalOpen && (
          <ModalCriarVaga
            onClose={() => setIsModalOpen(false)}
            onToastMessage={handleToastMessage}
          />
        )}
      </Content>
    </Container>
  );
};

export default ResponsavelPage;