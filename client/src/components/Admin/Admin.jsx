import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../Admin/Admin.css';

const AdminDashboard = () => {
  const [adminInfo, setAdminInfo] = useState({ name: '', email: '' });
  const [users, setUsers] = useState([]);
  const [datetime, setDatetime] = useState('');
  const [genderFilter, setGenderFilter] = useState('all');
  const [dateFilter, setDateFilter] = useState('');
  const [error, setError] = useState('');

  const navigate = useNavigate();

  const fetchAdminData = async () => {
    try {
      const token = localStorage.getItem('token');

      const params = {};
      if (dateFilter) {
        params.date = dateFilter;
      }

      const res = await axios.get('http://localhost:5000/api/users/admin', {
        headers: {
          Authorization: `Bearer ${token}`
        },
        params
      });

      const usersData = res.data.users;
      setDatetime(res.data.datetime);

      // Frontend gender filtering
      let filtered = usersData;
      if (genderFilter !== 'all') {
        filtered = usersData.filter(
          user => user.gender?.toLowerCase().trim() === genderFilter
        );
      }

      setUsers(filtered);

      const currentAdmin = usersData.find(user => user.role === 'admin');
      if (currentAdmin) {
        setAdminInfo({
          name: `${currentAdmin.fname} ${currentAdmin.lname}`,
          email: currentAdmin.email
        });
      }
    } catch (err) {
      console.error('Error fetching admin data:', err);
      setError(err.response?.data?.message || 'Access denied or server error');
    }
  };

  useEffect(() => {
    fetchAdminData();
  }, [genderFilter, dateFilter]);

  const formatDate = (dateStr) => {
    if (!dateStr) return 'N/A';
    const date = new Date(dateStr);
    return isNaN(date.getTime())
      ? 'N/A'
      : date.toLocaleDateString(undefined, {
          year: 'numeric',
          month: 'short',
          day: 'numeric',
          hour: '2-digit',
          minute: '2-digit'
        });
  };

  return (
    <div className="admin-dashboard-container">
      <div className="admin-dashboard-card">
        <h1>Welcome to the Admin Dashboard</h1>
        <p className="tagline">Manage your system with ease and control ✨</p>

        {error ? (
          <p className="error">{error}</p>
        ) : (
          <>
            <div className="admin-info">
              <h3>Admin Name: <span>{adminInfo.name}</span></h3>
              <h3>Email: <span>{adminInfo.email}</span></h3>
              <h3>Current Server Time: <span>{formatDate(datetime)}</span></h3>
            </div>

            {/* Filter Section */}
            <div className="filter-section">
              <label className="glass-input">
                Filter by Gender:
                <select value={genderFilter} onChange={(e) => setGenderFilter(e.target.value)}>
                  <option value="all">All</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
              </label>

              <label className="glass-input">
                Filter by Registration Date:
                <input
                  type="date"
                  value={dateFilter}
                  onChange={e => setDateFilter(e.target.value)}
                  max={new Date().toISOString().split('T')[0]}
                />
              </label>
            </div>

            <div className="user-table-section">
              <h2>Registered Users</h2>
              <table className="user-table">
                <thead>
                  <tr>
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>Email</th>
                    <th>Mobile</th>
                    <th>Gender</th>
                    <th>Role</th>
                    <th>Registered On</th>
                  </tr>
                </thead>
                <tbody>
                  {users.length > 0 ? (
                    users.map(user => (
                      <tr key={user._id}>
                        <td>{user.fname}</td>
                        <td>{user.lname}</td>
                        <td>{user.email}</td>
                        <td>{user.mobile}</td>
                        <td>{user.gender}</td>
                        <td>{user.role}</td>
                        <td>{formatDate(user.createdAt)}</td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="7">No users found</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            <div className="back-button-container">
              <button className="back-btn" onClick={() => navigate('/')}>
                Back to Home
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
