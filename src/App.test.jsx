import React from "react";
import { render } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import App from "./App";

beforeAll(() => {
  jest.spyOn(console, "warn").mockImplementation(() => {});
});

afterAll(() => {
  console.warn.mockRestore();
});

test("renders the App component without crashing", () => {
  render(
    <BrowserRouter>
      <App />
    </BrowserRouter>
  );
});
