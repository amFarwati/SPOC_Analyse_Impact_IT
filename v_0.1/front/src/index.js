import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles/index.css';
import Caroussel from './Caroussel';
import 'bootstrap/dist/css/bootstrap.min.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Caroussel />
  </React.StrictMode>
);

