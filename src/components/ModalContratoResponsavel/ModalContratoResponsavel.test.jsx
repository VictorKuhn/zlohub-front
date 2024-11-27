/* eslint-disable testing-library/prefer-screen-queries */
import React from "react";
import { render, fireEvent } from "@testing-library/react";
import ModalContratoResponsavel from "./ModalContratoResponsavel";
import "@testing-library/jest-dom";

const mockContrato = {
  cuidador: { nome: "João", sobrenome: "Silva" },
  vaga: {
    descricao: "Cuidar de pessoa idosa durante o dia.",
    dataHoraInicio: "2024-12-01T05:00:00Z",
    dataHoraFim: "2024-12-01T15:00:00Z",
  },
  mensagemEnvio: "Estou disponível para iniciar imediatamente.",
  valorHora: 50,
  status: "ACEITO",
};

describe("ModalContratoResponsavel Component", () => {
  const mockOnClose = jest.fn();

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should render the modal with contract details", () => {
    const { getByText } = render(
      <ModalContratoResponsavel contrato={mockContrato} onClose={mockOnClose} />
    );

    expect(getByText("Detalhes do Contrato")).toBeInTheDocument();
    expect(getByText("João Silva")).toBeInTheDocument();
    expect(
      getByText("Cuidar de pessoa idosa durante o dia.")
    ).toBeInTheDocument();

    // Ajuste para busca exata da data/hora formatada
    expect(getByText("01/12/2024, 02:00")).toBeInTheDocument();
    expect(getByText("01/12/2024, 12:00")).toBeInTheDocument();

    expect(
      getByText("Estou disponível para iniciar imediatamente.")
    ).toBeInTheDocument();
    expect(getByText("R$50")).toBeInTheDocument();
    expect(getByText("ACEITO")).toBeInTheDocument();
  });

  it("should handle missing or invalid date", () => {
    const contratoWithInvalidDate = {
      ...mockContrato,
      vaga: {
        ...mockContrato.vaga,
        dataHoraInicio: null,
        dataHoraFim: "invalid-date",
      },
    };

    const { getByText } = render(
      <ModalContratoResponsavel
        contrato={contratoWithInvalidDate}
        onClose={mockOnClose}
      />
    );

    // Ajustando o texto para corresponder ao que é exibido no DOM
    expect(getByText("Data não disponível")).toBeInTheDocument();
    expect(getByText("Invalid Date")).toBeInTheDocument();
  });

  it("should call onClose when the close button is clicked", () => {
    const { getByText } = render(
      <ModalContratoResponsavel contrato={mockContrato} onClose={mockOnClose} />
    );

    const closeButton = getByText("Fechar");
    fireEvent.click(closeButton);

    expect(mockOnClose).toHaveBeenCalled();
  });
});
