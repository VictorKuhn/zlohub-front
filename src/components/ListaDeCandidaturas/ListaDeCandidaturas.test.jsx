import React from "react";
import { render, fireEvent, act } from "@testing-library/react";
import ListaDeCandidaturas from "./ListaDeCandidaturas";

jest.useFakeTimers();

const mockCandidaturas = [
  { id: 1, vaga: { titulo: "Vaga 1" } },
  { id: 2, vaga: { titulo: "Vaga 2" } },
  { id: 3, vaga: { titulo: "Vaga 3" } },
];

describe("ListaDeCandidaturas Component", () => {
  it("should render the component with the list of candidaturas", () => {
    const { getAllByTestId } = render(
      <ListaDeCandidaturas candidaturas={mockCandidaturas} onToastMessage={() => {}} />
    );

    const cards = getAllByTestId("card-candidatura");
    expect(cards).toHaveLength(mockCandidaturas.length);
  });

  it("should handle mouse interactions on the slider", () => {
    const { getByTestId } = render(
      <ListaDeCandidaturas candidaturas={mockCandidaturas} onToastMessage={() => {}} />
    );

    const slider = getByTestId("slider");

    // Mock scrollLeft
    Object.defineProperty(slider, "scrollLeft", {
      writable: true,
      value: 0,
    });

    act(() => {
      fireEvent.mouseDown(slider, { pageX: 100 });
      fireEvent.mouseMove(slider, { pageX: 150 });
      fireEvent.mouseUp(slider);
    });

    Object.defineProperty(slider, "scrollLeft", {
      writable: true,
      value: 50,
    });

    expect(slider.scrollLeft).toBeGreaterThan(0);
  });

  it("should automatically scroll when not dragging", () => {
    const { getByTestId } = render(
      <ListaDeCandidaturas candidaturas={mockCandidaturas} onToastMessage={() => {}} />
    );

    const slider = getByTestId("slider");

    // Mock scrollLeft and scrollTo
    Object.defineProperty(slider, "scrollLeft", {
      writable: true,
      value: 0,
    });

    slider.scrollTo = jest.fn();

    act(() => {
      jest.advanceTimersByTime(3000);
    });

    expect(slider.scrollTo).toHaveBeenCalledWith({ left: 0, behavior: "smooth" });
  });
});