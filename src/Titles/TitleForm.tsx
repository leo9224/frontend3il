import React from "react";
import './TitleForm.css'
import {useNavigate, useParams} from "react-router-dom";
import {Title} from "../Types/TitleType";
import {IconSubmit} from "../Icons/Icons";
import {useTranslation} from "react-i18next";

function TitleForm() {
    const {id} = useParams();
    const {t} = useTranslation();
    const navigate = useNavigate();
    const [title, setTitle] = React.useState<Title | undefined>(undefined)
    const [titlesIds, setTitlesIds] = React.useState<number[]>([])

    React.useEffect(() => {
        if (id !== undefined)
            fetch(process.env.REACT_APP_API_ENDPOINT + "/titles/" + id)
                .then(response => response.json())
                .then(data => setTitle(data))
    }, [])

    React.useEffect(() => {
        fetch(process.env.REACT_APP_API_ENDPOINT + "/titles")
            .then(response => response.json())
            .then(data => {
                const ids: number[] = []
                data.map((title: Title) => {
                    return ids.push(title.id)
                })
                setTitlesIds(ids)
            })
    }, [])

    const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        const jsonBody = {
            id_civilite: parseInt((event.currentTarget.elements[0] as HTMLInputElement).value),
            libelle: (event.currentTarget.elements[1] as HTMLInputElement).value
        }
        const body = JSON.stringify(jsonBody)

        if (jsonBody.id_civilite in titlesIds && jsonBody.id_civilite !== title?.id) {
            window.alert(t("id already used"))
            return
        }

        if (title === undefined) {
            const requestOptions = {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: body
            }

            fetch(process.env.REACT_APP_API_ENDPOINT + '/title', requestOptions)
                .then(response => response.json())
        } else {
            const requestOptions = {
                method: 'PUT',
                headers: {'Content-Type': 'application/json'},
                body: body
            }

            fetch(process.env.REACT_APP_API_ENDPOINT + '/titles/' + id, requestOptions)
                .then(response => response.json())
        }

        navigate("/titles")
    }

    return (
        <form id={"titleForm"} onSubmit={onSubmit}>
            <label htmlFor="id_civilite">{t("id")}</label>
            <input type="number" id="id_civilite" name="id_civilite" required={true}
                   defaultValue={title === undefined ? undefined : title.id}/>

            <label htmlFor="nom">{t("description")}</label>
            <input type="text" id="nom" name="nom" required={true}
                   defaultValue={title === undefined ? undefined : title.description}/>

            <button type="submit">{IconSubmit}</button>
        </form>
    )
}

export default TitleForm