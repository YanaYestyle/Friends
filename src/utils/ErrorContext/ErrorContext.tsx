import React, { createContext, useState, ReactNode, useEffect } from 'react';
import Modal from '../../components/ui/Modal/Modal';

type ErrorContextProps = {
  showError: (message: string) => void;
};

let showErrorCallback: ((message: string) => void) | null = null;

export const setShowError = (callback: ((message: string) => void) | null) => {
  showErrorCallback = callback;
};

export const getShowError = () => showErrorCallback;

export const ErrorContext = createContext<ErrorContextProps | undefined>(undefined);

export const ErrorProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const showError = (message: string) => setErrorMessage(message);
  const closeError = () => setErrorMessage(null);

  useEffect(() => {
    setShowError(showError);

    return () => {
      setShowError(null);
    };
  }, []);

  return (
    <ErrorContext.Provider value={{ showError }}>
      {children}
      {errorMessage && (
        <Modal title="Warning" message={errorMessage} onClose={closeError} buttonText="OK" />
      )}
    </ErrorContext.Provider>
  );
};
