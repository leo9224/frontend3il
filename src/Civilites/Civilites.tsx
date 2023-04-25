import React from "react";
import {Civilite} from "../Types/CiviliteType";
import {IconAdd} from "../Icons/Icons";
import {useTranslation} from "react-i18next";
import CrudActions from "../CrudActions";

function Civilites() {
    const {t} = useTranslation();
    const [civilites, setCivilites] = React.useState<Civilite[]>([])

    React.useEffect(() => {
        fetch(process.env.REACT_APP_API_ENDPOINT + "/civilites")
            .then(response => response.json())
            .then(data => setCivilites(data))
    }, [])

    return (
        <div id={"civilitesContainer"} className={"crudListContainer"}>
            <div className={"addButtonContainer"}>
                <a href={"/civilites/new"}>
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
                {civilites.sort((a, b) => a.id - b.id).map((civilite) => {
                    return (
                        <tr key={civilite.id}>
                            <td><a href={"/civilites/" + civilite.id}>{civilite.id}</a></td>
                            <td>{civilite.libelle}</td>
                            <td><CrudActions id={civilite.id} endpoint={"/civilites"}/></td>
                        </tr>
                    )
                })}
                </tbody>
            </table>
        </div>
    )
}

export default Civilites