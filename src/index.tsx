import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './i18n'
import ChangeLanguage from "./Language/ChangeLanguage";
import Navbar from "./Navbar/Navbar";
import {BrowserRouter} from "react-router-dom";

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);
root.render(
    <React.StrictMode>
        <BrowserRouter>
            <Navbar/>
            <App/>
        </BrowserRouter>
    </React.StrictMode>
);
