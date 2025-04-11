import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import Navbar from "./shared/navbar/navbar";

test("renders Recipe Generator navbar", () => {
  render(
    <BrowserRouter>
      <Navbar />
    </BrowserRouter>
  );
  expect(screen.getByText(/Recipe Generator/i)).toBeInTheDocument();
});
