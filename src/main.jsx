import React from 'react'
import { Provider } from 'react-redux';
import ReactDOM from 'react-dom/client'
import { CalendarApp } from './CalendarApp';
import { BrowserRouter } from 'react-router-dom';

// FONTS & STYLES
import './index.css'
import '@fontsource/poppins/100.css';
import '@fontsource/poppins/200.css';
import '@fontsource/poppins/300.css';
import '@fontsource/poppins/400.css';
import '@fontsource/poppins/500.css';
import '@fontsource/poppins/600.css';
import '@fontsource/poppins/700.css';
import '@fontsource/poppins/800.css';
import '@fontsource/poppins/900.css';
import { store } from './store';

ReactDOM.createRoot(document.getElementById('root')).render(
  // <React.StrictMode>
  <Provider store={ store }>
    <BrowserRouter>
      <CalendarApp />
    </BrowserRouter>
  </Provider>
  // </React.StrictMode>,
)
