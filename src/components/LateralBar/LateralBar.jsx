import React, { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaBriefcase,
  FaClipboardList,
  FaHandshake,
  FaHome,
  FaUser,
  FaUsers,
  FaAddressCard,
  FaTasks,
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

const LateralBar = ({ isMobileMenuOpen }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [userRole, setUserRole] = useState(null);
  const [userName, setUserName] = useState("");
  const navigate = useNavigate();

  // Função para tratar dados de cuidadores
  const setCuidadorUserName = useCallback(() => {
    const cuidadorData = JSON.parse(localStorage.getItem("cuidadorData"));
    setUserName(cuidadorData?.nome || "Cuidador");
  }, []);

  // Função para tratar dados de responsáveis
  const setResponsavelUserName = useCallback(() => {
    const responsavelData = JSON.parse(localStorage.getItem("responsavelData"));
    const firstName = responsavelData?.nomeRes?.split(" ")[0] || "RESPONSAVEL";
    setUserName(firstName);
  }, []);

  // Função para processar o token e definir role e username
  const processToken = useCallback(
    (token) => {
      const decodedToken = token ? jwtDecode(token) : null;
      if (!decodedToken) {
        setUserName("Usuário");
        return;
      }

      const role = decodedToken.roles;
      setUserRole(role);

      switch (role) {
        case "ROLE_CUIDADOR":
          setCuidadorUserName();
          break;
        case "ROLE_RESPONSAVEL":
          setResponsavelUserName();
          break;
        default:
          setUserName("Usuário");
      }
    },
    [setCuidadorUserName, setResponsavelUserName]
  );

  useEffect(() => {
    const token = localStorage.getItem("token");
    processToken(token);
  }, [processToken]);

  const handleNavigation = (path) => {
    navigate(path);
  };

  const menuItems = {
    ROLE_CUIDADOR: [
      {
        label: "Início",
        icon: <FaHome />,
        onClick: () => handleNavigation("/cuidador"),
      },
      {
        label: "Vagas",
        icon: <FaBriefcase />,
        onClick: () => handleNavigation("/vagasCuidador"),
      },
      {
        label: "Candidaturas",
        icon: <FaClipboardList />,
        onClick: () => handleNavigation("/candidaturasCuidador"),
      },
      {
        label: "Contratos",
        icon: <FaHandshake />,
        onClick: () => handleNavigation("/contratosCuidador"),
      },
      {
        label: "Perfil",
        icon: <FaUser />,
        onClick: () => handleNavigation("/perfilCuidador"),
      },
    ],
    ROLE_RESPONSAVEL: [
      {
        label: "Início",
        icon: <FaHome />,
        onClick: () => handleNavigation("/responsavel"),
      },
      {
        label: "Cuidadores",
        icon: <FaUsers />,
        onClick: () => handleNavigation("/painelCuidadores"),
      },
      {
        label: "Candidatos",
        icon: <FaAddressCard />,
        onClick: () => handleNavigation("/candidatos"),
      },
      {
        label: "Minhas Vagas",
        icon: <FaTasks />,
        onClick: () => handleNavigation("/minhasVagas"),
      },
      {
        label: "Contratos",
        icon: <FaHandshake />,
        onClick: () => handleNavigation("/contratosResponsavel"),
      },
      {
        label: "Perfil",
        icon: <FaUser />,
        onClick: () => handleNavigation("/perfilResponsavel"),
      },
    ],
  };

  const renderMenuItems = (isDropdown = false) => {
    const items = menuItems[userRole] || [];
    return items.map((item, index) => (
      <SidebarItem key={index} onClick={item.onClick}>
        <SidebarIcon>{item.icon}</SidebarIcon>
        {(isExpanded || isDropdown) && (
          <SidebarLabel>{item.label}</SidebarLabel>
        )}
      </SidebarItem>
    ));
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
        <SidebarContent>{renderMenuItems()}</SidebarContent>
      </SidebarContainer>

      {/* Menu dropdown para dispositivos móveis */}
      <DropdownMenu $isOpen={isMobileMenuOpen}>
        <SidebarContent>{renderMenuItems(true)}</SidebarContent>
      </DropdownMenu>
    </>
  );
};

export default LateralBar;