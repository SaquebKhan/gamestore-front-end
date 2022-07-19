import { useState } from 'react';

function GamesForm({ Games: initialGames, notify }) {

    const [Games, setGames] = useState(initialGames);
    const isAdd = initialGames.id === 0;

    function handleChange(evt) {
        const clone = { ...Games };
        clone[evt.target.name] = evt.target.value;
        setGames(clone);
    }

    function handleSubmit(evt) {
        evt.preventDefault();

        const url = isAdd ? "http://localhost:8080/games" : `http://localhost:8080/games/${Games.id}`;
        const method = isAdd ? "POST" : "PUT";
        const expectedStatus = isAdd ? 201 : 204;

        const init = {
            method,
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify(Games)
        };

        fetch(url, init)
            .then(response => {
                if (response.status === expectedStatus) {
                    if (isAdd) {
                        return response.json();
                    } else {
                        return Games;
                    }
                }
                return Promise.reject(`Didn't receive expected status: ${expectedStatus}`);
            })
            .then(result => notify({
                action: isAdd ? "add" : "edit",
                Games: result
            }))
            .catch(error => notify({ error: error }));

    }

    return (
        <>
            <h1>{Games.id > 0 ? "Edit" : "Add"} Games</h1>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="title">Title</label>
                    <input type="text" id="title" name="title"
                        className="form-control"
                        value={Games.title} onChange={handleChange} />
                </div>
                <div className="mb-3">
                    <label htmlFor="ESRBRating">ESRB Rating</label>
                    <input type="text" id="ESRBRating" name="ESRBRating"
                        className="form-control"
                        value={Games.ESRBRating} onChange={handleChange} />
                </div>
                <div className="mb-3">
                    <label htmlFor="description">Description</label>
                    <input type="text" id="description" name="description"
                        className="form-control"
                        value={Games.description} onChange={handleChange} />
                </div>
                <div className="mb-3">
                    <label htmlFor="price">Price</label>
                    <input type="text" id="price" name="price"
                        className="form-control"
                        value={Games.price} onChange={handleChange} />
                </div>
                <div className="mb-3">
                    <label htmlFor="studio">Studio</label>
                    <input type="text" id="studio" name="studio"
                        className="form-control"
                        value={Games.studio} onChange={handleChange} />
                </div>
                <div className="mb-3">
                    <label htmlFor="quantity">Quantity</label>
                    <input type="text" id="quantity" name="quantity"
                        className="form-control"
                        value={Games.quantity} onChange={handleChange} />
                </div>
                <div className="mb-3">
                    <button className="btn btn-primary mr-3" type="submit">Save</button>
                    <button className="btn btn-secondary" type="button" onClick={() => notify({ action: "cancel" })}>Cancel</button>
                </div>
            </form>
        </>
    );
}

export default GamesForm;