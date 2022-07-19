function ConsoleCard({ Console, notify }) {

    function handleDelete() {
        fetch(`http://localhost:8080/consoles/${Console.id}`, { method: "DELETE" })
            .then(() => notify({ action: "delete", Console: Console }))
            .catch(error => notify({ action: "delete", error: error }));
    }

    return (
        <tr key={Console.ConsoleId}>
            <td>{Console.model}</td>
            <td>{Console.manufacturer}</td>
            <td>{Console.memoryAmount}</td>
            <td>{Console.processor}</td>
            <td>{Console.price}</td>
            <td>{Console.quantity}</td>
            <td>
                <button id="deleteButton" className="btn btn-danger mr-3" type="button" onClick={handleDelete}>Delete</button>
                <button id="editButton" className="btn btn-secondary" type="button" onClick={() => notify({ action: "edit-form", Console: Console })}>Edit</button>
            </td>
        </tr>
    );
}

export default ConsoleCard;