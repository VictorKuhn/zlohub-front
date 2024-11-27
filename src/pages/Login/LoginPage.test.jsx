import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import LoginPage from "./LoginPage";

// Importa o matcher para evitar erros com `toBeInTheDocument`
import "@testing-library/jest-dom";

// Mock do `useNavigate`
const mockNavigate = jest.fn();
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockNavigate,
}));

describe("LoginPage Component", () => {
  it("should render all elements of the LoginPage", () => {
    render(
      <BrowserRouter>
        <LoginPage />
      </BrowserRouter>
    );

    // Verifica se os elementos principais são renderizados
    expect(screen.getByText("zloHub")).toBeInTheDocument(); // Título
    expect(
      screen.getByText("Conectando quem tem zelo por você.")
    ).toBeInTheDocument(); // Subtítulo
    expect(screen.getByPlaceholderText("E-mail...")).toBeInTheDocument(); // Input de e-mail
    expect(screen.getByPlaceholderText("Senha...")).toBeInTheDocument(); // Input de senha
    expect(screen.getByText("Entrar")).toBeInTheDocument(); // Botão de login
    expect(screen.getByText("Cadastrar-se")).toBeInTheDocument(); // Link "Cadastrar-se"
    expect(screen.getByText("Esqueci a senha")).toBeInTheDocument(); // Link "Esqueci a senha"
  });

  it("should update input fields when typing", () => {
    render(
      <BrowserRouter>
        <LoginPage />
      </BrowserRouter>
    );

    const emailInput = screen.getByPlaceholderText("E-mail...");
    const passwordInput = screen.getByPlaceholderText("Senha...");

    // Simula a digitação nos inputs
    fireEvent.change(emailInput, { target: { value: "test@example.com" } });
    fireEvent.change(passwordInput, { target: { value: "password123" } });

    // Verifica se os valores foram atualizados corretamente
    expect(emailInput.value).toBe("test@example.com");
    expect(passwordInput.value).toBe("password123");
  });

  it("should navigate to the register page when clicking 'Cadastrar-se'", () => {
    render(
      <BrowserRouter>
        <LoginPage />
      </BrowserRouter>
    );

    const registerLink = screen.getByText("Cadastrar-se");
    fireEvent.click(registerLink);

    // Verifica se a navegação foi chamada com o path correto
    expect(mockNavigate).toHaveBeenCalledWith("/register");
  });

  it("should navigate to the recover password page when clicking 'Esqueci a senha'", () => {
    render(
      <BrowserRouter>
        <LoginPage />
      </BrowserRouter>
    );

    const recoverLink = screen.getByText("Esqueci a senha");
    fireEvent.click(recoverLink);

    // Verifica se a navegação foi chamada com o path correto
    expect(mockNavigate).toHaveBeenCalledWith("/recoverPassword");
  });
});
