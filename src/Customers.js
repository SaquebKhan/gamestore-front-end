import { useState } from 'react';
import './Customers.css';
import CustomerCard from './CustomerCard.js';
import CustomerForm from './CustomerForm.js';

function Customers() {

    const [customers, setCustomers] = useState([]);
    const [showForm, setShowForm] = useState(false);
    const [scopedCustomer, setScopedCustomer] = useState({});
    const [error, setError] = useState();

    function fetchByLevel(evt) {
        if (evt.target.value === "") {
            setCustomers([]);
        } else {
            fetch("http://localhost:8080/customers/level/" + evt.target.value)
                .then(response => response.json())
                .then(result => setCustomers(result))
                .catch(console.log);
        }
    }

    function fetchByState(evt) {
        if (evt.target.value === "") {
            setCustomers([]);
        } else {
            fetch("http://localhost:8080/customers/state/" + evt.target.value)
                .then(response => response.json())
                .then(result => setCustomers(result))
                .catch(console.log);
        }
    }

    function addClick() {
        setScopedCustomer({ customerId: 0, level: "Gold" });
        setShowForm(true);
    }

    function notify({ action, customer, error }) {

        if (error) {
            setError(error);
            setShowForm(false);
            return;
        }

        switch (action) {
            case "add":
                setCustomers([...customers, customer]);
                break;
            case "edit":
                setCustomers(customers.map(e => {
                    if (e.customerId === customer.customerId) {
                        return customer;
                    }
                    return e;
                }));
                break;
            case "edit-form":
                setScopedCustomer(customer);
                setShowForm(true);
                return;
            case "delete":
                setCustomers(customers.filter(e => e.customerId !== customer.customerId));
                break;
        }
        
        setError("");
        setShowForm(false);
    }

    if (showForm) {
        return <CustomerForm customer={scopedCustomer} notify={notify} />
    }

     return (
        <>
            <div id='buttonPanel' className="row mt-2">
                <button className="btn btn-primary" type="button" onClick={addClick}>Add a Customer</button>
                <select name="level" onChange={fetchByLevel}>
                    <option value="">Get Customers by Level</option>
                    <option value="Gold">Gold</option>
                    <option value="Silver">Silver</option>
                    <option value="Bronze">Bronze</option>
                </select>
                <select name="state" onChange={fetchByState}>
                    <option value="">Get Customers by State</option>
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
            {error && <div className="alert alert-danger">{error}</div>}
            <div>
                <h1 id='customerTitle'>Customers</h1>
                <table id='customers'>
                    <tr>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>City</th>
                        <th>State</th>
                        <th>Zip Code</th>
                        <th>Level</th>
                        <th>Actions</th>
                    </tr>
                    <tbody>
                        {customers.map(r => <CustomerCard key={r.customerId} customer={r} notify={notify} />)}
                    </tbody>
                </table>
            </div>
        </>
    )
}

export default Customers;