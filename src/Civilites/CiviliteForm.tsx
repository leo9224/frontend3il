import React from "react";
import './CiviliteForm.css'
import {useNavigate, useParams} from "react-router-dom";
import {Civilite} from "../Types/CiviliteType";
import {IconSubmit} from "../Icons/Icons";
import {useTranslation} from "react-i18next";

function CiviliteForm() {
    const {id} = useParams();
    const {t} = useTranslation();
    const navigate = useNavigate();
    const [civilite, setCivilite] = React.useState<Civilite | undefined>(undefined)
    const [civilitesIds, setCivilitesIds] = React.useState<number[]>([])

    React.useEffect(() => {
        if (id !== undefined)
            fetch(process.env.REACT_APP_API_ENDPOINT + "/civilites/" + id)
                .then(response => response.json())
                .then(data => setCivilite(data))
    }, [])

    React.useEffect(() => {
        fetch(process.env.REACT_APP_API_ENDPOINT + "/civilites")
            .then(response => response.json())
            .then(data => {
                const ids: number[] = []
                data.map((civilite: Civilite) => {
                    ids.push(civilite.id)
                })
                setCivilitesIds(ids)
            })
    })

    const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        const jsonBody = {
            id_civilite: parseInt((event.currentTarget.elements[0] as HTMLInputElement).value),
            libelle: (event.currentTarget.elements[1] as HTMLInputElement).value
        }
        const body = JSON.stringify(jsonBody)

        if (jsonBody.id_civilite in civilitesIds && jsonBody.id_civilite !== civilite?.id) {
            window.alert(t("id already used"))
            return
        }

        if (civilite === undefined) {
            const requestOptions = {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: body
            }

            fetch(process.env.REACT_APP_API_ENDPOINT + '/civilite', requestOptions)
                .then(response => response.json())
        } else {
            const requestOptions = {
                method: 'PUT',
                headers: {'Content-Type': 'application/json'},
                body: body
            }

            fetch(process.env.REACT_APP_API_ENDPOINT + '/civilites/' + id, requestOptions)
                .then(response => response.json())
        }

        navigate("/civilites")
        window.location.reload()
    }

    return (
        <form id={"civiliteForm"} action={"/civilites"} onSubmit={onSubmit}>
            <label htmlFor="id_civilite">{t("id")}</label>
            <input type="number" id="id_civilite" name="id_civilite" required={true}
                   defaultValue={civilite === undefined ? undefined : civilite.id}/>

            <label htmlFor="nom">{t("libelle")}</label>
            <input type="text" id="nom" name="nom" required={true}
                   defaultValue={civilite === undefined ? undefined : civilite.libelle}/>

            <button type="submit">{IconSubmit}</button>
        </form>
    )
}

export default CiviliteForm