import { useState } from 'react';

function ConsoleForm({ Console: initialConsole, notify }) {

    const [Console, setConsole] = useState(initialConsole);
    const isAdd = initialConsole.id === 0;

    function handleChange(evt) {
        const clone = { ...Console };
        clone[evt.target.name] = evt.target.value;
        setConsole(clone);
    }

    function handleSubmit(evt) {
        evt.preventDefault();

        const url = isAdd ? "http://localhost:8080/consoles" : `http://localhost:8080/consoles/${Console.id}`;
        const method = isAdd ? "POST" : "PUT";
        const expectedStatus = isAdd ? 201 : 204;

        const init = {
            method,
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify(Console)
        };

        fetch(url, init)
            .then(response => {
                if (response.status === expectedStatus) {
                    if (isAdd) {
                        return response.json();
                    } else {
                        return Console;
                    }
                }
                return Promise.reject(`Didn't receive expected status: ${expectedStatus}`);
            })
            .then(result => notify({
                action: isAdd ? "add" : "edit",
                Console: result
            }))
            .catch(error => notify({ error: error }));

    }

    return (
        <>
            <h1>{Console.id > 0 ? "Edit" : "Add"} Console</h1>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="model">Model</label>
                    <input type="text" id="model" name="model"
                        className="form-control"
                        value={Console.model} onChange={handleChange} />
                </div>
                <div className="mb-3">
                    <label htmlFor="manufacturer">Manufacturer</label>
                    <input type="text" id="manufacturer" name="manufacturer"
                        className="form-control"
                        value={Console.manufacturer} onChange={handleChange} />
                </div>
                <div className="mb-3">
                    <label htmlFor="memoryAmount">Memory Amount</label>
                    <input type="text" id="memoryAmount" name="memoryAmount"
                        className="form-control"
                        value={Console.memoryAmount} onChange={handleChange} />
                </div>
                <div className="mb-3">
                    <label htmlFor="processor">Processor</label>
                    <input type="text" id="processor" name="processor"
                        className="form-control"
                        value={Console.processor} onChange={handleChange} />
                </div>
                <div className="mb-3">
                    <label htmlFor="price">Price</label>
                    <input type="text" id="price" name="price"
                        className="form-control"
                        value={Console.price} onChange={handleChange} />
                </div>
                <div className="mb-3">
                    <label htmlFor="quantity">Quantity</label>
                    <input type="text" id="quantity" name="quantity"
                        className="form-control"
                        value={Console.quantity} onChange={handleChange} />
                </div>
                <div className="mb-3">
                    <button className="btn btn-primary mr-3" type="submit">Save</button>
                    <button className="btn btn-secondary" type="button" onClick={() => notify({ action: "cancel" })}>Cancel</button>
                </div>
            </form>
        </>
    );
}

export default ConsoleForm;