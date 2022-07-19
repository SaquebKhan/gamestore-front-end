function ShirtCard({ Shirt, notify }) {

    function handleDelete() {
        fetch(`http://localhost:8080/Shirts/${Shirt.ShirtId}`, { method: "DELETE" })
            .then(() => notify({ action: "delete", Shirt: Shirt }))
            .catch(error => notify({ action: "delete", error: error }));
    }

    return (
        <tr key={Shirt.ShirtId}>
            <td>{Shirt.size}</td>
            <td>{Shirt.color}</td>
            <td>{Shirt.description}</td>
            <td>{Shirt.price}</td>
            <td>{Shirt.quantity}</td>
            <td>
                <button id="deleteButton" className="btn btn-danger mr-3" type="button" onClick={handleDelete}>Delete</button>
                <button id="editButton" className="btn btn-secondary" type="button" onClick={() => notify({ action: "edit-form", Shirt: Shirt })}>Edit</button>
            </td>
        </tr>
    );
}

export default ShirtCard;