import { screen } from "@testing-library/react";

import { renderWithProviders } from "../../../../utils/test-utils";
import Header from "./Header";

describe('Footer:', () => {
  it('should render footer with correct content', () => {
    renderWithProviders(<Header />);
    const footer = screen.getByRole('banner');

    expect(footer).toBeInTheDocument();
  });
});
