import React from "react";
import {useNavigate, useParams} from "react-router-dom";
import {useTranslation} from "react-i18next";
import {IconSubmit} from "../Icons/Icons";
import './CrudForm.css'

type CrudFormProps = {
    keys: string[],
    endpoint: string,
    foreignKeys?: {
        [key: string]: string
    }
}

type CrudFormElement = {
    [key: string]: any
}

function CrudForm({keys, endpoint, foreignKeys}: CrudFormProps) {
    const {id} = useParams();
    const {t} = useTranslation();
    const navigate = useNavigate();
    const [data, setData] = React.useState<CrudFormElement | undefined>(undefined)
    const [dataIds, setDataIds] = React.useState<number[]>([])


    React.useEffect(() => {
        if (id !== undefined)
            fetch(`${process.env.REACT_APP_API_ENDPOINT}${endpoint}/${id}`)
                .then(response => response.json())
                .then(data => setData(data))
    }, [endpoint, id])

    React.useEffect(() => {
        fetch(process.env.REACT_APP_API_ENDPOINT + endpoint)
            .then(response => response.json())
            .then(data => {
                const ids: number[] = []
                data.map((data: CrudFormElement) => {
                    return ids.push(data.id)
                })
                setDataIds(ids)
            })
    }, [endpoint])

    const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        const jsonBody: CrudFormElement = {}

        let index = 0
        for (const key of keys) {
            if (key.includes("id") || foreignKeys?.hasOwnProperty(key))
                jsonBody[key] = parseInt((event.currentTarget.elements[index] as HTMLInputElement).value)
            else
                jsonBody[key] = (event.currentTarget.elements[index] as HTMLInputElement).value

            index++
        }

        const body = JSON.stringify(jsonBody)

        if (jsonBody.id in dataIds && jsonBody.id !== data?.id) {
            window.alert(t("id already used"))
            return
        }

        if (data === undefined) {
            const requestOptions = {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: body
            }

            fetch(process.env.REACT_APP_API_ENDPOINT + endpoint, requestOptions)
                .then(response => response)
        } else {
            const requestOptions = {
                method: 'PUT',
                headers: {'Content-Type': 'application/json'},
                body: body
            }

            fetch(`${process.env.REACT_APP_API_ENDPOINT}${endpoint}/${id}`, requestOptions)
                .then(response => response)
        }

        navigate(endpoint)
    }

    return (
        <form id={"crudForm"} onSubmit={onSubmit}>
            {keys.map((key) => {
                let type = "text"
                let finalKey = key

                if (foreignKeys?.hasOwnProperty(key)) {
                    type = "number"
                } else if (key.includes("id")) {
                    type = "number"
                    finalKey = "id"
                }

                return (
                    <div key={key}>
                        <label htmlFor={key}>{t(finalKey)}</label>
                        <input type={type} id={key} name={key} required={true}
                               defaultValue={data === undefined ? undefined : data[finalKey]}/>
                    </div>
                )
            })}

            <button type="submit">{IconSubmit}</button>
        </form>
    )
}

export default CrudForm