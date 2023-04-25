import React from "react";
import {Civilite} from "../Types/CiviliteType";
import CivilitesActions from "./CivilitesActions";

function Civilites() {
    const [civilites, setCivilites] = React.useState<Civilite[]>([])

    React.useEffect(() => {
        fetch(process.env.REACT_APP_API_ENDPOINT + "/civilites")
            .then(response => response.json())
            .then(data => setCivilites(data))
    }, [])

    return (
        <div id={"civilitesContainer"}>
            <a href={"/civilites/new"}>
                <button>new</button>
            </a>
            <table>
                <thead>
                <tr>
                    <th>id</th>
                    <th>libelle</th>
                    <th>actions</th>
                </tr>
                </thead>
                <tbody>
                {civilites.sort((a, b) => a.id - b.id).map((civilite) => {
                    return (
                        <tr key={civilite.id}>
                            <td>{civilite.id}</td>
                            <td>{civilite.libelle}</td>
                            <td><CivilitesActions id={civilite.id}/></td>
                        </tr>
                    )
                })}
                </tbody>
            </table>
        </div>
    )
}

export default Civilites