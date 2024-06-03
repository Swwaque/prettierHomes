import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./styles/index.scss";
import reportWebVitals from "./reportWebVitals";
import { Provider as StoreProvider } from "react-redux";
import store from "./store";
import { PrimeReactProvider } from "primereact/api";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from '@fortawesome/free-solid-svg-icons'
import i18next from 'i18next'
import { initReactI18next } from 'react-i18next'
import HttpApi from 'i18next-http-backend'
import LanguageDetector from 'i18next-browser-languagedetector'
import i18n from "i18next";

library.add(fas);


i18next
  .use(HttpApi)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    supportedLngs: ['en', 'tr', 'es', 'fr', 'de'],
    fallbackLng: 'en',
    debug: false,
    detection: {
      order: ["localStorage", "htmlTag"],
      caches: ['localStorage'],
    },
    react: { useSuspense: false },
    backend: {
      loadPath: '/locales/{{lng}}/translation.json',
    },
  })

i18n.on('languageChanged', (lng) => (document.documentElement.lang = lng))

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <StoreProvider store={store}>
      <PrimeReactProvider>
        <App />
      </PrimeReactProvider>
    </StoreProvider>
  </React.StrictMode>
);

reportWebVitals();
