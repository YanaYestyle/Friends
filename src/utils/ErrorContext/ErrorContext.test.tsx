import React from 'react';
import { render, screen, fireEvent, act } from '@testing-library/react';
import { ErrorProvider, getShowError } from './ErrorContext';

jest.mock('../../components/ui/Modal/Modal', () => ({
  __esModule: true,
  default: ({ title, message, onClose, buttonText }: any) => (
    <div data-testid="modal">
      <div>{title}</div>
      <div>{message}</div>
      <button onClick={onClose}>{buttonText}</button>
    </div>
  ),
}));

describe('ErrorProvider', () => {
  it('should render children and no modal by default', () => {
    render(
      <ErrorProvider>
        <div data-testid="child">Child Content</div>
      </ErrorProvider>,
    );

    expect(screen.getByTestId('child')).not.toBeNull();

    const modal = screen.queryByTestId('modal');
    expect(modal).toBeNull();
  });

  it('should display the modal when showError is called', async () => {
    render(
      <ErrorProvider>
        <div data-testid="child">Child Content</div>
      </ErrorProvider>,
    );

    await act(async () => {
      const showError = getShowError();
      if (showError) {
        showError('Test error message');
      }
    });

    const modal = screen.queryByTestId('modal');
    expect(modal).not.toBeNull();
    expect(modal?.textContent).toContain('Test error message');
  });

  it('should close the modal when the close button is clicked', async () => {
    render(
      <ErrorProvider>
        <div data-testid="child">Child Content</div>
      </ErrorProvider>,
    );

    await act(async () => {
      const showError = getShowError();
      if (showError) {
        showError('Test error message');
      }
    });

    const modalBeforeClose = screen.queryByTestId('modal');
    expect(modalBeforeClose).not.toBeNull();

    const closeButton = screen.getByText('OK');
    fireEvent.click(closeButton);

    const modalAfterClose = screen.queryByTestId('modal');
    expect(modalAfterClose).toBeNull();
  });

  it('should update the modal dynamically when showError is called multiple times', async () => {
    render(
      <ErrorProvider>
        <div data-testid="child">Child Content</div>
      </ErrorProvider>,
    );

    await act(async () => {
      const showError = getShowError();
      if (showError) {
        showError('First Error Message');
      }
    });

    const modal = screen.queryByTestId('modal');
    expect(modal).not.toBeNull();
    expect(modal?.textContent).toContain('First Error Message');

    await act(async () => {
      const showError = getShowError();
      if (showError) {
        showError('Second Error Message');
      }
    });

    expect(modal?.textContent).toContain('Second Error Message');
  });
});
