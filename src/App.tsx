import React from 'react';
import {BrowserRouter, Routes, Route} from "react-router-dom";
import Contacts from "./Contacts/Contacts";
import './App.css'
import Civilites from "./Civilites/Civilites";
import ContactPage from "./Contacts/ContactPage";
import CivilitePage from "./Civilites/CivilitePage";
import ContactForm from "./Contacts/ContactForm";
import CiviliteForm from "./Civilites/CiviliteForm";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/contacts" element={<Contacts/>}/>
                <Route path={"/contacts/:id"} element={<ContactPage/>}/>
                <Route path={"/contacts/new"} element={<ContactForm/>}/>
                <Route path={"/contacts/:id/update"} element={<ContactForm/>}/>

                <Route path="/civilites" element={<Civilites/>}/>
                <Route path={"/civilites/:id"} element={<CivilitePage/>}/>
                <Route path={"/civilites/new"} element={<CiviliteForm/>}/>
                <Route path={"/civilites/:id/update"} element={<CiviliteForm/>}/>
                {/*<Route path="*" element={<NoPage />} />*/}
            </Routes>
        </BrowserRouter>
    );
}

export default App;
