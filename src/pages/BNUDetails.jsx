import { useState } from 'react';

const BNUDetails = () => {
  const [bnuDetails, setBnuDetails] = useState([
    { 
      id: 1, 
      bnuId: 'BNU001', 
      location: 'Sector 15 Hub', 
      ipAddress: '192.168.1.100',
      macAddress: 'AA:BB:CC:DD:EE:FF',
      firmwareVersion: 'v2.1.5',
      status: 'Online',
      connectedUsers: 45,
      bandwidth: '1 Gbps',
      uptime: '99.8%',
      lastMaintenance: '2024-01-10',
      installationDate: '2023-06-15'
    },
    { 
      id: 2, 
      bnuId: 'BNU002', 
      location: 'Sector 12 Hub', 
      ipAddress: '192.168.1.101',
      macAddress: '11:22:33:44:55:66',
      firmwareVersion: 'v2.1.3',
      status: 'Warning',
      connectedUsers: 32,
      bandwidth: '1 Gbps',
      uptime: '95.2%',
      lastMaintenance: '2024-01-05',
      installationDate: '2023-08-20'
    },
    { 
      id: 3, 
      bnuId: 'BNU003', 
      location: 'Sector 18 Hub', 
      ipAddress: '192.168.1.102',
      macAddress: '77:88:99:AA:BB:CC',
      firmwareVersion: 'v2.0.8',
      status: 'Offline',
      connectedUsers: 0,
      bandwidth: '1 Gbps',
      uptime: '87.5%',
      lastMaintenance: '2023-12-28',
      installationDate: '2023-04-12'
    },
    { 
      id: 4, 
      bnuId: 'BNU004', 
      location: 'Sector 20 Hub', 
      ipAddress: '192.168.1.103',
      macAddress: 'DD:EE:FF:11:22:33',
      firmwareVersion: 'v2.1.5',
      status: 'Maintenance',
      connectedUsers: 0,
      bandwidth: '1 Gbps',
      uptime: '92.1%',
      lastMaintenance: '2024-01-14',
      installationDate: '2023-09-10'
    },
  ]);

  const [selectedBnu, setSelectedBnu] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const getStatusColor = (status) => {
    switch (status) {
      case 'Online': return 'bg-green-100 text-green-800';
      case 'Warning': return 'bg-yellow-100 text-yellow-800';
      case 'Offline': return 'bg-red-100 text-red-800';
      case 'Maintenance': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">BNU Details Management</h1>
        <p className="mt-2 text-gray-600">Monitor and manage Broadband Network Units</p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center">
            <div className="p-2 bg-blue-100 rounded-lg">
              <svg className="h-6 w-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
              </svg>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Total BNUs</p>
              <p className="text-2xl font-semibold text-gray-900">{bnuDetails.length}</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center">
            <div className="p-2 bg-green-100 rounded-lg">
              <svg className="h-6 w-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
              </svg>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Online</p>
              <p className="text-2xl font-semibold text-gray-900">
                {bnuDetails.filter(b => b.status === 'Online').length}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center">
            <div className="p-2 bg-orange-100 rounded-lg">
              <svg className="h-6 w-6 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path>
              </svg>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Connected Users</p>
              <p className="text-2xl font-semibold text-gray-900">
                {bnuDetails.reduce((sum, b) => sum + b.connectedUsers, 0)}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center">
            <div className="p-2 bg-purple-100 rounded-lg">
              <svg className="h-6 w-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
              </svg>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Avg Uptime</p>
              <p className="text-2xl font-semibold text-gray-900">
                {(bnuDetails.reduce((sum, b) => sum + parseFloat(b.uptime), 0) / bnuDetails.length).toFixed(1)}%
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white shadow rounded-lg">
        <div className="px-4 py-5 sm:p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-lg font-medium text-gray-900">BNU Network Status</h2>
            <div className="flex space-x-3">
              <button className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-blue-700">
                Refresh Status
              </button>
              <button className="bg-green-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-green-700">
                Export Details
              </button>
              <button className="bg-indigo-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-indigo-700">
                Add BNU
              </button>
            </div>
          </div>
          
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">BNU ID</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Location</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">IP Address</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Connected Users</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Uptime</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Firmware</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {bnuDetails.map((bnu) => (
                  <tr key={bnu.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{bnu.bnuId}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{bnu.location}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 font-mono">{bnu.ipAddress}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(bnu.status)}`}>
                        {bnu.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{bnu.connectedUsers}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{bnu.uptime}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{bnu.firmwareVersion}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <button 
                        onClick={() => {setSelectedBnu(bnu); setShowModal(true);}}
                        className="text-indigo-600 hover:text-indigo-900 mr-4"
                      >
                        View Details
                      </button>
                      <button className="text-yellow-600 hover:text-yellow-900 mr-4">Configure</button>
                      <button className="text-blue-600 hover:text-blue-900">Update</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Additional BNU Information Cards */}
      <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white shadow rounded-lg p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Firmware Version Distribution</h3>
          <div className="space-y-3">
            {Object.entries(
              bnuDetails.reduce((acc, bnu) => {
                acc[bnu.firmwareVersion] = (acc[bnu.firmwareVersion] || 0) + 1;
                return acc;
              }, {})
            ).map(([version, count]) => (
              <div key={version} className="flex justify-between items-center">
                <span className="text-sm text-gray-600">{version}</span>
                <span className="text-sm font-medium text-gray-900">{count} units</span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white shadow rounded-lg p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Recent Activities</h3>
          <div className="space-y-3">
            <div className="flex items-center text-sm">
              <div className="w-2 h-2 bg-green-400 rounded-full mr-3"></div>
              <span className="text-gray-600">BNU001 - Status check completed</span>
            </div>
            <div className="flex items-center text-sm">
              <div className="w-2 h-2 bg-yellow-400 rounded-full mr-3"></div>
              <span className="text-gray-600">BNU002 - Performance warning detected</span>
            </div>
            <div className="flex items-center text-sm">
              <div className="w-2 h-2 bg-red-400 rounded-full mr-3"></div>
              <span className="text-gray-600">BNU003 - Connection lost</span>
            </div>
            <div className="flex items-center text-sm">
              <div className="w-2 h-2 bg-blue-400 rounded-full mr-3"></div>
              <span className="text-gray-600">BNU004 - Scheduled maintenance started</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BNUDetails;
