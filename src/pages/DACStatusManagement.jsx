import { useState } from 'react';

const DACStatusManagement = () => {
  const [dacStatuses, setDacStatuses] = useState([
    { 
      id: 1, 
      dacId: 'DAC001', 
      location: 'Central Office Main', 
      status: 'Active',
      lastUpdated: '2024-01-15 10:30',
      temperature: '25°C',
      humidity: '45%',
      powerStatus: 'Normal',
      connectivity: 'Online',
      alertLevel: 'Normal'
    },
    { 
      id: 2, 
      dacId: 'DAC002', 
      location: 'Branch Office North', 
      status: 'Warning',
      lastUpdated: '2024-01-15 10:25',
      temperature: '32°C',
      humidity: '65%',
      powerStatus: 'Normal',
      connectivity: 'Online',
      alertLevel: 'Warning'
    },
    { 
      id: 3, 
      dacId: 'DAC003', 
      location: 'Remote Station East', 
      status: 'Critical',
      lastUpdated: '2024-01-15 09:45',
      temperature: '38°C',
      humidity: '75%',
      powerStatus: 'Backup',
      connectivity: 'Offline',
      alertLevel: 'Critical'
    },
    { 
      id: 4, 
      dacId: 'DAC004', 
      location: 'Branch Office South', 
      status: 'Maintenance',
      lastUpdated: '2024-01-15 08:00',
      temperature: 'N/A',
      humidity: 'N/A',
      powerStatus: 'Off',
      connectivity: 'Offline',
      alertLevel: 'Maintenance'
    },
  ]);

  const [selectedDac, setSelectedDac] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const getStatusColor = (status) => {
    switch (status) {
      case 'Active': return 'bg-green-100 text-green-800';
      case 'Warning': return 'bg-yellow-100 text-yellow-800';
      case 'Critical': return 'bg-red-100 text-red-800';
      case 'Maintenance': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getAlertColor = (alertLevel) => {
    switch (alertLevel) {
      case 'Normal': return 'text-green-600';
      case 'Warning': return 'text-yellow-600';
      case 'Critical': return 'text-red-600';
      case 'Maintenance': return 'text-blue-600';
      default: return 'text-gray-600';
    }
  };

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">DAC Status Management</h1>
        <p className="mt-2 text-gray-600">Monitor and manage Data Acquisition Controllers</p>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center">
            <div className="p-2 bg-gray-100 rounded-lg">
              <svg className="h-6 w-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z"></path>
              </svg>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Total DACs</p>
              <p className="text-2xl font-semibold text-gray-900">{dacStatuses.length}</p>
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
              <p className="text-sm font-medium text-gray-600">Active</p>
              <p className="text-2xl font-semibold text-gray-900">
                {dacStatuses.filter(d => d.status === 'Active').length}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center">
            <div className="p-2 bg-yellow-100 rounded-lg">
              <svg className="h-6 w-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"></path>
              </svg>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Warning</p>
              <p className="text-2xl font-semibold text-gray-900">
                {dacStatuses.filter(d => d.status === 'Warning').length}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center">
            <div className="p-2 bg-red-100 rounded-lg">
              <svg className="h-6 w-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
              </svg>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Critical</p>
              <p className="text-2xl font-semibold text-gray-900">
                {dacStatuses.filter(d => d.status === 'Critical').length}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center">
            <div className="p-2 bg-blue-100 rounded-lg">
              <svg className="h-6 w-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"></path>
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
              </svg>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Maintenance</p>
              <p className="text-2xl font-semibold text-gray-900">
                {dacStatuses.filter(d => d.status === 'Maintenance').length}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white shadow rounded-lg">
        <div className="px-4 py-5 sm:p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-lg font-medium text-gray-900">DAC Status Monitor</h2>
            <div className="flex space-x-3">
              <button className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-blue-700">
                Refresh All
              </button>
              <button className="bg-green-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-green-700">
                Export Report
              </button>
            </div>
          </div>
          
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">DAC ID</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Location</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Temperature</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Humidity</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Power</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Connectivity</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Last Updated</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {dacStatuses.map((dac) => (
                  <tr key={dac.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{dac.dacId}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{dac.location}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(dac.status)}`}>
                        {dac.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{dac.temperature}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{dac.humidity}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{dac.powerStatus}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`text-sm font-medium ${dac.connectivity === 'Online' ? 'text-green-600' : 'text-red-600'}`}>
                        {dac.connectivity}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{dac.lastUpdated}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <button 
                        onClick={() => {setSelectedDac(dac); setShowModal(true);}}
                        className="text-indigo-600 hover:text-indigo-900 mr-4"
                      >
                        Details
                      </button>
                      <button className="text-yellow-600 hover:text-yellow-900 mr-4">Configure</button>
                      <button className="text-blue-600 hover:text-blue-900">Reset</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DACStatusManagement;
