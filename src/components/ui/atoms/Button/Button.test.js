import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import Button from './Button';

describe('Button:', () => {
  const title = 'button title';

  test('should render with the correct title', () => {
    render(<Button title={title} />);
    const button = screen.getByText(title);

    expect(button).toBeInTheDocument();
    expect(button).toBeEnabled();
  });

  test('should invoke passed handler after click', () => {
    const mockCallback = jest.fn();
    render(<Button title={title} onClick={mockCallback}/>);
    const button = screen.getByText(title);

    userEvent.click(button);

    expect(mockCallback).toHaveBeenCalled();
  });
});
