import React from "react";
import {useParams} from "react-router-dom";
import {Title} from "../Types/TitleType";
import {useTranslation} from "react-i18next";
import CrudActions from "../Crud/CrudActions";

function TitlePage() {
    const {id} = useParams();
    const {t} = useTranslation();
    const [title, setTitle] = React.useState<Title>()

    React.useEffect(() => {
        fetch(process.env.REACT_APP_API_ENDPOINT + "/titles/" + id)
            .then(response => response.json())
            .then(data => setTitle(data))
    }, [])

    return (
        <div className={"crudItemContainer"}>
            <p>{t("id") + t("separator") + title?.id}</p>
            <p>{t("description") + t("separator") + title?.description}</p>
            {title !== undefined && <CrudActions id={title.id} endpoint={"/titles"}/>}
        </div>
    )
}

export default TitlePage