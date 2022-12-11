// Design a data table react component with the following functionality
// Menu toggle functionality on the column header with sort functionality
// The table should have firstnmae, lastname, age, email,Mobileno, gender, status, action column
// True status in green color and failed in red color.
// Add row click action to change the background color of the row.
// fetch the data from the localStorage and display in the table.
// Add a delete button in the action column to delete the row.
// Add a edit button in the action column to edit the row.

// Path: client\src\components\Table.jsx
import React, { useState, useEffect } from 'react';
import styles from './Table.module.css';

const Table = () => {
    const [data, setData] = useState([]);
    const [sort, setSort] = useState({
        firstName: false,
        lastName: false,
        age: false,
        email: false,
        mobileNo: false,
        gender: false,
        status: false
    });
    const [sortData, setSortData] = useState([]);
    const [edit, setEdit] = useState({
        firstName: '',
        lastName: '',
        age: '',
        email: '',
        mobile: '',
        gender: '',
        status: ''
    });
    const [editData, setEditData] = useState([]);
    const [editIndex, setEditIndex] = useState(null);
    const [editStatus, setEditStatus] = useState(false);

    useEffect(() => {
        const dataArr = JSON.parse(localStorage.getItem('data')) || [];
        setData(dataArr);
        setSortData(dataArr);
    }, []);

    const handleSort = (e) => {
        const { name } = e.target;
        const sortArr = [...sortData];
        sortArr.sort((a, b) => {
            if (sort[name]) {
                return a[name] > b[name] ? 1 : -1;
            }
            else {
                return a[name] < b[name] ? 1 : -1;
            }
        });
        setSort({ ...sort, [name]: !sort[name] });
        setSortData(sortArr);
    }

    const handleEdit = (e, index) => {
        const { name, value } = e.target;
        setEdit({ ...edit, [name]: value });
        setEditIndex(index);
        setEditStatus(true);
    }

    const handleEditSubmit = (e) => {
        e.preventDefault();
        const { firstName, lastName, age, email, mobileNo, gender, status } = edit;
        const dataArr = [...data];
        dataArr[editIndex] = { firstName, lastName, age, email, mobileNo, gender, status };
        setData(dataArr);
        localStorage.setItem('data', JSON.stringify(dataArr));
        setEdit({
            firstName: '',
            lastName: '',
            age: '',
            email: '',
            mobileNo: '',
            gender: '',
            status: ''
        });
        setEditIndex(null);
        setEditStatus(false);
    }

    const handleDelete = (index) => {
        const dataArr = [...data];
        dataArr.splice(index, 1);
        setData(dataArr);
        localStorage.setItem('data', JSON.stringify(dataArr));
    }

    return (
        <div className={styles.TableContainer}>
            <table>
                <thead>
                    <tr>
                        <th onClick={handleSort} name="firstName">First Name</th>
                        <th onClick={handleSort} name="lastName">Last Name</th>
                        <th onClick={handleSort} name="age">Age</th>
                        <th onClick={handleSort} name="email">Email</th>
                        <th onClick={handleSort} name="mobileNo">Mobile No</th>
                        <th onClick={handleSort}
                        name = "gender">Gender</th>
                        <th onClick={handleSort} name="status">Status</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {sortData.map((item, index) => {
                        return (
                            <tr key={index}>
                                <td>{item.firstName}</td>
                                <td>{item.lastName}</td>
                                <td>{item.age}</td>
                                <td>{item.email}</td>
                                <td>{item.mobileNo}</td>
                                <td>{item.gender}</td>
                                <td style={{ color: item.status === 'true' ? 'green' : 'red' }}>{item.status}</td>
                                <td> <button onClick={() => handleDelete(index)}>Delete</button>
                                    <button onClick={() => setEditStatus(true)}>Edit</button>
                                </td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
            {editStatus && <form onSubmit={handleEditSubmit}>
                <input type="text" name="firstName" value={edit.firstName} onChange={(e) => handleEdit(e, editIndex)}  placeholder="firstName"/>
                <input type="text" name="lastName" value={edit.lastName} onChange={(e) => handleEdit(e, editIndex)} placeholder="lastName" />
                <input type="text" name="age" value={edit.age} onChange={(e) => handleEdit(e, editIndex)} placeholder="age"/>
                <input type="text" name="email" value={edit.email} onChange={(e) => handleEdit(e, editIndex)} placeholder="email" />
                <input type="text" name="mobileNo" value={edit.mobileNo} onChange={(e) => handleEdit(e, editIndex)} placeholder="mobileNo"/>
                <input type="text" name="gender" value={edit.gender} onChange={(e) => handleEdit(e, editIndex)} placeholder="gender"/>
                <input type="text" name="status" value={edit.status} onChange={(e) => handleEdit(e, editIndex)} placeholder="status"/>
                <button type="submit">Submit</button>
            </form>}
        </div>
    )
}

export default Table;