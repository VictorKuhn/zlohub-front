import React, { useState } from "react";
import { FaBars, FaSignOutAlt } from "react-icons/fa";
import { HeaderContainer, Logo, Icon, RightSection } from "./Header.styles";
import LogoutModal from "../LogoutModal/LogoutModal";
import { jwtDecode } from "jwt-decode";

const Header = ({ onToggleSidebar }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleLogout = () => {
    const token = localStorage.getItem("token");

    if (token) {
      const decoded = jwtDecode(token);
      const userRole = decoded.roles;

      // Verifica a role do usuário e remove os dados apropriados
      if (userRole === "ROLE_CUIDADOR") {
        localStorage.removeItem("token");
        localStorage.removeItem("cuidadorData");
      } else if (userRole === "ROLE_RESPONSÁVEL") {
        localStorage.removeItem("token");
        localStorage.removeItem("responsavelData");
      } else if (userRole === "ROLE_ADMIN") {
        localStorage.removeItem("token");
        localStorage.removeItem("adminData");
      }
    }

    // Redireciona para a LoginPage
    window.location.href = "/";
  };

  return (
    <>
      <HeaderContainer>
        <Icon data-testid="menu-icon" onClick={onToggleSidebar}>
          <FaBars />
        </Icon>
        <Logo src="https://i.imgur.com/NiGayqL.png" alt="Logo" />
        <RightSection>
          <Icon data-testid="logout-icon" onClick={() => setIsModalOpen(true)}>
            <FaSignOutAlt />
          </Icon>
        </RightSection>
      </HeaderContainer>
      <LogoutModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={() => {
          handleLogout();
        }}
      />
    </>
  );
};

export default Header;