import { useState, useEffect } from 'react';
import ConsoleCard from './ConsoleCard.js';
import ConsoleForm from './ConsoleForm.js';

function Consoles() {

    const [Consoles, setConsoles] = useState([]);
    const [showForm, setShowForm] = useState(false);
    const [scopedConsole, setScopedConsole] = useState({});
    const [error, setError] = useState();

    useEffect(() => {
        fetch("http://localhost:8080/consoles")
        .then(response => response.json())
        .then(result => setConsoles(result))
        .catch(console.log);
    }, []);

    function addClick() {
        const now = new Date();
        setScopedConsole({ id: 0, model: "", manufacturer: "", memoryAmount:"", processor: "", price: "", quantity: ""});
        setShowForm(true);
    }

    function notify({ action, Console, error }) {

        if (error) {
            setError(error);
            setShowForm(false);
            return;
        }

        switch (action) {
            case "add":
                setConsoles([...Consoles, Console]);
                break;
            case "edit":
                setConsoles(Consoles.map(e => {
                    if (e.id === Console.id) {
                        return Console;
                    }
                    return e;
                }));
                break;
            case "edit-form":
                setScopedConsole(Console);
                setShowForm(true);
                return;
            case "delete":
                setConsoles(Consoles.filter(e => e.id !== Console.id));
                break;
        }
        
        setError("");
        setShowForm(false);
    }

    if (showForm) {
        return <ConsoleForm Console={scopedConsole} notify={notify} />
    }

    return (
        <>
            {error && <div className="alert alert-danger">{error}</div>}
            <div>
                <h1 id='ConsoleTitle'>Consoles</h1>
                <button className="btn btn-primary" type="button" onClick={addClick}>Add a Console</button>
                <table id='Consoles'>
                    <tr>
                        <th>Model</th>
                        <th>Manufacturer</th>
                        <th>MemoryAmount</th>
                        <th>Processor</th>
                        <th>Price</th>
                        <th>Quantity</th>
                    </tr>
                    <tbody>
                        {Consoles.map(r => <ConsoleCard key={r.ConsoleId} Console={r} notify={notify} />)}
                    </tbody>
                </table>
            </div>
        </>
    )
}

export default Consoles;