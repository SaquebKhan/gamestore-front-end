function GamesCard({ Game, notify }) {
  function handleDelete() {
    fetch(`http://localhost:8080/Games/${Game.id}`, { method: "DELETE" })
      .then(() => notify({ action: "delete", Game: Game }))
      .catch((error) => notify({ action: "delete", error: error }));
  }
  return (
    <tr key={Game.GamesId}>
      <td>{Game.title}</td>
      <td>{Game.ESRBRation}</td>
      <td>{Game.description}</td>
      <td>{Game.price}</td>
      <td>{Game.studio}</td>
      <td>{Game.quantity}</td>
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
