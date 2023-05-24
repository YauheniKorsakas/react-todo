import { screen } from "@testing-library/react";

import { renderWithProviders } from "../../../../utils/test-utils";
import Footer from "./Footer";

describe('Footer:', () => {
  it('should render footer with correct content', () => {
    renderWithProviders(<Footer />);
    const footer = screen.getByRole('contentinfo');

    expect(footer.textContent).toMatch(/Drag and drop to reorder list/i);
  });
});
