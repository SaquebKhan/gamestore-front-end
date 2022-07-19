import { useState } from 'react';

function ShirtForm({ Shirt: initialShirt, notify }) {

    const [Shirt, setShirt] = useState(initialShirt);
    const isAdd = initialShirt.id === 0;

    function handleChange(evt) {
        const clone = { ...Shirt };
        clone[evt.target.name] = evt.target.value;
        setShirt(clone);
    }

    function handleSubmit(evt) {
        evt.preventDefault();

        const url = isAdd ? "http://localhost:8080/tShirts" : `http://localhost:8080/tShirts/${Shirt.id}`;
        const method = isAdd ? "POST" : "PUT";
        const expectedStatus = isAdd ? 201 : 204;

        const init = {
            method,
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify(Shirt)
        };

        fetch(url, init)
            .then(response => {
                if (response.status === expectedStatus) {
                    if (isAdd) {
                        return response.json();
                    } else {
                        return Shirt;
                    }
                }
                return Promise.reject(`Didn't receive expected status: ${expectedStatus}`);
            })
            .then(result => notify({
                action: isAdd ? "add" : "edit",
                Shirt: result
            }))
            .catch(error => notify({ error: error }));

    }

    return (
        <>
            <h1>{Shirt.id > 0 ? "Edit" : "Add"} Shirt</h1>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="size">Size</label>
                    <input type="text" id="size" name="size"
                        className="form-control"
                        value={Shirt.size} onChange={handleChange} />
                </div>
                <div className="mb-3">
                    <label htmlFor="color">Color</label>
                    <input type="text" id="color" name="color"
                        className="form-control"
                        value={Shirt.color} onChange={handleChange} />
                </div>
                <div className="mb-3">
                    <label htmlFor="description">Description</label>
                    <input type="text" id="description" name="description"
                        className="form-control"
                        value={Shirt.description} onChange={handleChange} />
                </div>
                <div className="mb-3">
                    <label htmlFor="price">Price</label>
                    <input type="text" id="price" name="price"
                        className="form-control"
                        value={Shirt.price} onChange={handleChange} />
                </div>
                <div className="mb-3">
                    <label htmlFor="quantity">Quantity</label>
                    <input type="text" id="quantity" name="quantity"
                        className="form-control"
                        value={Shirt.quantity} onChange={handleChange} />
                </div>
                <div className="mb-3">
                    <button className="btn btn-primary mr-3" type="submit">Save</button>
                    <button className="btn btn-secondary" type="button" onClick={() => notify({ action: "cancel" })}>Cancel</button>
                </div>
            </form>
        </>
    );
}

export default ShirtForm;