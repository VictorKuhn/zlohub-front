/* eslint-disable testing-library/prefer-screen-queries */
import React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react";
import ModalCriarVaga from "./ModalCriarVaga";
import axios from "axios"; // Certifique-se de importar o axios
import "@testing-library/jest-dom";

jest.mock("axios");

const mockOnClose = jest.fn();

describe("ModalCriarVaga Component", () => {
  beforeEach(() => {
    jest.spyOn(Storage.prototype, "getItem").mockImplementation((key) => {
      if (key === "responsavelData") {
        return JSON.stringify({ cpfRes: "12345678900" });
      }
      return null;
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should render the modal and display all form fields", () => {
    const { getByTestId } = render(
      <ModalCriarVaga onClose={mockOnClose} onToastMessage={jest.fn()} />
    );

    expect(getByTestId("titulo-input")).toBeInTheDocument();
    expect(getByTestId("descricao-input")).toBeInTheDocument();
    expect(getByTestId("dataHoraInicio-input")).toBeInTheDocument();
    expect(getByTestId("dataHoraFim-input")).toBeInTheDocument();
  });

  it("should validate that 'Data/Hora Fim' is after 'Data/Hora Início'", async () => {
    const { getByTestId, getByText } = render(
      <ModalCriarVaga onClose={mockOnClose} onToastMessage={jest.fn()} />
    );

    fireEvent.change(getByTestId("dataHoraInicio-input"), {
      target: { value: "2024-12-01T10:00" },
    });
    fireEvent.change(getByTestId("dataHoraFim-input"), {
      target: { value: "2024-12-01T08:00" }, // Data inválida
    });

    const submitButton = getByText("Criar Vaga");
    fireEvent.click(submitButton);

    await waitFor(() => {
      const dataHoraFimInput = getByTestId("dataHoraFim-input");
      expect(dataHoraFimInput.value).toBe("2024-12-01T08:00");
    });
  });
});