import React from "react";
import './ContactForm.css'
import {Contact} from "../Types/ContactType";
import {useNavigate, useParams} from "react-router-dom";
import {Title} from "../Types/TitleType";
import {IconSubmit} from "../Icons/Icons";
import {useTranslation} from "react-i18next";

function ContactForm() {
    const {id} = useParams();
    const {t} = useTranslation();
    const navigate = useNavigate();
    const [contact, setContact] = React.useState<Contact | undefined>(undefined)
    const [contactsIds, setContactsIds] = React.useState<number[]>([])
    const [titles, setTitles] = React.useState<Title[]>([])


    React.useEffect(() => {
        if (id !== undefined)
            fetch(process.env.REACT_APP_API_ENDPOINT + "/contacts/" + id)
                .then(response => response.json())
                .then(data => setContact(data))
    }, [])

    React.useEffect(() => {
        fetch(process.env.REACT_APP_API_ENDPOINT + "/contacts")
            .then(response => response.json())
            .then(data => {
                const ids: number[] = []
                data.map((contact: Contact) => {
                    return ids.push(contact.id)
                })
                setContactsIds(ids)
            })
    }, [])

    React.useEffect(() => {
        fetch(process.env.REACT_APP_API_ENDPOINT + "/titles")
            .then(response => response.json())
            .then(data => setTitles(data))
    }, [])

    const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        const jsonBody = {
            id_contact: parseInt((event.currentTarget.elements[0] as HTMLInputElement).value),
            id_civilite: parseInt((event.currentTarget.elements[1] as HTMLInputElement).value),
            nom: (event.currentTarget.elements[2] as HTMLInputElement).value,
            prenom: (event.currentTarget.elements[3] as HTMLInputElement).value,
            email: (event.currentTarget.elements[4] as HTMLInputElement).value,
        }
        const body = JSON.stringify(jsonBody)

        if (jsonBody.id_contact in contactsIds && jsonBody.id_contact !== contact?.id) {
            window.alert(t("id already used"))
            return
        }

        if (contact === undefined) {
            const requestOptions = {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: body
            }

            fetch(process.env.REACT_APP_API_ENDPOINT + '/contact', requestOptions)
                .then(response => response.json())
        } else {
            const requestOptions = {
                method: 'PUT',
                headers: {'Content-Type': 'application/json'},
                body: body
            }

            fetch(process.env.REACT_APP_API_ENDPOINT + '/contacts/' + id, requestOptions)
                .then(response => response.json())
        }

        navigate("/contacts")
    }

    return (
        <form id={"contactForm"} onSubmit={onSubmit}>
            <label htmlFor="id">{t("id")}</label>
            <input type="number" id="id" name="id" required={true}
                   defaultValue={contact === undefined ? undefined : contact.id}/>

            <label htmlFor="title_id">{t("title")}</label>
            <select name="title_id" id="title_id">
                {titles.sort((a, b) => a.id - b.id).map((title) => {
                    return <option key={title.id} value={title.id}
                                   selected={title.id === contact?.title_id}>{title.description}</option>
                })}
            </select>

            <label htmlFor="last_name">{t("last_name")}</label>
            <input type="text" id="last_name" name="last_name" required={true}
                   defaultValue={contact === undefined ? undefined : contact.last_name}/>

            <label htmlFor="first_name">{t("first_name")}</label>
            <input type="text" id="first_name" name="first_name" required={true}
                   defaultValue={contact === undefined ? undefined : contact.first_name}/>

            <label htmlFor="email">{t("email")}</label>
            <input type="email" id="email" name="email" required={true}
                   defaultValue={contact === undefined ? undefined : contact.email}/>

            <button type="submit">{IconSubmit}</button>
        </form>
    )
}

export default ContactForm