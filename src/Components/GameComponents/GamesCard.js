function GamesCard({ Games, notify }) {
  function handleDelete() {
    fetch(`http://localhost:8080/Games/${Games.id}`, { method: "DELETE" })
      .then(() => notify({ action: "delete", Games: Games }))
      .catch((error) => notify({ action: "delete", error: error }));
  }
  return (
    <tr key={Games.Id}>
      <td>{Games.title}</td>
      <td>{Games.ESRBRation}</td>
      <td>{Games.description}</td>
      <td>{Games.price}</td>
      <td>{Games.studio}</td>
      <td>{Games.quantity}</td>
      <td>
        <button
          id="deleteButton"
          className="btn btn-danger mr-3"
          type="button"
          onClick={handleDelete}
        >
          Delete
        </button>
        <button
          id="editButton"
          className="btn btn-secondary"
          type="button"
          onClick={() => notify({ action: "edit-form", Games: Games })}
        >
          Edit
        </button>
      </td>
    </tr>
  );
}
export default GamesCard;
