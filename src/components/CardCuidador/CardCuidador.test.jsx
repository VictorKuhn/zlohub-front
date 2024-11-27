import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import CardCuidador from "./CardCuidador";

describe("CardCuidador Component", () => {
  const mockCuidador = {
    nome: "Maria Silva",
    tempoExperiencia: 10,
    formacao: "Enfermagem",
    habilidades: "Cuidados com idosos, primeiros socorros",
  };

  const mockCuidadorSemDetalhes = {
    nome: "João Oliveira",
    tempoExperiencia: 5,
  };

  it("should render the CardCuidador with all details", () => {
    render(<CardCuidador cuidador={mockCuidador} />);

    // Verifica o nome do cuidador
    expect(screen.getByText("Maria Silva")).toBeInTheDocument();

    // Verifica "Experiência"
    expect(
      screen.getByText(
        (content, element) =>
          element.tagName === "P" &&
          element.textContent.includes("Experiência: 10 anos")
      )
    ).toBeInTheDocument();

    // Verifica "Formação"
    expect(
      screen.getByText(
        (content, element) =>
          element.tagName === "P" &&
          element.textContent.includes("Formação: Enfermagem")
      )
    ).toBeInTheDocument();

    // Verifica "Habilidades"
    expect(
      screen.getByText(
        (content, element) =>
          element.tagName === "P" &&
          element.textContent.includes(
            "Habilidades: Cuidados com idosos, primeiros socorros"
          )
      )
    ).toBeInTheDocument();

    // Verifica o botão
    expect(screen.getByText("Ver mais")).toBeInTheDocument();
  });

  it("should render default text when optional details are missing", () => {
    render(<CardCuidador cuidador={mockCuidadorSemDetalhes} />);

    // Verifica o nome do cuidador
    expect(screen.getByText("João Oliveira")).toBeInTheDocument();

    // Verifica "Experiência"
    expect(
      screen.getByText(
        (content, element) =>
          element.tagName === "P" &&
          element.textContent.includes("Experiência: 5 anos")
      )
    ).toBeInTheDocument();

    // Verifica "Formação" padrão
    expect(
      screen.getByText(
        (content, element) =>
          element.tagName === "P" &&
          element.textContent.includes("Formação: Não informado")
      )
    ).toBeInTheDocument();

    // Verifica "Habilidades" padrão
    expect(
      screen.getByText(
        (content, element) =>
          element.tagName === "P" &&
          element.textContent.includes("Habilidades: Não informado")
      )
    ).toBeInTheDocument();

    // Verifica o botão
    expect(screen.getByText("Ver mais")).toBeInTheDocument();
  });

  it("should open the modal when 'Ver mais' is clicked", () => {
    render(<CardCuidador cuidador={mockCuidador} />);

    // Simula clique no botão "Ver mais"
    fireEvent.click(screen.getByText("Ver mais"));

    // Usa `getAllByText` para lidar com múltiplos elementos e verifica o modal
    const modalHeader = screen
      .getAllByText("Maria Silva")
      .find((element) => element.tagName === "H2");

    expect(modalHeader).toBeInTheDocument();
  });
});
