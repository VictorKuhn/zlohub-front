/* eslint-disable testing-library/no-node-access */
import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import CardCandidatura from "./CardCandidatura";
import "@testing-library/jest-dom";

jest.mock("../ModalDetalhesCandidatura/ModalDetalhesCandidatura", () => ({
  __esModule: true,
  default: ({ candidatura, onClose, onToastMessage }) => (
    <div>
      <h2>Detalhes da Candidatura</h2>
      <button onClick={onClose}>Fechar</button>
    </div>
  ),
}));

const mockCandidatura = {
  vaga: {
    titulo: "Cuidado para idoso com Alzheimer",
    doencaDiagnosticada: "Alzheimer",
    idadeDependente: 85,
    cidade: "São Paulo",
    estado: "SP",
  },
  valorHora: 50,
  status: "Pendente",
};

const mockOnToastMessage = jest.fn();

describe("CardCandidatura Component", () => {
  it("should render the CardCandidatura with all details", () => {
    render(
      <CardCandidatura
        candidatura={mockCandidatura}
        onToastMessage={mockOnToastMessage}
      />
    );

    // Verifica o título da vaga
    expect(
      screen.getAllByText(/Cuidado para idoso com Alzheimer/i)[0]
    ).toBeInTheDocument();

    // Verifica o texto "Doença: Alzheimer"
    expect(
      screen.getByText((content, element) => {
        const hasText = (node) => node.textContent === "Doença: Alzheimer";
        const nodeHasText = hasText(element);
        const childrenDoNotHaveText = Array.from(element.children).every(
          (child) => !hasText(child)
        );
        return nodeHasText && childrenDoNotHaveText;
      })
    ).toBeInTheDocument();

    // Verifica o texto "Idade: 85 anos"
    expect(
      screen.getByText((content, element) => {
        const hasText = (node) => node.textContent === "Idade: 85 anos";
        const nodeHasText = hasText(element);
        const childrenDoNotHaveText = Array.from(element.children).every(
          (child) => !hasText(child)
        );
        return nodeHasText && childrenDoNotHaveText;
      })
    ).toBeInTheDocument();

    // Verifica o texto "R$: 50"
    expect(
      screen.getByText((content, element) => {
        const hasText = (node) => node.textContent === "R$: 50";
        const nodeHasText = hasText(element);
        const childrenDoNotHaveText = Array.from(element.children).every(
          (child) => !hasText(child)
        );
        return nodeHasText && childrenDoNotHaveText;
      })
    ).toBeInTheDocument();

    // Verifica o texto "Status: Pendente"
    expect(
      screen.getByText((content, element) => {
        const hasText = (node) => node.textContent === "Status: Pendente";
        const nodeHasText = hasText(element);
        const childrenDoNotHaveText = Array.from(element.children).every(
          (child) => !hasText(child)
        );
        return nodeHasText && childrenDoNotHaveText;
      })
    ).toBeInTheDocument();

    // Verifica o texto "São Paulo - SP"
    expect(screen.getByText(/São Paulo - SP/i)).toBeInTheDocument();

    // Verifica o botão "Ver mais"
    expect(screen.getByText("Ver mais")).toBeInTheDocument();
  });

  it("should open the modal when 'Ver mais' is clicked", () => {
    render(
      <CardCandidatura
        candidatura={mockCandidatura}
        onToastMessage={mockOnToastMessage}
      />
    );

    const viewMoreButton = screen.getByText("Ver mais");
    fireEvent.click(viewMoreButton);

    // Verifica se o modal foi aberto
    expect(screen.getByText("Detalhes da Candidatura")).toBeInTheDocument();
  });

  it("should call onToastMessage when closing the modal", () => {
    render(
      <CardCandidatura
        candidatura={mockCandidatura}
        onToastMessage={mockOnToastMessage}
      />
    );

    const viewMoreButton = screen.getByText("Ver mais");
    fireEvent.click(viewMoreButton);

    // Fecha o modal
    const closeButton = screen.getByText("Fechar");
    fireEvent.click(closeButton);

    // Verifica se a função foi chamada
    expect(mockOnToastMessage).not.toHaveBeenCalled();
  });
});
