import React from "react";
import {IconDelete, IconUpdate} from "../Icons/Icons";

type CivilitesActionsProps = {
    id: number
}

function CivilitesActions({id}: CivilitesActionsProps) {
    const onDeleteButtonClick = () => {
        const requestOptions = {
            method: 'DELETE',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({})
        }

        fetch(process.env.REACT_APP_API_ENDPOINT + '/civilites/' + id, requestOptions)
            .then(response => response.json())

        window.location.reload()
    }

    return (
        <div>
            <a href={"/civilites/" + id + "/update"}>
                <button>{IconUpdate}</button>
            </a>
            <button onClick={onDeleteButtonClick}>{IconDelete}</button>
        </div>
    )
}

export default CivilitesActions