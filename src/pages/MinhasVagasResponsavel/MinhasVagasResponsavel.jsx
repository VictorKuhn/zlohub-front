import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import Header from "../../components/Header/Header";
import LateralBar from "../../components/LateralBar/LateralBar";
import { jwtDecode } from "jwt-decode";
import CardVaga from "../../components/CardVaga/CardVaga";
import {
  TitleWithSearch,
  TitleWithGradientUnderline,
  SearchInput,
  VagasContainer,
  Container,
} from "./MinhasVagasResponsavel.styles";

const MinhasVagasResponsavel = () => {
  const [minhasVagas, setMinhasVagas] = useState([]);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState(""); // Termo de busca
  const navigate = useNavigate();

  const responsavelData = JSON.parse(localStorage.getItem("responsavelData"));

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
      }
    } catch (error) {
      console.error("Erro ao decodificar o token:", error);
      navigate("/login");
    }
  }, [navigate]);

  // Fetch das vagas do responsável
  useEffect(() => {
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
        toast.error("Erro ao carregar suas vagas. Tente novamente mais tarde.");
      }
    };

    fetchMinhasVagas();
  }, [responsavelData.cpfRes]);

  // Filtro de busca
  const filteredVagas = minhasVagas.filter((vaga) =>
    Object.values(vaga)
      .join(" ")
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
  );

  const toggleSidebar = () => {
    setIsMobileMenuOpen((prev) => !prev);
  };

  return (
    <Container>
      <Header onToggleSidebar={toggleSidebar} />
      <LateralBar isMobileMenuOpen={isMobileMenuOpen} />
      <Toaster position="top-right" reverseOrder={false} />
      <TitleWithSearch>
        <TitleWithGradientUnderline>Minhas Vagas</TitleWithGradientUnderline>
        <SearchInput
          type="text"
          placeholder="Pesquise por título, cidade, status..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </TitleWithSearch>
      <VagasContainer>
        {filteredVagas.length > 0 ? (
          filteredVagas.map((vaga) => (
            <CardVaga key={vaga.id} vaga={vaga} onToastMessage={toast} />
          ))
        ) : (
          <p>Você ainda não tem vagas criadas.</p>
        )}
      </VagasContainer>
    </Container>
  );
};

export default MinhasVagasResponsavel;
