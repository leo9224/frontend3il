import React from "react";

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
                <button>update</button>
            </a>
            <button onClick={onDeleteButtonClick}>delete</button>
        </div>
    )
}

export default CivilitesActions