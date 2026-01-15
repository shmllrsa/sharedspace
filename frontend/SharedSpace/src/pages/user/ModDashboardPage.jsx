import React, { useState, useEffect } from 'react';
import SampleImg from '../../assets/arts/ukiyo.jpg';
import SampleImg2 from '../../assets/arts/almondtree.jpg';
import './ModDashboardPage.css';

export function ModDashboardPage() {
  const [activeTab, setActiveTab] = useState('users');
  const [users, setUsers] = useState([]);
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem('token');
      if (!token) return;

      try {
        // Fetch users
        const usersResponse = await fetch('${import.meta.env.VITE_API_URL}/api/users/all', {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });
        if (usersResponse.ok) {
          const usersData = await usersResponse.json();
          const formattedUsers = usersData.users
            .filter(user => user.userType !== 'admin')
            .map(user => ({
              id: user._id,
              username: user.username,
              email: user.email,
              type: 'User',
              date: new Date(parseInt(user._id.substring(0, 8), 16) * 1000).toISOString().split('T')[0]
            }));
          setUsers(formattedUsers);
        }

        // Fetch reports
        const reportsResponse = await fetch('${import.meta.env.VITE_API_URL}/api/reports/', {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });
        if (reportsResponse.ok) {
          const reportsData = await reportsResponse.json();
          const formattedReports = reportsData.map(report => ({
            id: report._id,
            preview: report.artworkID?.imageURL || SampleImg,
            reason: report.reason,
            date: new Date(parseInt(report._id.substring(0, 8), 16) * 1000).toISOString().split('T')[0]
          }));
          setReports(formattedReports);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="mod-dashboard-page">
      <div className="mod-layout">
        <div className="mod-sidebar">
          <div className="card-shadow sidebar-panel">
            <div className="panel-header">Panel</div>
            <button 
              className={`mod-nav-btn ${activeTab === 'users' ? 'active' : ''}`}
              onClick={() => setActiveTab('users')}
            >
              Users
            </button>
            <button 
              className={`mod-nav-btn ${activeTab === 'reports' ? 'active' : ''}`}
              onClick={() => setActiveTab('reports')}
            >
              Reports
            </button>
          </div>
        </div>

        <div className="mod-main">
          <div className="card-shadow content-card">
            {loading ? (
              <div>Loading...</div>
            ) : activeTab === 'users' ? (
              <>
                {/* Users header */}
                <div className="table-header">
                  <span>Username</span>
                  <span>Email</span>
                  <span>Account Type</span>
                  <span>Creation Date</span>
                  <span>Action</span>
                </div>

                {/* Users body */}
                <div className="table-body">
                  {users.map(user => (
                    <div key={user.id} className="table-row">
                      <span>{user.username}</span>
                      <span>{user.email}</span>
                      <span>{user.type}</span>
                      <span>{user.date}</span>

                      {/* Dropdown */}
                      <select className="action-select">
                        <option value="">Select</option>
                        <option value="ban">Ban User</option>
                        <option value="delete">Ignore</option>
                      </select>

                    </div>
                  ))}
                </div>
              </>
            ) : (
              <>
                {/* Moderating posts */}
                {/* Posts Header */}
                <div className="table-header">
                  <span>Report ID</span>
                  <span>Preview</span>
                  <span>Reason</span>
                  <span>Posted Date</span>
                  <span>Action</span>
                </div>

                {/* Posts Body */}
                <div className="table-body">
                  {reports.map(report => (
                    <div key={report.id} className="table-row">
                      <span>{report.id}</span>
                      <div className="preview-container">
                        <img src={report.preview} alt="Report Preview" className="report-preview-img" />
                      </div>
                      <span>{report.reason}</span>
                      <span>{report.date}</span>

                      {/* Dropdown */}
                      <select className="action-select">
                        <option value="">Select</option>
                        <option value="ignore">Remove Content</option>
                        <option value="remove">Ban User</option>
                        <option value="ban">Ignore</option>
                      </select>
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
