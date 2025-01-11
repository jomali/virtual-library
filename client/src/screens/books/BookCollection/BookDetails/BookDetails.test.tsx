import React from "react";
import { render, screen } from "@testing-library/react";
import BookDetails from "./BookDetails";

describe("<BookDetails />", () => {
  it("dummy test", () => {
    render(<BookDetails />);

    expect(screen.getByText(/book details/i)).toBeInTheDocument();
    screen.debug();
  });
});
