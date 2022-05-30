import React, { Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
// import App from './App';
import 'react-toastify/dist/ReactToastify.css';
import { BrowserRouter } from 'react-router-dom';
import { StoreProvider } from './context/Store';
import { HelmetProvider } from 'react-helmet-async'
import Loading from './components/Loading';

const App = React.lazy(() => import('./App'));

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(

  <React.StrictMode>
    <Suspense fallback={<Loading />}>
    <HelmetProvider>
      <StoreProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </StoreProvider>
    </HelmetProvider>
    </Suspense>
  </React.StrictMode>
);

