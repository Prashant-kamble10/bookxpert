import React, { useState } from 'react'
import Table from "./Table";
import { data } from "../Data/MockData";

const Dashboard = ({ onLogout }) => {
  const [employees, setEmployees] = useState(data);
  const [searchTerm, setSearchTerm] = useState('');
  const [genderFilter, setGenderFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');

  const totalCount = employees.length;
  const activeCount = employees.filter(emp => emp.activeStatus).length;

  const handleDeleteEmployee = (employeeId) => {
    const updatedEmployees = employees.filter(emp => emp.employeeId !== employeeId);
    setEmployees(updatedEmployees);
  };

  const filteredData = employees.filter(emp => {
    const matchesSearch = emp.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesGender = genderFilter === '' || emp.gender === genderFilter;
    const matchesStatus = statusFilter === '' || 
      (statusFilter === 'Active' ? emp.activeStatus : !emp.activeStatus);
    
    return matchesSearch && matchesGender && matchesStatus;
  });

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-8 bg-gradient-to-r from-blue-500 to-blue-600 p-6 rounded-lg shadow-lg">
        <div>
          <h1 className="text-3xl font-bold text-white">Dashboard</h1>
          <p className="text-lg text-blue-100 mt-2">Total Employees: <span className="font-semibold">{totalCount}</span></p>
        </div>
        <div className="text-right flex items-center gap-4">
          <div>
            <p className="text-lg text-green-200">Active Employees: <span className="font-semibold">{activeCount}</span></p>
          </div>
          <button className="btn btn-error btn-outline" onClick={onLogout}>Logout</button>
        </div>
      </div>
      <div className="flex gap-4 mb-6">
        <div className="flex-1">
          <input 
            type="text" 
            placeholder="Search employees..." 
            className="input input-bordered w-full"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <select 
          className="select select-bordered"
          value={genderFilter}
          onChange={(e) => setGenderFilter(e.target.value)}
        >
          <option value="">Filter by Gender</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
        </select>
        <select 
          className="select select-bordered"
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
        >
          <option value="">Filter by Status</option>
          <option value="Active">Active</option>
          <option value="Inactive">Inactive</option>
        </select>
        <button className="btn btn-primary">Add Employee</button>
      </div>

      <Table employeeData={filteredData} onDeleteEmployee={handleDeleteEmployee} />
    </div>
  )
}

export default Dashboard
