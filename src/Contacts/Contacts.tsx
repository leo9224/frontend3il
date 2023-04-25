import React from "react";
import {Contact} from "../Types/ContactType";
import ContactsActions from "./ContactsActions";
import {IconAdd} from "../Icons/Icons";

function Contacts() {
    const [contacts, setContacts] = React.useState<Contact[]>([])

    React.useEffect(() => {
        fetch(process.env.REACT_APP_API_ENDPOINT + "/contacts")
            .then(response => response.json())
            .then(data => setContacts(data))
    }, [])

    return (
        <div id={"contactsContainer"} className={"crudListContainer"}>
            <div className={"addButtonContainer"}>
                <a href={"/contacts/new"}>
                    <button type={"button"}>{IconAdd}</button>
                </a>
            </div>
            <table>
                <thead>
                <tr>
                    <th>id</th>
                    <th>nom</th>
                    <th>prenom</th>
                    <th>email</th>
                    <th>id_civilite</th>
                    <th>actions</th>
                </tr>
                </thead>
                <tbody>
                {contacts.sort((a, b) => a.id - b.id).map((contact) => {
                    return (
                        <tr key={contact.id}>
                            <td><a href={"/contacts/" + contact.id}>{contact.id}</a></td>
                            <td>{contact.nom}</td>
                            <td>{contact.prenom}</td>
                            <td>{contact.email}</td>
                            <td><a href={"/civilites/" + contact.id_civilite}>{contact.id_civilite}</a></td>
                            <td><ContactsActions id={contact.id}/></td>
                        </tr>
                    )
                })}
                </tbody>
            </table>
        </div>
    )
}

export default Contacts