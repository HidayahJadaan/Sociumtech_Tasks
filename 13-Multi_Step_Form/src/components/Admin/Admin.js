import React from 'react';
import PageTitle from '../PageTitle/PageTitle';
import './Admin.css';

export default function Admin({ Tabs, selectdTabID, GoBack}) {
  const storedAllusers = JSON.parse(localStorage.getItem('allusers')) || [];
function DeleteLocalStorage(){

  localStorage.removeItem('allusers')
}
  return (
    <div className="content-box">
      <PageTitle Tabs={Tabs} selectdTabID={selectdTabID} />
      <table className="user-table">
        <thead>
          <tr>
            <th>User</th>
            <th>Name</th>
            <th>Email</th>
            <th>Phone Number</th>
            <th>Plan Name</th>
            <th>Plan Type</th>
            <th>Plan Amount</th>
          
          </tr>
        </thead>
        <tbody>
          {storedAllusers.map((user, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{user.UserData.Name}</td>
              <td>{user.UserData.Email}</td>
              <td>{user.UserData.PhoneNumber}</td>
              <td>{user.UserPlan.Planname}</td>
              <td>{user.UserPlan.Plantype}</td>
              <td>{user.UserPlan.Planamount}</td>
            
            </tr>
          ))}
        </tbody>
      </table>

      <div className='buttons'>
        <button className='btn' onClick={DeleteLocalStorage}>Delete Users</button>
        <button className='btn next-btn' onClick={GoBack}>Log Out</button>
      </div>
    </div>
  );
}
