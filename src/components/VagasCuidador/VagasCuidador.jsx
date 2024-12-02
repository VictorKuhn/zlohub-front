import React, { useEffect, useState } from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";
import Header from "../Header/Header";
import toast, { Toaster } from "react-hot-toast";
import LateralBar from "../LateralBar/LateralBar";
import CardVaga from "../../components/CardVaga/CardVaga";
import {
  TitleWithSearch,
  TitleWithGradientUnderline,
  SearchInput,
  VagasContainer,
  Container,
} from "./VagasCuidador.styles";

const VagasCuidador = () => {
  const [vagas, setVagas] = useState([]);
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
      const isRoleCuidador = decoded.roles === "ROLE_CUIDADOR";
      const isTokenValid = decoded.exp * 1000 > Date.now();

      if (!isRoleCuidador || !isTokenValid) {
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

  // Busca as vagas ativas
  useEffect(() => {
    const fetchVagas = async () => {
      try {
        const response = await axios.get("http://zlo-hub-app.us-east-1.elasticbeanstalk.com/api/vagas");
        setVagas(response.data.filter((vaga) => vaga.status === "ATIVA"));
      } catch (error) {
        console.error("Erro ao carregar vagas:", error);
      }
    };

    fetchVagas();
  }, []);

  // Filtra as vagas conforme o termo de busca
  const filteredVagas = vagas.filter((vaga) =>
    Object.values(vaga)
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
        <TitleWithGradientUnderline>Vagas</TitleWithGradientUnderline>
        <SearchInput
          type="text"
          placeholder="Pesquise por cidade, título..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </TitleWithSearch>
      <VagasContainer>
        {filteredVagas.map((vaga) => (
          <CardVaga
          key={vaga.id}
          vaga={vaga}
          onToastMessage={handleToastMessage}
          />
        ))}
      </VagasContainer>
    </Container>
  );
};

export default VagasCuidador;
