import React from "react";
import './Navbar.css'
import {Link} from "react-router-dom";
import ChangeLanguage from "../Language/ChangeLanguage";

function Navbar() {
    return (
        <div id={"navbar"}>
            <div id={"navbarLinks"}>
                <Link to={"/contacts"}>Contacts</Link>
                <Link to={"/titles"}>Titles</Link>
            </div>
            <div id={"navbarLanguage"}>
                <ChangeLanguage/>
            </div>
        </div>

        // <ul id={"navbar"}>
        //     <li><Link to={"/contacts"}>Contacts</Link></li>
        //     <li><Link to={"/titles"}>Titles</Link></li>
        //     <li style={{float: "right"}}><ChangeLanguage/></li>
        // </ul>
    )
}

export default Navbar