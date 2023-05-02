import React from 'react';
import {BrowserRouter, Routes, Route} from "react-router-dom";
import './App.css'
import CrudList from "./Crud/CrudList";
import ContactPage from "./Contacts/ContactPage";
import TitlePage from "./Titles/TitlePage";
import ContactForm from "./Contacts/ContactForm";
import TitleForm from "./Titles/TitleForm";

function App() {
    const titleKeys = ["id", "description"]
    const contactKeys = ["id", "last_name", "first_name", "email", "title_id"]
    const contactForeignKeys = {title_id: "/titles"}

    return (
        <Routes>
            <Route path="/contacts" element={<CrudList keys={contactKeys} endpoint={"/contacts"}
                                                       foreignKeys={contactForeignKeys}/>}/>
            <Route path={"/contacts/:id"} element={<ContactPage/>}/>
            <Route path={"/contacts/new"} element={<ContactForm/>}/>
            <Route path={"/contacts/:id/update"} element={<ContactForm/>}/>

            <Route path="/titles" element={<CrudList keys={titleKeys} endpoint={"/titles"}/>}/>
            <Route path={"/titles/:id"} element={<TitlePage/>}/>
            <Route path={"/titles/new"} element={<TitleForm/>}/>
            <Route path={"/titles/:id/update"} element={<TitleForm/>}/>
        </Routes>
    );
}

export default App;
