import React, { useState, useRef } from 'react'

const INDIAN_STATES = [
  'Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar', 'Chhattisgarh',
  'Delhi', 'Goa', 'Gujarat', 'Haryana', 'Himachal Pradesh',
  'Jharkhand', 'Karnataka', 'Kerala', 'Madhya Pradesh', 'Maharashtra',
  'Manipur', 'Meghalaya', 'Mizoram', 'Nagaland', 'Odisha',
  'Punjab', 'Rajasthan', 'Sikkim', 'Tamil Nadu', 'Telangana',
  'Tripura', 'Uttar Pradesh', 'Uttarakhand', 'West Bengal'
];

const EmployeeForm = ({ isOpen, onClose, onSubmit, editingEmployee }) => {
  const [formData, setFormData] = useState({
    fullName: '',
    gender: '',
    state: '',
    dob: '',
    activeStatus: 'true',
    image: null,
    imagePreview: null
  });

  const [errors, setErrors] = useState({});
  const idCounter = useRef(0);

  React.useEffect(() => {
    if (editingEmployee) {
      setFormData({
        fullName: editingEmployee.name || '',
        gender: editingEmployee.gender || '',
        state: editingEmployee.state || '',
        dob: editingEmployee.dob || '',
        activeStatus: editingEmployee.activeStatus ? 'true' : 'false',
        image: null,
        imagePreview: editingEmployee.profileImage || null
      });
    } else {
      resetForm();
    }
  }, [editingEmployee]);

  const validateForm = () => {
    const newErrors = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Full Name is required';
    } else if (formData.fullName.trim().length < 3) {
      newErrors.fullName = 'Full Name must be at least 3 characters';
    }

    if (!formData.gender) {
      newErrors.gender = 'Gender is required';
    }

    if (!formData.state) {
      newErrors.state = 'State is required';
    }

    if (!formData.dob) {
      newErrors.dob = 'Date of Birth is required';
    } else {
      const age = new Date().getFullYear() - new Date(formData.dob).getFullYear();
      if (age < 18) {
        newErrors.dob = 'Employee must be at least 18 years old';
      }
    }

    if (!editingEmployee && !formData.image) {
      newErrors.image = 'Profile image is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData(prev => ({
          ...prev,
          image: file,
          imagePreview: reader.result
        }));
        if (errors.image) {
          setErrors(prev => ({
            ...prev,
            image: ''
          }));
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    const employeeData = {
      name: formData.fullName,
      gender: formData.gender,
      state: formData.state,
      dob: formData.dob,
      activeStatus: formData.activeStatus === 'true',
      profileImage: formData.imagePreview
    };

    if (editingEmployee) {
      const updatedEmployee = {
        ...editingEmployee,
        ...employeeData
      };
      onSubmit(updatedEmployee, true);
    } else {
      idCounter.current += 1;
      const employeeId = `EMP${String(idCounter.current).padStart(5, '0')}`;
      const newEmployee = {
        employeeId,
        ...employeeData
      };
      onSubmit(newEmployee, false);
    }
    
    resetForm();
  };

  const resetForm = () => {
    setFormData({
      fullName: '',
      gender: '',
      state: '',
      dob: '',
      activeStatus: 'true',
      image: null,
      imagePreview: null
    });
    setErrors({});
  };

  const handleCloseModal = () => {
    resetForm();
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="modal modal-open">
      <div className="modal-box w-11/12 max-w-2xl">
        <div className="flex justify-between items-center mb-4">
          <h3 className="font-bold text-lg">{editingEmployee ? 'Edit Employee' : 'Add New Employee'}</h3>
          <button 
            type="button"
            onClick={handleCloseModal}
            className="btn btn-sm btn-circle btn-ghost"
          >
            ✕
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          {/* Full Name */}
          <div className="form-control mb-4">
            <label className="label">
              <span className="label-text">Full Name *</span>
            </label>
            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              placeholder="Enter full name"
              className={`input input-bordered ${errors.fullName ? 'input-error' : ''}`}
            />
            {errors.fullName && <span className="text-error text-sm mt-1">{errors.fullName}</span>}
          </div>

          {/* Gender and State Row */}
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div className="form-control">
              <label className="label">
                <span className="label-text">Gender *</span>
              </label>
              <select
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                className={`select select-bordered ${errors.gender ? 'select-error' : ''}`}
              >
                <option value="">Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
              {errors.gender && <span className="text-error text-sm mt-1">{errors.gender}</span>}
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text">State *</span>
              </label>
              <select
                name="state"
                value={formData.state}
                onChange={handleChange}
                className={`select select-bordered ${errors.state ? 'select-error' : ''}`}
              >
                <option value="">Select State</option>
                {INDIAN_STATES.map(state => (
                  <option key={state} value={state}>{state}</option>
                ))}
              </select>
              {errors.state && <span className="text-error text-sm mt-1">{errors.state}</span>}
            </div>
          </div>

          {/* DOB and Status Row */}
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div className="form-control">
              <label className="label">
                <span className="label-text">Date of Birth *</span>
              </label>
              <input
                type="date"
                name="dob"
                value={formData.dob}
                onChange={handleChange}
                className={`input input-bordered ${errors.dob ? 'input-error' : ''}`}
              />
              {errors.dob && <span className="text-error text-sm mt-1">{errors.dob}</span>}
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text">Status *</span>
              </label>
              <div className="flex gap-6 items-center pt-2">
                <label className="label cursor-pointer">
                  <input
                    type="radio"
                    name="activeStatus"
                    value="true"
                    checked={formData.activeStatus === 'true'}
                    onChange={handleChange}
                    className="radio radio-primary"
                  />
                  <span className="label-text ml-2">Active</span>
                </label>
                <label className="label cursor-pointer">
                  <input
                    type="radio"
                    name="activeStatus"
                    value="false"
                    checked={formData.activeStatus === 'false'}
                    onChange={handleChange}
                    className="radio radio-error"
                  />
                  <span className="label-text ml-2">Inactive</span>
                </label>
              </div>
            </div>
          </div>

          {/* Image Upload */}
          <div className="form-control mb-4">
            <label className="label">
              <span className="label-text">Profile Image *</span>
            </label>
            <input
              type="file"
              name="image"
              accept="image/*"
              onChange={handleImageChange}
              className={`file-input file-input-bordered w-full ${errors.image ? 'file-input-error' : ''}`}
            />
            {errors.image && <span className="text-error text-sm mt-1">{errors.image}</span>}
            
            {formData.imagePreview && (
              <div className="mt-3">
                <img 
                  src={formData.imagePreview} 
                  alt="Preview" 
                  className="w-24 h-24 rounded object-cover"
                />
              </div>
            )}
          </div>

          {/* Form Actions */}
          <div className="modal-action">
            <button
              type="button"
              onClick={handleCloseModal}
              className="btn btn-outline"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="btn btn-primary"
            >
              {editingEmployee ? 'Update Employee' : 'Add Employee'}
            </button>
          </div>
        </form>
      </div>

      {/* Modal Backdrop */}
      <div 
        className="modal-backdrop"
        onClick={handleCloseModal}
      />
    </div>
  );
};

export default EmployeeForm;
