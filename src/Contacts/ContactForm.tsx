import React from "react";
import './ContactForm.css'
import {Contact} from "../Types/ContactType";
import {useParams} from "react-router-dom";
import {Civilite} from "../Types/CiviliteType";
import {IconSubmit} from "../Icons/Icons";
import {useTranslation} from "react-i18next";

function ContactForm() {
    const {id} = useParams();
    const {t} = useTranslation();
    const [contact, setContact] = React.useState<Contact | undefined>(undefined)
    const [contactsIds, setContactsIds] = React.useState<number[]>([])
    const [civilites, setCivilites] = React.useState<Civilite[]>([])


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
    })

    React.useEffect(() => {
        fetch(process.env.REACT_APP_API_ENDPOINT + "/civilites")
            .then(response => response.json())
            .then(data => setCivilites(data))
    })

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
    }

    return (
        <form id={"contactForm"} action={"/contacts"} onSubmit={onSubmit}>
            <label htmlFor="id_contact">{t("id")}</label>
            <input type="number" id="id_contact" name="id_contact" required={true}
                   defaultValue={contact === undefined ? undefined : contact.id}/>

            <label htmlFor="id_civilite">{t("civilite")}</label>
            <select name="id_civilite" id="id_civilite">
                {civilites.sort((a, b) => a.id - b.id).map((civilite) => {
                    return <option key={civilite.id} value={civilite.id}
                                   selected={civilite.id === contact?.id_civilite}>{civilite.libelle}</option>
                })}
            </select>

            <label htmlFor="nom">{t("lname")}</label>
            <input type="text" id="nom" name="nom" required={true}
                   defaultValue={contact === undefined ? undefined : contact.nom}/>

            <label htmlFor="prenom">{t("fname")}</label>
            <input type="text" id="prenom" name="prenom" required={true}
                   defaultValue={contact === undefined ? undefined : contact.prenom}/>

            <label htmlFor="email">{t("email")}</label>
            <input type="email" id="email" name="email" required={true}
                   defaultValue={contact === undefined ? undefined : contact.email}/>

            <button type="submit">{IconSubmit}</button>
        </form>
    )
}

export default ContactForm