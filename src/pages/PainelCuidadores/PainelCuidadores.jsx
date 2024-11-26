import React, { useEffect, useState } from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";
import Header from "../../components/Header/Header";
import toast, { Toaster } from "react-hot-toast";
import LateralBar from "../../components/LateralBar/LateralBar";
import CardCuidador from "../../components/CardCuidador/CardCuidador"; // Componente do Card do Cuidador
import {
  Container,
  TitleWithSearch,
  TitleWithGradientUnderline,
  SearchInput,
  CuidadoresContainer,
} from "./PainelCuidadores.styles";

const PainelCuidadores = () => {
  const [cuidadores, setCuidadores] = useState([]);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState(""); // Termo de busca
  const navigate = useNavigate();

  // Verifica o token JWT ao carregar a página
  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/login"); // Redireciona para login se não houver token
      return;
    }

    try {
      const decoded = jwtDecode(token);
      const isRoleResponsavel = decoded.roles === "ROLE_RESPONSÁVEL";
      const isTokenValid = decoded.exp * 1000 > Date.now();

      if (!isRoleResponsavel || !isTokenValid) {
        navigate("/login");
        return;
      }
    } catch (error) {
      console.error("Erro ao decodificar o token:", error);
      navigate("/login");
    }
  }, [navigate]);

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

  // Busca todos os cuidadores disponíveis
  useEffect(() => {
    const fetchCuidadores = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8030/api/cuidadores"
        );
        setCuidadores(response.data); // Salva os cuidadores no estado
      } catch (error) {
        console.error("Erro ao carregar cuidadores:", error);
      }
    };

    fetchCuidadores();
  }, []);

  // Filtra os cuidadores conforme o termo de busca
  const filteredCuidadores = cuidadores.filter((cuidador) =>
    Object.values(cuidador)
      .join(" ")
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
  );

  return (
    <Container>
      <Header onToggleSidebar={toggleSidebar} />
      <LateralBar isMobileMenuOpen={isMobileMenuOpen} />
      <Toaster position="top-right" reverseOrder={false} />
      <TitleWithSearch>
        <TitleWithGradientUnderline>
          Cuidadores Disponíveis
        </TitleWithGradientUnderline>
        <SearchInput
          type="text"
          placeholder="Pesquise por nome, cidade, habilidades..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </TitleWithSearch>
      <CuidadoresContainer>
        {filteredCuidadores.map((cuidador) => (
          <CardCuidador
            key={cuidador.id}
            cuidador={cuidador}
            onToastMessage={handleToastMessage}
          />
        ))}
      </CuidadoresContainer>
    </Container>
  );
};

export default PainelCuidadores;