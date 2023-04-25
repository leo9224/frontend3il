import React from "react";
import {useParams} from "react-router-dom";
import {Civilite} from "../Types/CiviliteType";
import {useTranslation} from "react-i18next";

function CivilitePage() {
    const {id} = useParams();
    const {t} = useTranslation();
    const [civilite, setCivilite] = React.useState<Civilite>()

    React.useEffect(() => {
        fetch(process.env.REACT_APP_API_ENDPOINT + "/civilites/" + id)
            .then(response => response.json())
            .then(data => setCivilite(data))
    }, [])

    return (
        <div className={"crudItemContainer"}>
            <p>{t("id") + t("separator") + civilite?.id}</p>
            <p>{t("libelle") + t("separator") + civilite?.libelle}</p>
        </div>
    )
}

export default CivilitePage