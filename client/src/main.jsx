import React, { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import { ConfigProvider } from 'antd'
import '@ant-design/v5-patch-for-react-19';
import 'antd/dist/reset.css';

import { store, persistor } from './redux/store'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'

const customTheme = {
  token: {
    colorPrimary: "#1abc9c",      // Trust / Action (donate now)
    colorTextBase: "#34495e",     // Dark text for readability
    colorSuccess: "#2ecc71",      // Donation success
    colorError: "#e74c3c",        // Error / problem
    colorWarning: "#f1c40f",      // Attention
    colorInfo: "#3498db",         // Info / updates

    colorBgBase: "#fefefe",       // Light clean background
    colorBgContainer: "#ffffff",  // Cards / containers

    fontFamily: "Poppins, Roboto, sans-serif",
    fontSize: 16,
    borderRadius: 10,             // Slightly soft edges
  },
};
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <ConfigProvider theme={customTheme}>
        <Provider store={store}>
          <PersistGate loading={null} persistor={persistor}>
            <App />
          </PersistGate>
        </Provider>
      </ConfigProvider>
    </BrowserRouter>
  </StrictMode>,
)
