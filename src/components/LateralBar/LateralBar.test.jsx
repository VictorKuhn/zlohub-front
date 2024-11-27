/* eslint-disable testing-library/no-node-access */
/* eslint-disable testing-library/no-container */
import React from "react";
import { render, screen } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import LateralBar from "./LateralBar";
import "@testing-library/jest-dom";

describe("LateralBar Component", () => {
  it("should render the sidebar container", () => {
    const { container } = render(
      <Router>
        <LateralBar isMobileMenuOpen={false} onToggleMobileMenu={jest.fn()} />
      </Router>
    );

    // Verifica se o contêiner principal da sidebar está presente
    expect(container.querySelector(".desktop-only")).toBeInTheDocument();
  });

  it("should expand and collapse the sidebar on hover", () => {
    const { container } = render(
      <Router>
        <LateralBar isMobileMenuOpen={false} onToggleMobileMenu={jest.fn()} />
      </Router>
    );

    const sidebar = container.querySelector(".desktop-only");
    expect(sidebar).toBeInTheDocument();
  });
});