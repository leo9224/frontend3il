import React from "react";
import {IconDelete, IconUpdate} from "../Icons/Icons";

type ContactsActionsProps = {
    id: number
}

function ContactsActions({id}: ContactsActionsProps) {
    const onDeleteButtonClick = () => {
        const requestOptions = {
            method: 'DELETE',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({})
        }

        fetch(process.env.REACT_APP_API_ENDPOINT + '/contacts/' + id, requestOptions)
            .then(response => response.json())

        window.location.reload()
    }

    return (
        <div>
            <a href={"/contacts/" + id + "/update"}>
                <button>{IconUpdate}</button>
            </a>
            <button onClick={onDeleteButtonClick}>{IconDelete}</button>
        </div>
    )
}

export default ContactsActions