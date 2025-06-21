import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../Registration/RegistrationForm.css';

const RegisterForm = () => {
  const [formData, setFormData] = useState({
    fname: '',
    lname: '',
    email: '',
    gender: '',
    role: '',
    mobile: '',
    password: ''
  });

  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const response = await axios.post('https://authentication-n4yc.vercel.app/api/auth/register', formData);
      console.log('Registration Success:', response.data);

      // Automatically login after registration
      const loginResponse = await axios.post('https://authentication-n4yc.vercel.app/api/auth/login', {
        email: formData.email,
        password: formData.password
      });

      const role = loginResponse.data.user.role;
      navigate(role === 'admin' ? '/admin' : '/');
    } catch (err) {
      console.error('Registration Error:', err);
      setError(err.response?.data?.message || 'Registration failed');
    }
  };

  return (
    <div className="form-container">
      <form className="register-form" onSubmit={handleSubmit}>
        <h2>Register</h2>

        {error && <p className="error">{error}</p>}

        <div className="row">
          <div className="form-group">
            <input type="text" name="fname" value={formData.fname} onChange={handleChange} required placeholder=" " />
            <label>First Name</label>
          </div>
          <div className="form-group">
            <input type="text" name="lname" value={formData.lname} onChange={handleChange} required placeholder=" " />
            <label>Last Name</label>
          </div>
        </div>

        <div className="form-group">
          <input type="email" name="email" value={formData.email} onChange={handleChange} required placeholder=" " />
          <label>Email</label>
        </div>

        <div className="form-group">
          <select name="gender" value={formData.gender} onChange={handleChange} required>
            <option value="" disabled hidden></option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
          <label>Gender</label>
        </div>

        <div className="form-group">
          <select name="role" value={formData.role} onChange={handleChange} required>
            <option value="" disabled hidden></option>
            <option value="user">User</option>
            <option value="admin">Admin</option>
          </select>
          <label>Role</label>
        </div>

        <div className="form-group">
          <input type="tel" name="mobile" value={formData.mobile} onChange={handleChange} required placeholder=" " />
          <label>Mobile Number</label>
        </div>

        <div className="form-group">
          <input type="password" name="password" value={formData.password} onChange={handleChange} required placeholder=" " />
          <label>Password</label>
        </div>

        <button type="submit">Register</button>
        <p className="login-link">Already have an account? <a href="/login">Login</a></p>
      </form>
    </div>
  );
};

export default RegisterForm;
