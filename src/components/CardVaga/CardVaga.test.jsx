import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import CardVaga from "./CardVaga";

describe("CardVaga Component", () => {
  const mockVaga = {
    titulo: "Cuidado para idoso com Alzheimer",
    doencaDiagnosticada: "Alzheimer",
    idadeDependente: 85,
    cidade: "São Paulo",
    estado: "SP",
  };

  const mockOnToastMessage = jest.fn();

  it("should render the CardVaga with all details", () => {
    render(<CardVaga vaga={mockVaga} onToastMessage={mockOnToastMessage} />);

    // Verifica o título da vaga
    expect(
      screen.getByText("Cuidado para idoso com Alzheimer")
    ).toBeInTheDocument();

    // Verifica os detalhes específicos usando filtros
    const doencaElement = screen
      .getAllByText((_, element) =>
        element.textContent.includes("Doença: Alzheimer")
      )
      .find((el) => el.tagName === "P");
    expect(doencaElement).toBeInTheDocument();

    const idadeElement = screen
      .getAllByText((_, element) =>
        element.textContent.includes("Idade: 85 anos")
      )
      .find((el) => el.tagName === "P");
    expect(idadeElement).toBeInTheDocument();

    // Verifica a localização
    expect(screen.getByText("São Paulo - SP")).toBeInTheDocument();
  });

  it("should truncate long titles", () => {
    const longTitleVaga = {
      ...mockVaga,
      titulo:
        "Título muito longo que ultrapassa o limite de quarenta caracteres",
    };

    render(
      <CardVaga vaga={longTitleVaga} onToastMessage={mockOnToastMessage} />
    );

    expect(
      screen.getByText("Título muito longo que ultrapassa o limi...")
    ).toBeInTheDocument();
  });

  it("should open the modal when 'Ver mais' is clicked", () => {
    render(<CardVaga vaga={mockVaga} onToastMessage={mockOnToastMessage} />);

    // Simula clique no botão "Ver mais"
    fireEvent.click(screen.getByText("Ver mais"));

    // Verifica se o modal está aberto
    const modalHeader = screen
      .getAllByText("Cuidado para idoso com Alzheimer")
      .find((el) => el.tagName === "H2");
    expect(modalHeader).toBeInTheDocument();
  });
});
