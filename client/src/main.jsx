import { StrictMode } from 'react'
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
    colorPrimary: "#00927c",
    colorTextBase: "#2d3436",
    colorSuccess: "#00c853",
    colorError: "#d32f2f",
    colorWarning: "#fbc02d",
    colorInfo: "#0288d1",

    colorBgBase: "#f9f9f9",
    colorBgContainer: "#ffffff",

    fontFamily: "Poppins, Roboto, sans-serif",
    fontSize: 16,
    borderRadius: 12,
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
