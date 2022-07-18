function CustomerRowCard({ customer, notify }) {

    function handleDelete() {
        fetch(`http://localhost:8080/customers/${customer.customerId}`, { method: "DELETE" })
            .then(() => notify({ action: "delete", customer: customer }))
            .catch(error => notify({ action: "delete", error: error }));
    }

    return (
        <tr key={customer.customerId}>
            <td>{customer.firstName}</td>
            <td>{customer.lastName}</td>
            <td>{customer.city}</td>
            <td>{customer.state}</td>
            <td>{customer.zipcode}</td>
            <td>{customer.level}</td>
            <td>
                <button id="deleteButton" className="btn btn-danger mr-3" type="button" onClick={handleDelete}>Delete</button>
                <button className="btn btn-secondary" type="button" onClick={() => notify({ action: "edit-form", customer: customer })}>Edit</button>
            </td>
        </tr>
     )
 }

export default CustomerRowCard;