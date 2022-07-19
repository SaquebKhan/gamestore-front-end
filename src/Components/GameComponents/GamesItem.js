import { useState, useEffect } from 'react';
import GamesCard from './GamesCard.js';
import GamesForm from './GamesForm.js';

function Games() {

    const [Games, setGames] = useState([]);
    const [showForm, setShowForm] = useState(false);
    const [scopedGame, setScopedGame] = useState({});
    const [error, setError] = useState();

    useEffect(() => {
        fetch("http://localhost:8080/games")
        .then(response => response.json())
        .then(result => setGames(result))
        .catch(Games.log);
    }, []);

    function addClick() {
        const now = new Date();
        setScopedGame({ id: 0, model: "", manufacturer: "", memoryAmount:"", processor: "", price: "", quantity: ""});
        setShowForm(true);
    }

    function notify({ action, Games, error }) {

        if (error) {
            setError(error);
            setShowForm(false);
            return;
        }

        switch (action) {
            case "add":
                setGames([...Games, Games]);
                break;
            case "edit":
                setGames(Games.map(e => {
                    if (e.id === Games.id) {
                        return Games;
                    }
                    return e;
                }));
                break;
            case "edit-form":
                setScopedGame(Games);
                setShowForm(true);
                return;
            case "delete":
                setGames(Games.filter(e => e.id !== Games.id));
                break;
        }
        
        setError("");
        setShowForm(false);
    }

    if (showForm) {
        return <GamesForm Games={scopedGame} notify={notify} />
    }

    return (
        <>
            {error && <div className="alert alert-danger">{error}</div>}
            <div>
                <h1 id='GameTitle'>Games</h1>
                <button className="btn btn-primary" type="button" onClick={addClick}>Add a Game</button>
                <table id='Games'>
                <tr>
                    <th>Title</th>
                    <th>ESRBRating </th>
                    <th>description</th>
                    <th>price</th>
                    <th>studio</th>
                    <th>quantity</th>
                    </tr>
                    <tbody>
                        {Games.map(r => <GamesCard key={r.Id} Games={r} notify={notify} />)}
                    </tbody>
                </table>
            </div>
        </>
    )
}

export default Games;