import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import Header from "./Header";
import "@testing-library/jest-dom";

jest.mock("../LogoutModal/LogoutModal", () => ({
  __esModule: true,
  default: ({ isOpen, onClose, onConfirm }) =>
    isOpen ? (
      <div data-testid="logout-modal">
        <button onClick={onClose}>Close</button>
        <button
          onClick={() => {
            onConfirm();
            onClose(); // Fecha o modal após confirmar
          }}
        >
          Confirm
        </button>
      </div>
    ) : null,
}));

describe("Header Component", () => {
  it("should render the logo", () => {
    render(<Header onToggleSidebar={jest.fn()} />);
    expect(screen.getByAltText("Logo")).toBeInTheDocument();
  });

  it("should call onToggleSidebar when menu icon is clicked", () => {
    const onToggleSidebar = jest.fn();
    render(<Header onToggleSidebar={onToggleSidebar} />);

    // Encontrar o botão do menu pelo SVG pai
    const menuIcon = screen.getByTestId("menu-icon");
    fireEvent.click(menuIcon);

    expect(onToggleSidebar).toHaveBeenCalledTimes(1);
  });

  it("should open and close the logout modal", () => {
    render(<Header onToggleSidebar={jest.fn()} />);

    // Abrir modal
    const logoutIcon = screen.getByTestId("logout-icon");
    fireEvent.click(logoutIcon);
    expect(screen.getByTestId("logout-modal")).toBeInTheDocument();

    // Fechar modal
    const closeButton = screen.getByText("Close");
    fireEvent.click(closeButton);
    expect(screen.queryByTestId("logout-modal")).not.toBeInTheDocument();
  });

  it("should confirm logout when confirm button is clicked", async () => {
    render(<Header onToggleSidebar={jest.fn()} />);

    // Abrir modal
    const logoutIcon = screen.getByTestId("logout-icon");
    fireEvent.click(logoutIcon);

    // Confirmar logout
    const confirmButton = screen.getByText("Confirm");
    fireEvent.click(confirmButton);

    // Validar que modal foi fechado
    await waitFor(() =>
      expect(screen.queryByTestId("logout-modal")).not.toBeInTheDocument()
    );
  });
});
