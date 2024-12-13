import React from 'react';
import { render, screen, act } from '@testing-library/react';
import { LoaderProvider, getShowLoader, getHideLoader } from './LoaderContext';

jest.mock('../../components/ui/Loader/Loader', () => ({
  __esModule: true,
  default: () => <div data-testid="loader">Loading...</div>,
}));

describe('LoaderProvider', () => {
  it('should render children and no loader by default', () => {
    render(
      <LoaderProvider>
        <div data-testid="child">Child Content</div>
      </LoaderProvider>,
    );

    expect(screen.getByTestId('child')).not.toBeNull();

    const loader = screen.queryByTestId('loader');
    expect(loader).toBeNull();
  });

  it('should show loader when showLoader is called', async () => {
    render(
      <LoaderProvider>
        <div data-testid="child">Child Content</div>
      </LoaderProvider>,
    );

    await act(async () => {
      const showLoader = getShowLoader();
      if (showLoader) {
        showLoader();
      }
    });

    const loader = screen.queryByTestId('loader');
    expect(loader).not.toBeNull();
  });

  it('should hide loader when hideLoader is called', async () => {
    render(
      <LoaderProvider>
        <div data-testid="child">Child Content</div>
      </LoaderProvider>,
    );

    await act(async () => {
      const showLoader = getShowLoader();
      if (showLoader) {
        showLoader();
      }
    });

    let loader = screen.queryByTestId('loader');
    expect(loader).not.toBeNull();

    await act(async () => {
      const hideLoader = getHideLoader();
      if (hideLoader) {
        hideLoader();
      }
    });

    loader = screen.queryByTestId('loader');
    expect(loader).toBeNull(); // Loader should be gone
  });

  it('should show and hide loader correctly when showLoader and hideLoader are called multiple times', async () => {
    render(
      <LoaderProvider>
        <div data-testid="child">Child Content</div>
      </LoaderProvider>,
    );

    await act(async () => {
      const showLoader = getShowLoader();
      if (showLoader) {
        showLoader();
      }
    });

    let loader = screen.queryByTestId('loader');
    expect(loader).not.toBeNull();

    await act(async () => {
      const hideLoader = getHideLoader();
      if (hideLoader) {
        hideLoader();
      }
    });

    loader = screen.queryByTestId('loader');
    expect(loader).toBeNull();

    await act(async () => {
      const showLoader = getShowLoader();
      if (showLoader) {
        showLoader();
      }
    });

    loader = screen.queryByTestId('loader');
    expect(loader).not.toBeNull();
  });

  it('should set global showLoader and hideLoader callbacks correctly', async () => {
    render(
      <LoaderProvider>
        <div data-testid="child">Child Content</div>
      </LoaderProvider>,
    );

    const showLoader = getShowLoader();
    const hideLoader = getHideLoader();

    expect(showLoader).toBeInstanceOf(Function);
    expect(hideLoader).toBeInstanceOf(Function);

    await act(async () => {
      showLoader?.();
    });
    const loader = screen.queryByTestId('loader');
    expect(loader).not.toBeNull(); // Loader should be visible

    await act(async () => {
      hideLoader?.();
    });
    expect(screen.queryByTestId('loader')).toBeNull();
  });
});
