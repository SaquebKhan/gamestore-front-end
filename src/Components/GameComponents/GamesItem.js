import { useState, useEffect } from 'react';
import GamesCard from './GamesCard.js';
import GamesForm from './GamesForm.js';

function Game() {

    const [Game, setGames] = useState([]);
    const [showForm, setShowForm] = useState(false);
    const [scopedGame, setScopedGame] = useState({});
    const [error, setError] = useState();

    useEffect(() => {
        fetch("http://localhost:8080/games")
        .then(response => response.json())
        .then(result => setGames(result))
        .catch(Game.log);
    }, []);

    function addClick() {
        const now = new Date();
        setScopedGame({ id: 0, model: "", manufacturer: "", memoryAmount:"", processor: "", price: "", quantity: ""});
        setShowForm(true);
    }

    function notify({ action, Game, error }) {

        if (error) {
            setError(error);
            setShowForm(false);
            return;
        }

        switch (action) {
            case "add":
                setGames([...Games, Game]);
                break;
            case "edit":
                setGames(Games.map(e => {
                    if (e.id === Game.id) {
                        return Game;
                    }
                    return e;
                }));
                break;
            case "edit-form":
                setScopedGame(Game);
                setShowForm(true);
                return;
            case "delete":
                setGames(Games.filter(e => e.id !== Game.id));
                break;
        }
        
        setError("");
        setShowForm(false);
    }

    if (showForm) {
        return <GamesForm Game={scopedGame} notify={notify} />
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
                        {Games.map(r => <GamesCard key={r.GameId} Game={r} notify={notify} />)}
                    </tbody>
                </table>
            </div>
        </>
    )
}

export default Game;