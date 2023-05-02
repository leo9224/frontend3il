import React from "react";
import {useParams} from "react-router-dom";
import {useTranslation} from "react-i18next";
import CrudActions from "./CrudActions";

type CrudElementProps = {
    keys: string[],
    endpoint: string,
    foreignKeys?: {
        [key: string]: string
    }
}

type CrudElementType = {
    [key: string]: any
}

function CrudElement({keys, endpoint, foreignKeys}: CrudElementProps) {
    const {id} = useParams();
    const {t} = useTranslation();
    const [data, setData] = React.useState<CrudElementType>()

    React.useEffect(() => {
        fetch(`${process.env.REACT_APP_API_ENDPOINT}${endpoint}/${id}`)
            .then(response => response.json())
            .then(data => setData(data))
    }, [endpoint, id])

    return (
        <div className={"crudItemContainer"}>
            {keys.map((key) => {
                if (key.includes("id") && !foreignKeys?.hasOwnProperty(key))
                    key = "id"

                return (
                    <p key={key}>{t(key) + t("separator") + (data !== undefined && data[key])}</p>
                )
            })}

            {data !== undefined && <CrudActions id={data["id"]} endpoint={endpoint}/>}
        </div>
    )
}

export default CrudElement