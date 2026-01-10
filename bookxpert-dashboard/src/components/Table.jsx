import React from 'react'
import { data } from '../Data/MockData'

const Table = ({ employeeData = data }) => {
  const handleEdit = (employeeId) => {
    console.log('Edit employee:', employeeId)
  }

  const handleDelete = (employeeId) => {
    console.log('Delete employee:', employeeId)
  }

  const handlePrint = (employeeId) => {
    console.log('Print employee:', employeeId)
  }

  return (
    <div>
      <div className="overflow-x-auto">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th>Employee ID</th>
              <th>Name</th>
              <th>Gender</th>
              <th>Date of Birth</th>
              <th>State</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {employeeData.map((employee) => (
              <tr key={employee.employeeId}>
                <td>{employee.employeeId}</td>
                <td>
                  <div className="flex items-center gap-3">
                    <div className="avatar">
                      <div className="mask mask-squircle h-12 w-12">
                        <img
                          src={employee.profileImage}
                          alt={employee.name}
                        />
                      </div>
                    </div>
                    <div>
                      <div className="font-bold">{employee.name}</div>
                    </div>
                  </div>
                </td>
                <td>{employee.gender}</td>
                <td>{employee.dob}</td>
                <td>{employee.state}</td>
                <td>
                  <span className={`badge ${employee.activeStatus ? 'badge-success' : 'badge-error'}`}>
                    {employee.activeStatus ? 'Active' : 'Inactive'}
                  </span>
                </td>
                <td>
                  <div className="flex gap-2">
                    <button 
                      className="btn btn-sm btn-info"
                      onClick={() => handleEdit(employee.employeeId)}
                    >
                      Edit
                    </button>
                    <button 
                      className="btn btn-sm btn-warning"
                      onClick={() => handleDelete(employee.employeeId)}
                    >
                      Delete
                    </button>
                    <button 
                      className="btn btn-sm btn-secondary"
                      onClick={() => handlePrint(employee.employeeId)}
                    >
                      Print
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default Table
