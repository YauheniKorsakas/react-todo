import { render, screen } from "@testing-library/react";

import TextInput from "./TextInput";

describe('TextInput:', () => {
  test('should render', () => {
    render(<TextInput />);

    const input = screen.getByRole('textbox');

    expect(input).toBeInTheDocument();
    expect(input.spellcheck).toBeFalsy();
  });
});
