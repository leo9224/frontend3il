import React from "react";
import {IconAdd} from "../Icons/Icons";
import {useTranslation} from "react-i18next";
import CrudActions from "./CrudActions";
import {Link} from "react-router-dom";

type CrudListProps = {
    keys: string[],
    endpoint: string,
    foreignKeys?: {
        [key: string]: string
    }
}

type CrudListElement = {
    [key: string]: any
}

function CrudList({keys, endpoint, foreignKeys}: CrudListProps) {
    const {t} = useTranslation();
    const [data, setData] = React.useState<CrudListElement[]>([])

    React.useEffect(() => {
        fetch(process.env.REACT_APP_API_ENDPOINT + endpoint)
            .then(response => response.json())
            .then(data => setData(data))
    }, [endpoint])

    return (
        <div className={"crudListContainer"}>
            <div className={"addButtonContainer"}>
                <a href={`${endpoint}/new`}>
                    <button type={"button"}>{IconAdd}</button>
                </a>
            </div>
            <table>
                <thead>
                <tr>
                    {keys.map((key) => {
                        if (key.includes("id") && !foreignKeys?.hasOwnProperty(key))
                            return <th key={key}>{t("id")}</th>

                        return <th key={key}>{t(key)}</th>
                    })}
                    <th>{t("actions")}</th>
                </tr>
                </thead>
                <tbody>
                {data.sort((a, b) => a.id - b.id).map((title) => {
                    return (
                        <tr key={title.id}>
                            {keys.map((key) => {

                                if (foreignKeys !== undefined) {
                                    if (foreignKeys.hasOwnProperty(key))
                                        return <td key={key}><Link
                                            to={`${foreignKeys[key]}/${title[key]}`}>{title[key]}</Link></td>
                                    else if (key.includes("id")) {
                                        key = "id"
                                        return <td key={key}><Link to={`${endpoint}/${title[key]}`}>{title[key]}</Link>
                                        </td>
                                    }
                                } else if (key.includes("id")) {
                                    key = "id"
                                    return <td key={key}><Link to={`${endpoint}/${title[key]}`}>{title[key]}</Link></td>
                                }


                                return <td key={key}>{title[key]}</td>
                            })}
                            <td><CrudActions id={title.id} endpoint={endpoint}/></td>
                        </tr>
                    )
                })}
                </tbody>
            </table>
        </div>
    )
}

export default CrudList