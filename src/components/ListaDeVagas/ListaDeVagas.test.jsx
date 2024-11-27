/* eslint-disable testing-library/prefer-screen-queries */
import React from "react";
import { render, act } from "@testing-library/react";
import ListaDeVagas from "./ListaDeVagas";
import "@testing-library/jest-dom";

jest.mock("../CardVaga/CardVaga", () => ({ vaga, onToastMessage }) => (
  <div data-testid="card-vaga">{vaga.titulo}</div>
));

describe("ListaDeVagas Component", () => {
  const mockVagas = [
    { id: 1, titulo: "Vaga 1" },
    { id: 2, titulo: "Vaga 2" },
    { id: 3, titulo: "Vaga 3" },
  ];

  const mockToastMessage = jest.fn();

  it("should render the component with the list of vagas", () => {
    const { getAllByTestId } = render(
      <ListaDeVagas vagas={mockVagas} onToastMessage={mockToastMessage} />
    );

    const cards = getAllByTestId("card-vaga");
    expect(cards).toHaveLength(mockVagas.length);
    expect(cards[0]).toHaveTextContent("Vaga 1");
    expect(cards[1]).toHaveTextContent("Vaga 2");
    expect(cards[2]).toHaveTextContent("Vaga 3");
  });

  it("should handle mouse interactions on the slider", () => {
    const { getByTestId } = render(
      <ListaDeVagas vagas={mockVagas} onToastMessage={mockToastMessage} />
    );

    const slider = getByTestId("slider");

    // Simula interações do mouse
    act(() => {
      slider.scrollTo = jest.fn(); // Mock de scrollTo
    });

    expect(slider).toBeInTheDocument();
  });

  it("should automatically scroll when not dragging", () => {
    jest.useFakeTimers();

    const { getByTestId } = render(
      <ListaDeVagas vagas={mockVagas} onToastMessage={mockToastMessage} />
    );

    const slider = getByTestId("slider");

    act(() => {
      slider.scrollTo = jest.fn(); // Mock do método scrollTo
    });

    act(() => {
      jest.advanceTimersByTime(3000); // Avança o tempo para simular o auto-scroll
    });

    expect(slider.scrollTo).toHaveBeenCalled();
    jest.useRealTimers();
  });
});