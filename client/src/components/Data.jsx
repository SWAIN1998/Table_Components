// //create a form to add data to the table
// the form contain the following fields like firstname, lastname, age, gender,email, Mobileno,status when user click on the submit button the data should be added to the localStorage and the table should be updated with the new data.
import React, { useState } from 'react';
import styles from './Data.module.css';

const Data = () => {
    const [data, setData] = useState({
        firstName: '',
        lastName: '',
        age: '',
        gender: '',
        email: '',
        mobileNo: '',
        status: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setData({ ...data, [name]: value });
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const { firstName, lastName, age,gender, email, mobileNo, status } = data;
        const dataObj = { firstName
            , lastName
            , age
            , gender
            , email
            , mobileNo
            , status
        };
        const dataArr = JSON.parse(localStorage.getItem('data')) || [];
        dataArr.push(dataObj);
        localStorage.setItem('data', JSON.stringify(dataArr));
        setData({
            firstName: '',
            lastName: '',
            age: '',
            gender: '',
            email: '',
            mobileNo: '',
            status: ''
        });
    }
    return (
        <div className={styles.formContainer}>
            <form onSubmit={handleSubmit}>
                <input type="text" name="firstName" value={data.firstName} onChange={handleChange} placeholder="First Name" />
                <input type="text" name="lastName" value={data.lastName} onChange={handleChange} placeholder="Last Name" /> 
                <input type="text" name="age" value={data.age} onChange={handleChange} placeholder="Age" />
                <input type="text" name = "gender" value={data.gender} onChange={handleChange} placeholder="gender" />
                <input type="text" name="email" value={data.email} onChange={handleChange} placeholder="Email" />
                <input type="text" name="mobileNo" value={data.mobileNo} onChange={handleChange} placeholder="Mobile No" />
                <input type="text" name="status" value={data.status} onChange={handleChange} placeholder="Status" />
                <button type="submit">Submit</button>
            </form>
        </div>
    );
}

export default Data;