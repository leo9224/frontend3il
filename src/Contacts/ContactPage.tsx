import React from "react";
import {useParams} from "react-router-dom";
import {Contact} from "../Types/ContactType";
import ContactsActions from "./ContactsActions";

function ContactPage() {
    const {id} = useParams();
    const [contact, setContact] = React.useState<Contact>()

    React.useEffect(() => {
        fetch(process.env.REACT_APP_API_ENDPOINT + "/contacts/" + id)
            .then(response => response.json())
            .then(data => setContact(data))
    }, [])


    return (
        <div>
            <p>{"id_contact: " + contact?.id}</p>
            <p>{"nom: " + contact?.nom}</p>
            <p>{"prenom: " + contact?.prenom}</p>
            <p>{"email: " + contact?.email}</p>
            <p>{"id_civilite: " + contact?.id_civilite}</p>
            {contact !== undefined && <ContactsActions id={contact.id}/>}
        </div>
    )
}

export default ContactPage