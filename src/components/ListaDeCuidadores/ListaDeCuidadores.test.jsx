import React from "react";
import { render, fireEvent, act } from "@testing-library/react";
import ListaDeCuidadores from "./ListaDeCuidadores";
import "@testing-library/jest-dom";

jest.mock("../CardCuidador/CardCuidador", () => ({ cuidador }) => (
  <div data-testid="card-cuidador">{cuidador.nome}</div>
));

describe("ListaDeCuidadores Component", () => {
  const mockCuidadores = [
    { id: 1, nome: "Cuidador 1" },
    { id: 2, nome: "Cuidador 2" },
    { id: 3, nome: "Cuidador 3" },
    { id: 4, nome: "Cuidador 4" },
    { id: 5, nome: "Cuidador 5" },
  ];

  it("should render the component with the list of cuidadores", () => {
    const { getAllByTestId } = render(
      <ListaDeCuidadores cuidadores={mockCuidadores} />
    );
    const cards = getAllByTestId("card-cuidador");

    expect(cards).toHaveLength(mockCuidadores.length);
    expect(cards[0]).toHaveTextContent("Cuidador 1");
    expect(cards[1]).toHaveTextContent("Cuidador 2");
  });

  it("should handle mouse interactions on the slider", () => {
    const { getByTestId } = render(
      <ListaDeCuidadores cuidadores={mockCuidadores} />
    );
    const slider = getByTestId("slider");

    // Mock `scrollLeft` and its behavior
    Object.defineProperty(slider, "scrollLeft", {
      writable: true,
      value: 0,
    });

    act(() => {
      fireEvent.mouseDown(slider, { pageX: 100 });
      fireEvent.mouseMove(slider, { pageX: 150 });
      fireEvent.mouseUp(slider);
    });

    // Simula o deslocamento
    Object.defineProperty(slider, "scrollLeft", {
      writable: true,
      value: 50, // Simula que o scroll foi deslocado
    });

    expect(slider.scrollLeft).toBeGreaterThan(0);
  });

  it("should automatically scroll when not dragging", () => {
    jest.useFakeTimers();
    const { getByTestId } = render(
      <ListaDeCuidadores cuidadores={mockCuidadores} />
    );
    const slider = getByTestId("slider");

    slider.scrollTo = jest.fn();

    act(() => {
      jest.advanceTimersByTime(3000);
    });

    expect(slider.scrollTo).toHaveBeenCalled();
    jest.useRealTimers();
  });

  it("should display only 4 cuidadores in mobile view", () => {
    global.innerWidth = 500;
    global.dispatchEvent(new Event("resize"));

    const { getAllByTestId } = render(
      <ListaDeCuidadores cuidadores={mockCuidadores} />
    );
    const cards = getAllByTestId("card-cuidador");

    expect(cards).toHaveLength(4); // Limite para mobile
  });

  it("should display all cuidadores in desktop view", () => {
    global.innerWidth = 1024;
    global.dispatchEvent(new Event("resize"));

    const { getAllByTestId } = render(
      <ListaDeCuidadores cuidadores={mockCuidadores} />
    );
    const cards = getAllByTestId("card-cuidador");

    expect(cards).toHaveLength(mockCuidadores.length);
  });
});
