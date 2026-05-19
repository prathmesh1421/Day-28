import {
  render,
  screen,
  fireEvent,
} from "@testing-library/react";

import {
  describe,
  test,
  expect,
} from "vitest";

import App from "../App";

describe("Hospital Dashboard App", () => {

  test("login redirects to dashboard", () => {

    render(<App />);

    // Find Inputs
    const emailInput =
      screen.getByPlaceholderText(
        "Enter Email"
      );

    const passwordInput =
      screen.getByPlaceholderText(
        "Enter Password"
      );

    // Find Login Button
    const loginButton =
      screen.getByText("Login 🚀");

    // Enter Email
    fireEvent.change(emailInput, {
      target: {
        value: "admin@gmail.com",
      },
    });

    // Enter Password
    fireEvent.change(passwordInput, {
      target: {
        value: "123456",
      },
    });

    // Click Login
    fireEvent.click(loginButton);

    // Check Dashboard Page
    expect(
      screen.getByText(
        "Dashboard Overview"
      )
    ).toBeInTheDocument();

  });

});
