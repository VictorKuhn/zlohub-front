import React, { useEffect, useState } from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";
import Header from "../Header/Header";
import LateralBar from "../LateralBar/LateralBar";
import toast, { Toaster } from "react-hot-toast";
import CardCandidatura from "../../components/CardCandidatura/CardCandidatura"; // Componente para exibir cada candidatura
import {
  TitleWithSearch,
  TitleWithGradientUnderline,
  SearchInput,
  CandidaturasContainer,
  Container,
} from "./CandidaturasCuidador.styles";

const CandidaturasCuidador = () => {
  const [candidaturas, setCandidaturas] = useState([]);
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
        // Faz logout se o token não for válido ou a role não for cuidador
        localStorage.removeItem("token");
        localStorage.removeItem("cuidadorData");
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

  // Busca as candidaturas do cuidador
  useEffect(() => {
    const fetchCandidaturas = async () => {
      try {
        const cuidadorData = JSON.parse(localStorage.getItem("cuidadorData"));
        const response = await axios.get(
          `http://zlo-hub-app.us-east-1.elasticbeanstalk.com/api/candidaturas/cuidador/${cuidadorData.id}`
        );
        setCandidaturas(response.data);
      } catch (error) {
        console.error("Erro ao carregar candidaturas:", error);
      }
    };

    fetchCandidaturas();
  }, []);

  // Filtra as candidaturas conforme o termo de busca
  const filteredCandidaturas = candidaturas.filter((candidatura) => {
    const searchTermLower = searchTerm.toLowerCase();

    // Verifica propriedades relevantes da candidatura e da vaga
    return (
      candidatura.vaga.titulo.toLowerCase().includes(searchTermLower) || // Título da vaga
      candidatura.vaga.doencaDiagnosticada.toLowerCase().includes(searchTermLower) || // Doença
      candidatura.vaga.cidade.toLowerCase().includes(searchTermLower) || // Cidade
      candidatura.vaga.estado.toLowerCase().includes(searchTermLower) || // Estado
      candidatura.status.toLowerCase().includes(searchTermLower) || // Status da candidatura
      candidatura.valorHora.toString().toLowerCase().includes(searchTermLower) // Valor da hora
    );
  });

  return (
    <Container>
      <Header onToggleSidebar={toggleSidebar} />
      <LateralBar isMobileMenuOpen={isMobileMenuOpen} />
      <Toaster position="top-right" reverseOrder={false} />
      <TitleWithSearch>
        <TitleWithGradientUnderline>Candidaturas</TitleWithGradientUnderline>
        <SearchInput
          type="text"
          placeholder="Pesquise por status, título, valor..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </TitleWithSearch>
      <CandidaturasContainer>
        {filteredCandidaturas.map((candidatura) => (
          <CardCandidatura
            key={candidatura.id}
            candidatura={candidatura}
            onToastMessage={handleToastMessage}
          />
        ))}
      </CandidaturasContainer>
    </Container>
  );
};

export default CandidaturasCuidador;