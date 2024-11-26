import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import {
  FaBriefcase,
  FaClipboardList,
  FaHandshake,
  FaHome,
  FaUser,
} from "react-icons/fa";
import {
  SidebarContainer,
  SidebarHeader,
  SidebarContent,
  SidebarItem,
  SidebarIcon,
  SidebarLabel,
  DropdownMenu,
} from "./LateralBar.styles";
import { jwtDecode } from "jwt-decode";

const LateralBar = ({ isMobileMenuOpen, onToggleMobileMenu }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [, setUserRole] = useState(null);
  const [userName, setUserName] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    const cuidadorData = JSON.parse(localStorage.getItem("cuidadorData"));

    if (token) {
      const decoded = jwtDecode(token);
      setUserRole(decoded.roles);
    }

    if (cuidadorData && cuidadorData.nome) {
      setUserName(cuidadorData.nome);
    } else {
      setUserName("Usuário");
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("cuidadorData");
    navigate("/login");
  };

  const handleHomeClick = () => {
    const token = localStorage.getItem("token");

    if (token) {
      const decoded = jwtDecode(token);
      const isTokenValid = decoded.exp * 1000 > Date.now();

      if (!isTokenValid) {
        handleLogout();
        return;
      }

      if (decoded.roles === "ROLE_CUIDADOR") navigate("/cuidador");
      else if (decoded.roles === "ROLE_RESPONSÁVEL") navigate("/responsavel");
      else if (decoded.roles === "ROLE_ADMIN") navigate("/admin");
    } else {
      toast.error("Token inválido ou expirado.");
    }
  };

  const handleVagasClick = () => {
    const token = localStorage.getItem("token");

    if (token) {
      try {
        const decoded = jwtDecode(token);
        const isRoleCuidador = decoded.roles === "ROLE_CUIDADOR";
        const isTokenValid = decoded.exp * 1000 > Date.now();

        if (isRoleCuidador && isTokenValid) {
          navigate("/vagasCuidador");
        } else {
          toast.error("Acesso negado ou token expirado.");
        }
      } catch (error) {
        toast.error("Erro ao verificar o token.");
      }
    } else {
      toast.error("Token não encontrado. Faça login novamente.");
    }
  };

  const handleProfileRedirect = () => {
    const token = localStorage.getItem("token");
  
    if (!token) {
      handleLogout(); // Use sua função handleLogout para limpar dados e redirecionar
      return;
    }
  
    try {
      const decoded = jwtDecode(token);
      const isTokenValid = decoded.exp * 1000 > Date.now();
  
      if (!isTokenValid) {
        handleLogout();
        return;
      }
  
      // Redireciona com base na role
      switch (decoded.roles) {
        case "ROLE_CUIDADOR":
          window.location.href = "/perfilCuidador";
          break;
        case "ROLE_RESPONSÁVEL":
          window.location.href = "/perfilResponsavel";
          break;
        case "ROLE_ADMIN":
          window.location.href = "/perfilAdmin";
          break;
        default:
          handleLogout();
          break;
      }
    } catch (error) {
      console.error("Erro ao decodificar o token:", error);
      handleLogout();
    }
  };

  const handleCandidaturasClick = () => {
    const token = localStorage.getItem("token");
  
    if (token) {
      try {
        const decoded = jwtDecode(token);
        const isRoleCuidador = decoded.roles === "ROLE_CUIDADOR";
        const isTokenValid = decoded.exp * 1000 > Date.now();
  
        if (isRoleCuidador && isTokenValid) {
          navigate("/candidaturasCuidador");
        } else {
          // Faz logout se o token não for válido ou a role não for cuidador
          localStorage.removeItem("token");
          localStorage.removeItem("cuidadorData");
          navigate("/login");
        }
      } catch (error) {
        console.error("Erro ao verificar o token:", error);
        localStorage.removeItem("token");
        localStorage.removeItem("cuidadorData");
        navigate("/login");
      }
    } else {
      navigate("/login");
    }
  };

  return (
    <>
      {/* Barra lateral para telas maiores */}
      <SidebarContainer
        $isExpanded={isExpanded}
        className="desktop-only"
        onMouseEnter={() => setIsExpanded(true)}
        onMouseLeave={() => setIsExpanded(false)}
      >
        <SidebarHeader>
          {isExpanded && (
            <div>
              <p>Bem vindo,</p>
              <strong>{userName}</strong>
            </div>
          )}
        </SidebarHeader>
        <SidebarContent>
          <SidebarItem onClick={handleHomeClick}>
            <SidebarIcon>
              <FaHome />
            </SidebarIcon>
            {isExpanded && <SidebarLabel>Início</SidebarLabel>}
          </SidebarItem>
          <SidebarItem onClick={handleVagasClick}>
            <SidebarIcon>
              <FaBriefcase />
            </SidebarIcon>
            {isExpanded && <SidebarLabel>Vagas</SidebarLabel>}
          </SidebarItem>

          <SidebarItem onClick={handleCandidaturasClick}>
            <SidebarIcon>
              <FaClipboardList />
            </SidebarIcon>
            {isExpanded && <SidebarLabel>Candidaturas</SidebarLabel>}
          </SidebarItem>

          <SidebarItem>
            <SidebarIcon>
              <FaHandshake />
            </SidebarIcon>
            {isExpanded && <SidebarLabel>Contratos</SidebarLabel>}
          </SidebarItem>
        </SidebarContent>

        <SidebarContent $bottom>
          <SidebarItem onClick={handleProfileRedirect}>
            <SidebarIcon>
              <FaUser />
            </SidebarIcon>
            {isExpanded && <SidebarLabel>Perfil</SidebarLabel>}
          </SidebarItem>
        </SidebarContent>
      </SidebarContainer>

      {/* Menu dropdown para dispositivos móveis */}
      <DropdownMenu $isOpen={isMobileMenuOpen}>
        <SidebarContent>
          <SidebarItem onClick={handleHomeClick}>
            <SidebarIcon>
              <FaHome />
            </SidebarIcon>
            <SidebarLabel>Início</SidebarLabel>
          </SidebarItem>

          <SidebarItem onClick={handleVagasClick}>
            <SidebarIcon>
              <FaBriefcase />
            </SidebarIcon>
            <SidebarLabel>Vagas</SidebarLabel>
          </SidebarItem>

          <SidebarItem onClick={handleCandidaturasClick}>
            <SidebarIcon>
              <FaClipboardList />
            </SidebarIcon>
            <SidebarLabel>Candidaturas</SidebarLabel>
          </SidebarItem>

          <SidebarItem>
            <SidebarIcon>
              <FaHandshake />
            </SidebarIcon>
            <SidebarLabel>Contratos</SidebarLabel>
          </SidebarItem>

          <SidebarItem onClick={handleProfileRedirect}>
            <SidebarIcon>
              <FaUser />
            </SidebarIcon>
            <SidebarLabel>Perfil</SidebarLabel>
          </SidebarItem>
        </SidebarContent>
      </DropdownMenu>
    </>
  );
};

export default LateralBar;
