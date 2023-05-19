import userEvent from "@testing-library/user-event";
import { queryByAttribute, render, screen } from "@testing-library/react";

import Checkbox from "./Checkbox";

describe('Checkbox:', () => {
  const id = 'checkbox-id';
  const onChangeMock = jest.fn();

  afterEach(() => {
    onChangeMock.mockClear();
  });

  test('should render with correct id', () => {
    const { container } = render(<Checkbox id={id} onChange={onChangeMock} />);
    const checkbox = queryByAttribute('id', container, id);

    expect(checkbox).toBeInTheDocument();
  });

  test('container should have class names from component and from props', () => {
    const classNameFromProps = 'ClassNameFromProps';

    const { container } = render(<Checkbox
      id={id}
      onChange={onChangeMock}
      className={classNameFromProps} />);
    const divContainer = queryByAttribute('class', container, `Round ${classNameFromProps}`);

    expect(divContainer).toBeInTheDocument();
  });

  test('should apply props on attributes of input', () => {
    const disabled = true;
    const checked = true;
    
    render(<Checkbox
      id={id}
      disabled={disabled}
      checked={checked} />);
    const input = screen.getByRole('checkbox'); 

    expect(input).toBeInTheDocument();
    expect(input.checked).toBeTruthy();
    expect(input.disabled).toBeTruthy();
  });

  test('should call callback when input value changes', () => {
    render(<Checkbox onChange={onChangeMock} />);
    const checkbox = screen.getByRole('checkbox');

    userEvent.click(checkbox);

    expect(checkbox).toBeInTheDocument();
    expect(onChangeMock).toHaveBeenCalledTimes(1);
  });
});
