import Loader from '@/components/ui/Loader/Loader';
import React, { createContext, useContext, useState } from 'react';

type LoaderContextType = {
  loading: boolean;
  showLoader: () => void;
  hideLoader: () => void;
};

export const LoaderContext = createContext<LoaderContextType | undefined>(undefined);

let globalShowLoader: (() => void) | null = null;
let globalHideLoader: (() => void) | null = null;

export const LoaderProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [loading, setLoading] = useState(false);

  const showLoader = () => setLoading(true);
  const hideLoader = () => setLoading(false);

  globalShowLoader = showLoader;
  globalHideLoader = hideLoader;

  return (
    <LoaderContext.Provider value={{ loading, showLoader, hideLoader }}>
      {children}
      {loading && <Loader />}
    </LoaderContext.Provider>
  );
};

export const getShowLoader = () => globalShowLoader;
export const getHideLoader = () => globalHideLoader;