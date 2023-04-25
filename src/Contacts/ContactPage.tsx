import React from "react";
import {useParams} from "react-router-dom";
import {Contact} from "../Types/ContactType";
import ContactsActions from "./ContactsActions";
import {useTranslation} from "react-i18next";

function ContactPage() {
    const {id} = useParams();
    const {t} = useTranslation();
    const [contact, setContact] = React.useState<Contact>()

    React.useEffect(() => {
        fetch(process.env.REACT_APP_API_ENDPOINT + "/contacts/" + id)
            .then(response => response.json())
            .then(data => setContact(data))
    }, [])


    return (
        <div className={"crudItemContainer"}>
            <p>{t("id") + t("separator") + contact?.id}</p>
            <p>{t("lname") + t("separator") + contact?.nom}</p>
            <p>{t("fname") + t("separator") + contact?.prenom}</p>
            <p>{t("email") + t("separator") + contact?.email}</p>
            <p>{t("id civilite") + t("separator") + contact?.id_civilite}</p>
            {contact !== undefined && <ContactsActions id={contact.id}/>}
        </div>
    )
}

export default ContactPage