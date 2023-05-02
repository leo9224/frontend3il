import React from 'react';
import {Routes, Route} from "react-router-dom";
import './App.css'
import CrudList from "./Crud/CrudList";
import CrudForm from "./Crud/CrudForm";
import CrudElement from "./Crud/CrudElement";

function App() {
    const titleEndpoint = "/titles"
    const titleKeys = ["title_id", "description"]

    const contactEndpoint = "/contacts"
    const contactKeys = ["contact_id", "last_name", "first_name", "email", "title_id"]
    const contactForeignKeys = {title_id: titleEndpoint}

    return (
        <Routes>
            <Route path="/contacts" element={<CrudList keys={contactKeys} endpoint={contactEndpoint}
                                                       foreignKeys={contactForeignKeys}/>}/>
            <Route path={"/contacts/:id"} element={<CrudElement keys={contactKeys} endpoint={contactEndpoint}
                                                                foreignKeys={contactForeignKeys}/>}/>
            <Route path={"/contacts/new"} element={<CrudForm keys={contactKeys} endpoint={contactEndpoint}
                                                             foreignKeys={contactForeignKeys}/>}/>
            <Route path={"/contacts/:id/update"} element={<CrudForm keys={contactKeys} endpoint={contactEndpoint}
                                                                    foreignKeys={contactForeignKeys}/>}/>

            <Route path="/titles" element={<CrudList keys={titleKeys} endpoint={titleEndpoint}/>}/>
            <Route path={"/titles/:id"} element={<CrudElement keys={titleKeys} endpoint={titleEndpoint}/>}/>
            <Route path={"/titles/new"} element={<CrudForm keys={titleKeys} endpoint={titleEndpoint}/>}/>
            <Route path={"/titles/:id/update"} element={<CrudForm keys={titleKeys} endpoint={titleEndpoint}/>}/>
        </Routes>
    );
}

export default App;
