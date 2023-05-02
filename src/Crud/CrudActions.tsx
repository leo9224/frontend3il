import React from "react";
import {IconDelete, IconUpdate} from "../Icons/Icons";
import {Link, useNavigate} from "react-router-dom";

type CrudActionsProps = {
    id: number,
    endpoint: string
}

function CrudActions({id, endpoint}: CrudActionsProps) {
    const navigate = useNavigate();

    const onDeleteButtonClick = () => {
        const requestOptions = {
            method: 'DELETE',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({})
        }

        fetch(`${process.env.REACT_APP_API_ENDPOINT}${endpoint}/${id}`, requestOptions)
            .then(response => response.json())

        navigate(endpoint)
        window.location.reload()
    }

    return (
        <div>
            <Link to={`${endpoint}/${id}/update`}>
                <button>{IconUpdate}</button>
            </Link>
            <button onClick={onDeleteButtonClick}>{IconDelete}</button>
        </div>
    )
}

export default CrudActions