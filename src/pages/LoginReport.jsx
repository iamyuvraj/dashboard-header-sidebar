import { useState } from 'react';

const LoginReport = () => {
  const [loginLogs, setLoginLogs] = useState([
    { 
      id: 1, 
      userId: 'admin001',
      userName: 'Admin User',
      loginTime: '2024-01-15 09:30:15',
      logoutTime: '2024-01-15 17:45:22',
      duration: '8h 15m',
      ipAddress: '192.168.1.100',
      location: 'Main Office',
      deviceType: 'Desktop',
      browser: 'Chrome 120.0',
      status: 'Success',
      actions: 45
    },
    { 
      id: 2, 
      userId: 'survey001',
      userName: 'Survey Officer',
      loginTime: '2024-01-15 08:15:30',
      logoutTime: '2024-01-15 16:30:45',
      duration: '8h 15m',
      ipAddress: '192.168.1.101',
      location: 'Field Office',
      deviceType: 'Mobile',
      browser: 'Safari 17.0',
      status: 'Success',
      actions: 32
    },
    { 
      id: 3, 
      userId: 'entry001',
      userName: 'Data Entry Clerk',
      loginTime: '2024-01-15 10:00:00',
      logoutTime: '2024-01-15 18:00:00',
      duration: '8h 0m',
      ipAddress: '192.168.1.102',
      location: 'Branch Office',
      deviceType: 'Desktop',
      browser: 'Firefox 121.0',
      status: 'Success',
      actions: 28
    },
    { 
      id: 4, 
      userId: 'temp001',
      userName: 'Temp User',
      loginTime: '2024-01-15 14:30:15',
      logoutTime: null,
      duration: 'Active',
      ipAddress: '192.168.1.103',
      location: 'Remote',
      deviceType: 'Tablet',
      browser: 'Edge 120.0',
      status: 'Active',
      actions: 12
    },
    { 
      id: 5, 
      userId: 'failed001',
      userName: 'Unknown User',
      loginTime: '2024-01-15 11:45:30',
      logoutTime: null,
      duration: 'N/A',
      ipAddress: '203.45.67.89',
      location: 'External',
      deviceType: 'Desktop',
      browser: 'Chrome 119.0',
      status: 'Failed',
      actions: 0
    }
  ]);

  const [dateRange, setDateRange] = useState('today');
  const [statusFilter, setStatusFilter] = useState('all');

  const getStatusColor = (status) => {
    switch (status) {
      case 'Success': return 'bg-green-100 text-green-800';
      case 'Active': return 'bg-blue-100 text-blue-800';
      case 'Failed': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'Success':
        return (
          <svg className="h-4 w-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
          </svg>
        );
      case 'Active':
        return (
          <svg className="h-4 w-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
          </svg>
        );
      case 'Failed':
        return (
          <svg className="h-4 w-4 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
          </svg>
        );
      default:
        return null;
    }
  };

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Login Activity Report</h1>
        <p className="mt-2 text-gray-600">Monitor user login activities and security</p>
      </div>

      {/* Statistics Dashboard */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center">
            <div className="p-2 bg-blue-100 rounded-lg">
              <svg className="h-6 w-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a4 4 0 11-8 0 4 4 0 018 0z"></path>
              </svg>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Total Logins Today</p>
              <p className="text-2xl font-semibold text-gray-900">
                {loginLogs.filter(log => log.status === 'Success' || log.status === 'Active').length}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center">
            <div className="p-2 bg-green-100 rounded-lg">
              <svg className="h-6 w-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Active Users</p>
              <p className="text-2xl font-semibold text-gray-900">
                {loginLogs.filter(log => log.status === 'Active').length}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center">
            <div className="p-2 bg-red-100 rounded-lg">
              <svg className="h-6 w-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"></path>
              </svg>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Failed Attempts</p>
              <p className="text-2xl font-semibold text-gray-900">
                {loginLogs.filter(log => log.status === 'Failed').length}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center">
            <div className="p-2 bg-purple-100 rounded-lg">
              <svg className="h-6 w-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Avg Session Time</p>
              <p className="text-2xl font-semibold text-gray-900">7h 32m</p>
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white shadow rounded-lg mb-6">
        <div className="px-4 py-5 sm:p-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-3 sm:space-y-0 sm:space-x-4">
            <div className="flex flex-col sm:flex-row sm:items-center space-y-3 sm:space-y-0 sm:space-x-4">
              <div className="flex items-center space-x-2">
                <label className="text-sm font-medium text-gray-700">Date Range:</label>
                <select 
                  value={dateRange} 
                  onChange={(e) => setDateRange(e.target.value)}
                  className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                  <option value="today">Today</option>
                  <option value="week">This Week</option>
                  <option value="month">This Month</option>
                  <option value="custom">Custom Range</option>
                </select>
              </div>

              <div className="flex items-center space-x-2">
                <label className="text-sm font-medium text-gray-700">Status:</label>
                <select 
                  value={statusFilter} 
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                  <option value="all">All Status</option>
                  <option value="Success">Success</option>
                  <option value="Active">Active</option>
                  <option value="Failed">Failed</option>
                </select>
              </div>
            </div>

            <div className="flex space-x-3">
              <button className="bg-green-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-green-700">
                Export Report
              </button>
              <button className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-blue-700">
                Refresh
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Login Activity Table */}
      <div className="bg-white shadow rounded-lg">
        <div className="px-4 py-5 sm:p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-lg font-medium text-gray-900">Login Activity Log</h2>
          </div>
          
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Login Time</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Logout Time</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Duration</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Location</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Device Info</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions Count</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {loginLogs.map((log) => (
                  <tr key={log.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <div className="text-sm font-medium text-gray-900">{log.userName}</div>
                        <div className="text-sm text-gray-500">{log.userId}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-mono">
                      {log.loginTime}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-mono">
                      {log.logoutTime || 'Active'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {log.duration}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{log.location}</div>
                      <div className="text-sm text-gray-500 font-mono">{log.ipAddress}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{log.deviceType}</div>
                      <div className="text-sm text-gray-500">{log.browser}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        {getStatusIcon(log.status)}
                        <span className={`ml-2 px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(log.status)}`}>
                          {log.status}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 text-center">
                      {log.actions}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Security Alerts */}
      <div className="mt-8 bg-white shadow rounded-lg">
        <div className="px-4 py-5 sm:p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Security Alerts</h3>
          <div className="space-y-3">
            <div className="flex items-center p-3 bg-red-50 border border-red-200 rounded-lg">
              <svg className="h-5 w-5 text-red-600 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"></path>
              </svg>
              <div>
                <p className="text-sm font-medium text-red-800">Failed login attempts detected</p>
                <p className="text-sm text-red-600">Multiple failed login attempts from IP: 203.45.67.89</p>
              </div>
            </div>
            
            <div className="flex items-center p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
              <svg className="h-5 w-5 text-yellow-600 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
              <div>
                <p className="text-sm font-medium text-yellow-800">Unusual login location</p>
                <p className="text-sm text-yellow-600">User logged in from new location: External</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginReport;
