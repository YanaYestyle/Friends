import React, { createContext, useState, ReactNode } from 'react';
import Modal from '@/components/ui/Modal/Modal';

type ErrorContextProps = {
  showError: (message: string) => void;
};

export const ErrorContext = createContext<ErrorContextProps | undefined>(undefined);

export const ErrorProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const showError = (message: string) => {
    setErrorMessage(message);
  };

  const close = () => {
    setErrorMessage(null);
  };

  return (
    <ErrorContext.Provider value={{ showError }}>
      {children}
      {errorMessage && (
        <Modal title="Warning" message={errorMessage} onClose={close} buttonText={'OK'} />
      )}
    </ErrorContext.Provider>
  );
};
