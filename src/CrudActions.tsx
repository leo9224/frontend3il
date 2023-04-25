import React from "react";
import {IconDelete, IconUpdate} from "./Icons/Icons";

type CrudActionsProps = {
    id: number,
    endpoint: string
}

function CrudActions({id, endpoint}: CrudActionsProps) {
    const onDeleteButtonClick = () => {
        const requestOptions = {
            method: 'DELETE',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({})
        }

        fetch(`${process.env.REACT_APP_API_ENDPOINT}${endpoint}/${id}`, requestOptions)
            .then(response => response.json())

        window.location.reload()
    }

    return (
        <div>
            <a href={`${endpoint}/${id}/update`}>
                <button>{IconUpdate}</button>
            </a>
            <button onClick={onDeleteButtonClick}>{IconDelete}</button>
        </div>
    )
}

export default CrudActions