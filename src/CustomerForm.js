import { useState } from 'react';
import './CustomerForm.css';

function CustomerForm({ customer: initialCustomer, notify }) {

    const [customer, setCustomer] = useState(initialCustomer);
    const isAdd = initialCustomer.customerId === 0;

    function handleChange(evt) {
        const clone = { ...customer };
        clone[evt.target.name] = evt.target.value;
        setCustomer(clone);
    }

    function handleSubmit(evt) {
        evt.preventDefault();

        const url = `http://localhost:8080/customers`;
        const method = isAdd ? "POST" : "PUT";
        const expectedStatus = isAdd ? 201 : 204;

        const init = {
            method,
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify(customer)
        };

        fetch(url, init)
            .then(response => {

                if (response.status === expectedStatus) {
                    if (isAdd) {
                        return response.json();
                    } else {
                        return customer;
                    }
                }
                return Promise.reject(`Didn't receive expected status: ${expectedStatus}`);
            })
            .then(result => notify({
                action: isAdd ? "add" : "edit",
                customer: result
            }))
            .catch(error => notify({ error: error }));
    }

    return (
        <>
            <h1>{isAdd ? "Add" : "Edit"} Customer</h1>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="firstName">First Name</label>
                    <input type="text" id="firstName" name="firstName"
                        className="form-control"
                        value={customer.firstName} onChange={handleChange} />
                </div>
                <div className="mb-3">
                    <label htmlFor="lastName">Last Name</label>
                    <input type="text" id="lastName" name="lastName"
                        className="form-control"
                        value={customer.lastName} onChange={handleChange} />
                </div>
                <div className="mb-3">
                    <label htmlFor="street">Street</label>
                    <input type="text" id="street" name="street"
                        className="form-control"
                        value={customer.street} onChange={handleChange} />
                </div>
                <div className="mb-3">
                    <label htmlFor="city">City</label>
                    <input type="text" id="city" name="city"
                        className="form-control"
                        value={customer.city} onChange={handleChange} />
                </div>
                <div className="mb-3">
                    <label htmlFor="state">State</label>
                    <select name="state" value={customer.state} onChange={handleChange}>
                        <option value="AL">Alabama</option>
                        <option value="AK">Alaska</option>
                        <option value="AZ">Arizona</option>
                        <option value="AR">Arkansas</option>
                        <option value="CA">California</option>
                        <option value="CO">Colorado</option>
                        <option value="CT">Connecticut</option>
                        <option value="DE">Delaware</option>
                        <option value="DC">District Of Columbia</option>
                        <option value="FL">Florida</option>
                        <option value="GA">Georgia</option>
                        <option value="HI">Hawaii</option>
                        <option value="ID">Idaho</option>
                        <option value="IL">Illinois</option>
                        <option value="IN">Indiana</option>
                        <option value="IA">Iowa</option>
                        <option value="KS">Kansas</option>
                        <option value="KY">Kentucky</option>
                        <option value="LA">Louisiana</option>
                        <option value="ME">Maine</option>
                        <option value="MD">Maryland</option>
                        <option value="MA">Massachusetts</option>
                        <option value="MI">Michigan</option>
                        <option value="MN">Minnesota</option>
                        <option value="MS">Mississippi</option>
                        <option value="MO">Missouri</option>
                        <option value="MT">Montana</option>
                        <option value="NE">Nebraska</option>
                        <option value="NV">Nevada</option>
                        <option value="NH">New Hampshire</option>
                        <option value="NJ">New Jersey</option>
                        <option value="NM">New Mexico</option>
                        <option value="NY">New York</option>
                        <option value="NC">North Carolina</option>
                        <option value="ND">North Dakota</option>
                        <option value="OH">Ohio</option>
                        <option value="OK">Oklahoma</option>
                        <option value="OR">Oregon</option>
                        <option value="PA">Pennsylvania</option>
                        <option value="RI">Rhode Island</option>
                        <option value="SC">South Carolina</option>
                        <option value="SD">South Dakota</option>
                        <option value="TN">Tennessee</option>
                        <option value="TX">Texas</option>
                        <option value="UT">Utah</option>
                        <option value="VT">Vermont</option>
                        <option value="VA">Virginia</option>
                        <option value="WA">Washington</option>
                        <option value="WV">West Virginia</option>
                        <option value="WI">Wisconsin</option>
                        <option value="WY">Wyoming</option>
                    </select>
                </div>
                <div className="mb-3">
                    <label htmlFor="zipcode">Zip Code</label>
                    <input type="text" id="zipcode" name="zipcode"
                        className="form-control"
                        value={customer.zipcode} onChange={handleChange} />
                </div>
                <div className="mb-3">
                    <label htmlFor="level">Level</label>
                    <select name="level" value={customer.level} onChange={handleChange}>
                        <option value="Gold">Gold</option>
                        <option value="Silver">Silver</option>
                        <option value="Bronze">Bronze</option>
                    </select>
                </div>
                <div className="mb-3">
                    <button id="saveButton" className="btn btn-primary mr-3" type="submit">Save</button>
                    <button className="btn btn-secondary" type="button" onClick={() => notify({ action: "cancel" })}>Cancel</button>
                </div>
           </form>
        </>
    );
}

export default CustomerForm;