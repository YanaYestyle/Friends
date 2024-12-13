import { render, screen, fireEvent } from '@testing-library/react';
import Button from './Button'; // Adjust the import based on where your Button is located
import React from 'react';

describe('Button Component', () => {
  it('fires the onClick event when clicked', () => {
    const handleClick = jest.fn();
    render(<Button onClick={handleClick}>Click Me</Button>);

    fireEvent.click(screen.getByText('Click Me'));

    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('does not fire the onClick event when button is disabled', () => {
    const handleClick = jest.fn();
    render(
      <Button onClick={handleClick} disabled>
        Click Me
      </Button>,
    );

    fireEvent.click(screen.getByText('Click Me'));

    expect(handleClick).not.toHaveBeenCalled();
  });
});
