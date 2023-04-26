import React from 'react';
import {BrowserRouter, Routes, Route} from "react-router-dom";
import Contacts from "./Contacts/Contacts";
import './App.css'
import Titles from "./Titles/Titles";
import ContactPage from "./Contacts/ContactPage";
import TitlePage from "./Titles/TitlePage";
import ContactForm from "./Contacts/ContactForm";
import TitleForm from "./Titles/TitleForm";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/contacts" element={<Contacts/>}/>
                <Route path={"/contacts/:id"} element={<ContactPage/>}/>
                <Route path={"/contacts/new"} element={<ContactForm/>}/>
                <Route path={"/contacts/:id/update"} element={<ContactForm/>}/>

                <Route path="/titles" element={<Titles/>}/>
                <Route path={"/titles/:id"} element={<TitlePage/>}/>
                <Route path={"/titles/new"} element={<TitleForm/>}/>
                <Route path={"/titles/:id/update"} element={<TitleForm/>}/>
            </Routes>
        </BrowserRouter>
    );
}

export default App;
