import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './i18n'
import ChangeLanguage from "./Language/ChangeLanguage";

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);
root.render(
    <React.StrictMode>
        <ChangeLanguage/>
        <App/>
    </React.StrictMode>
);
