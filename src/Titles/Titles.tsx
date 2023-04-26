import React from "react";
import {Title} from "../Types/TitleType";
import {IconAdd} from "../Icons/Icons";
import {useTranslation} from "react-i18next";
import CrudActions from "../CrudActions";

function Titles() {
    const {t} = useTranslation();
    const [titles, setTitles] = React.useState<Title[]>([])

    React.useEffect(() => {
        fetch(process.env.REACT_APP_API_ENDPOINT + "/titles")
            .then(response => response.json())
            .then(data => setTitles(data))
    }, [])

    return (
        <div id={"titlesContainer"} className={"crudListContainer"}>
            <div className={"addButtonContainer"}>
                <a href={"/titles/new"}>
                    <button type={"button"}>{IconAdd}</button>
                </a>
            </div>
            <table>
                <thead>
                <tr>
                    <th>{t("id")}</th>
                    <th>{t("libelle")}</th>
                    <th>{t("actions")}</th>
                </tr>
                </thead>
                <tbody>
                {titles.sort((a, b) => a.id - b.id).map((title) => {
                    return (
                        <tr key={title.id}>
                            <td><a href={"/titles/" + title.id}>{title.id}</a></td>
                            <td>{title.description}</td>
                            <td><CrudActions id={title.id} endpoint={"/titles"}/></td>
                        </tr>
                    )
                })}
                </tbody>
            </table>
        </div>
    )
}

export default Titles