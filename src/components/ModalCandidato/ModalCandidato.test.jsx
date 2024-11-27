/* eslint-disable testing-library/no-wait-for-multiple-assertions */
/* eslint-disable testing-library/prefer-screen-queries */
import React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react";
import ModalCandidato from "./ModalCandidato";
import "@testing-library/jest-dom";
import axios from "axios";

jest.mock("axios");

const mockCandidatura = {
  id: 1,
  status: "AGUARDANDO",
  vaga: {
    titulo: "Desenvolvedor Frontend",
    descricao: "Trabalhar com React.js em um projeto inovador.",
  },
};

describe("ModalCandidato Component", () => {
  const mockOnClose = jest.fn();
  const mockOnToastMessage = jest.fn();

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should render the modal with candidatura details", () => {
    const { getByText, getAllByText, getByDisplayValue } = render(
      <ModalCandidato
        candidatura={mockCandidatura}
        onClose={mockOnClose}
        onToastMessage={mockOnToastMessage}
      />
    );

    expect(getByText("Desenvolvedor Frontend")).toBeInTheDocument();
    expect(
      getByText("Trabalhar com React.js em um projeto inovador.")
    ).toBeInTheDocument();

    // Usa getAllByText para lidar com múltiplos elementos "AGUARDANDO"
    const statusElements = getAllByText("AGUARDANDO");
    expect(statusElements).toHaveLength(2); // Espera dois elementos com "AGUARDANDO"
    expect(getByDisplayValue("AGUARDANDO")).toBeInTheDocument();
  });

  it("should allow status update and close modal on success", async () => {
    axios.patch.mockResolvedValueOnce({});

    const { getByText, getByDisplayValue } = render(
      <ModalCandidato
        candidatura={mockCandidatura}
        onClose={mockOnClose}
        onToastMessage={mockOnToastMessage}
      />
    );

    const statusSelect = getByDisplayValue("AGUARDANDO");
    const updateButton = getByText("Alterar Status");

    fireEvent.change(statusSelect, { target: { value: "ACEITO" } });
    fireEvent.click(updateButton);

    await waitFor(() => {
      expect(axios.patch).toHaveBeenCalledWith(
        "http://localhost:8030/api/candidaturas/status",
        {
          id: mockCandidatura.id,
          status: "ACEITO",
        }
      );
      expect(mockOnToastMessage).toHaveBeenCalledWith(
        "success",
        "Status atualizado com sucesso!"
      );
      expect(mockOnClose).toHaveBeenCalled();
    });
  });

  it("should disable status update for final statuses", () => {
    const finalCandidatura = { ...mockCandidatura, status: "RECUSADO" };

    const { getByDisplayValue, getByText } = render(
      <ModalCandidato
        candidatura={finalCandidatura}
        onClose={mockOnClose}
        onToastMessage={mockOnToastMessage}
      />
    );

    const statusSelect = getByDisplayValue("RECUSADO");
    const updateButton = getByText("Alterar Status");

    expect(statusSelect).toBeDisabled();
    expect(updateButton).toBeDisabled();
  });

  it("should call onClose when the close button is clicked", () => {
    const { getByText } = render(
      <ModalCandidato
        candidatura={mockCandidatura}
        onClose={mockOnClose}
        onToastMessage={mockOnToastMessage}
      />
    );

    const closeButton = getByText("Fechar");
    fireEvent.click(closeButton);

    expect(mockOnClose).toHaveBeenCalled();
  });
});
