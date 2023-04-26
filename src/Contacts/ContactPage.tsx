import React from "react";
import {useParams} from "react-router-dom";
import {Contact} from "../Types/ContactType";
import {useTranslation} from "react-i18next";
import CrudActions from "../Crud/CrudActions";

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
            <p>{t("last name") + t("separator") + contact?.last_name}</p>
            <p>{t("first name") + t("separator") + contact?.first_name}</p>
            <p>{t("email") + t("separator") + contact?.email}</p>
            <p>{t("title id") + t("separator") + contact?.title_id}</p>
            {contact !== undefined && <CrudActions id={contact.id} endpoint={"/contacts"}/>}
        </div>
    )
}

export default ContactPage