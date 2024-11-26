import styled from "styled-components";

// Container principal da barra lateral
export const SidebarContainer = styled.div`
  width: ${(props) => (props.$isExpanded ? "250px" : "60px")};
  background-color: #008dc4;
  color: #fff;
  z-index: 1000;
  height: calc(100vh - 60px);
  margin-top: 60px;
  transition: width 0.3s ease;
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  &.desktop-only {
    @media (max-width: 768px) {
      display: none;
    }
  }
`;

// Cabeçalho da barra lateral
export const SidebarHeader = styled.div`
  padding: 20px;
  font-size: ${(props) => (props.$isExpanded ? "16px" : "0px")};
  text-align: center;

  p {
    margin: 0;
    font-size: 16px;
  }

  strong {
    display: block;
    font-size: 22px;
    margin-top: 5px;
  }
`;

// Conteúdo principal da barra lateral
export const SidebarContent = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: ${(props) => (props.$bottom ? "auto" : "0")};
  padding: 20px 0;
`;

// Cada item da barra lateral
export const SidebarItem = styled.div`
  display: flex;
  align-items: center;
  padding: 15px 20px;
  cursor: pointer;

  &:hover {
    background-color: #005f89;
  }
`;

// Ícone dos itens
export const SidebarIcon = styled.div`
  font-size: 20px;
  width: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

// Rótulo dos itens (exibido quando expandido)
export const SidebarLabel = styled.span`
  font-size: 16px;
`;

// Menu dropdown para dispositivos móveis
export const DropdownMenu = styled.div`
  background-color: #008dc4;
  color: #fff;
  position: fixed;
  top: 60px;
  left: 0;
  width: 100%;
  overflow: hidden;
  z-index: 1500;

  /* Definindo os estados inicial (fechado) e final (aberto) */
  max-height: ${(props) => (props.$isOpen ? "100vh" : "0")};
  opacity: ${(props) => (props.$isOpen ? "1" : "0")};
  transform: ${(props) => (props.$isOpen ? "translateY(0)" : "translateY(-20px)")};
  transition: all 0.3s ease-in-out;

  @media (max-width: 768px) {
    display: block;
  }
`;