import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import CardCandidato from "./CardCandidato";
import "@testing-library/jest-dom";

jest.mock("./CardCandidato.styles", () => ({
  CardContainer: ({ children }) => <div>{children}</div>,
  CardTitle: ({ children }) => <h1>{children}</h1>,
  CardInfo: ({ children }) => <p>{children}</p>,
  CardLocation: ({ children }) => <p>{children}</p>,
  ViewMoreButton: ({ children, onClick }) => (
    <button onClick={onClick}>{children}</button>
  ),
}));

describe("CardCandidato Component", () => {
  const mockCandidatura = {
    cuidador: {
      nome: "João Silva",
      cidade: "São Paulo",
      estado: "SP",
      tempoExperiencia: 5,
    },
    valorHora: 50,
    status: "Disponível",
  };

  const mockOnClick = jest.fn();

  it("should render the CardCandidato with all details", () => {
    render(
      <CardCandidato candidatura={mockCandidatura} onClick={mockOnClick} />
    );

    // Verifica a renderização correta dos dados do cuidador
    expect(screen.getByText("João Silva")).toBeInTheDocument();
    expect(screen.getByText(/São Paulo/i)).toBeInTheDocument(); // Flexível para o texto

    // Verifica o texto "Experiência: 5 anos"
    const experienciaElement = screen.getAllByText((content, element) => {
      return (
        element.textContent.includes("Experiência:") &&
        element.textContent.includes("5 anos")
      );
    })[0];
    expect(experienciaElement).toBeInTheDocument();

    // Verifica o texto "Valor/hora: R$50"
    const valorHoraElement = screen.getAllByText((content, element) => {
      return (
        element.textContent.includes("Valor/hora:") &&
        element.textContent.includes("R$50")
      );
    })[0];
    expect(valorHoraElement).toBeInTheDocument();

    // Verifica o texto "Status: Disponível"
    const statusElement = screen.getAllByText((content, element) => {
      return (
        element.textContent.includes("Status:") &&
        element.textContent.includes("Disponível")
      );
    })[0];
    expect(statusElement).toBeInTheDocument();

    expect(screen.getByText("Ver mais")).toBeInTheDocument();
  });

  it("should not render the CardCandidato if cuidador is missing", () => {
    const invalidCandidatura = {
      cuidador: null,
      valorHora: 50,
      status: "Disponível",
    };

    render(
      <CardCandidato candidatura={invalidCandidatura} onClick={mockOnClick} />
    );

    // Verifica se o botão "Ver mais" não é exibido
    expect(screen.queryByText("Ver mais")).not.toBeInTheDocument();
  });

  it("should call onClick when 'Ver mais' is clicked", () => {
    render(
      <CardCandidato candidatura={mockCandidatura} onClick={mockOnClick} />
    );

    const viewMoreButton = screen.getByText("Ver mais");
    fireEvent.click(viewMoreButton);

    expect(mockOnClick).toHaveBeenCalledTimes(1);
  });
});
