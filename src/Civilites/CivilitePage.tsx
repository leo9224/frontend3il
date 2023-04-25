import React from "react";
import {useParams} from "react-router-dom";
import {Civilite} from "../Types/CiviliteType";

function CivilitePage() {
    const {id} = useParams();
    const [civilite, setCivilite] = React.useState<Civilite>()

    React.useEffect(() => {
        fetch(process.env.REACT_APP_API_ENDPOINT + "/civilites/" + id)
            .then(response => response.json())
            .then(data => setCivilite(data))
    }, [])

    return (
        <div>
            <p>{"id_civilite: " + civilite?.id}</p>
            <p>{"libelle: " + civilite?.libelle}</p>
        </div>
    )
}

export default CivilitePage