import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles/global.scss';
import reportWebVitals from './reportWebVitals';
import { RouterProvider } from 'react-router-dom';
import { ErrorProvider } from './utils/ErrorContext/ErrorContext';
import { LoaderProvider } from './utils/LoaderContext/LoaderContext';
import { router } from './router';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <React.StrictMode>
    <div className="container-wrapper">
      <LoaderProvider>
        <ErrorProvider>
          <RouterProvider router={router} />
        </ErrorProvider>
      </LoaderProvider>
    </div>
  </React.StrictMode>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals(console.log);

