import { useState } from 'react';

const GPProfile = () => {
  const [gpProfiles, setGpProfiles] = useState([
    { 
      id: 1, 
      gpName: 'Rampur Gram Panchayat',
      gpCode: 'GP001',
      district: 'Main District',
      block: 'Sadar Block',
      villages: ['Rampur', 'Sita Nagar', 'Ram Nagar'],
      population: 2500,
      households: 450,
      pradhan: 'Shri Ram Kumar',
      contact: '+91-9876543210',
      email: 'rampur.gp@gov.in',
      area: '15.2 sq km',
      establishedYear: '1995',
      bankDetails: 'SBI - Account: 123456789',
      schemes: ['MGNREGA', 'PM Awas', 'Swachh Bharat'],
      lastUpdated: '2024-01-15'
    },
    { 
      id: 2, 
      gpName: 'Krishnapur Gram Panchayat',
      gpCode: 'GP002',
      district: 'North District',
      block: 'North Block',
      villages: ['Krishnapur', 'Gopal Nagar'],
      population: 1800,
      households: 320,
      pradhan: 'Smt. Sunita Devi',
      contact: '+91-9876543211',
      email: 'krishnapur.gp@gov.in',
      area: '12.8 sq km',
      establishedYear: '1998',
      bankDetails: 'PNB - Account: 987654321',
      schemes: ['MGNREGA', 'Pradhan Mantri Gram Sadak Yojana'],
      lastUpdated: '2024-01-14'
    },
    { 
      id: 3, 
      gpName: 'Govindpur Gram Panchayat',
      gpCode: 'GP003',
      district: 'South District',
      block: 'South Block',
      villages: ['Govindpur', 'Shyam Nagar', 'Hari Village'],
      population: 3200,
      households: 580,
      pradhan: 'Shri Govind Singh',
      contact: '+91-9876543212',
      email: 'govindpur.gp@gov.in',
      area: '18.5 sq km',
      establishedYear: '1992',
      bankDetails: 'BOI - Account: 456789123',
      schemes: ['MGNREGA', 'PM Awas', 'Digital India'],
      lastUpdated: '2024-01-13'
    }
  ]);

  const [selectedGp, setSelectedGp] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">GP Profile Management</h1>
        <p className="mt-2 text-gray-600">Manage Gram Panchayat profiles and information</p>
      </div>

      {/* Summary Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center">
            <div className="p-2 bg-blue-100 rounded-lg">
              <svg className="h-6 w-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h4a1 1 0 011 1v5m-6 0V9a1 1 0 011-1h4a1 1 0 011 1v13.1"></path>
              </svg>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Total GPs</p>
              <p className="text-2xl font-semibold text-gray-900">{gpProfiles.length}</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center">
            <div className="p-2 bg-green-100 rounded-lg">
              <svg className="h-6 w-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path>
              </svg>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Total Population</p>
              <p className="text-2xl font-semibold text-gray-900">
                {gpProfiles.reduce((sum, gp) => sum + gp.population, 0).toLocaleString()}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center">
            <div className="p-2 bg-orange-100 rounded-lg">
              <svg className="h-6 w-6 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2z"></path>
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 21l4-4 4 4M3 7l4 4 4-4 4 4 4-4"></path>
              </svg>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Total Households</p>
              <p className="text-2xl font-semibold text-gray-900">
                {gpProfiles.reduce((sum, gp) => sum + gp.households, 0).toLocaleString()}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center">
            <div className="p-2 bg-purple-100 rounded-lg">
              <svg className="h-6 w-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7"></path>
              </svg>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Total Villages</p>
              <p className="text-2xl font-semibold text-gray-900">
                {gpProfiles.reduce((sum, gp) => sum + gp.villages.length, 0)}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white shadow rounded-lg">
        <div className="px-4 py-5 sm:p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-lg font-medium text-gray-900">Gram Panchayat Profiles</h2>
            <div className="flex space-x-3">
              <button className="bg-green-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-green-700">
                Export Profiles
              </button>
              <button className="bg-indigo-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-indigo-700">
                Add New GP
              </button>
            </div>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
            {gpProfiles.map((gp) => (
              <div key={gp.id} className="border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">{gp.gpName}</h3>
                    <p className="text-sm text-gray-500">Code: {gp.gpCode}</p>
                  </div>
                  <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2 py-1 rounded-full">
                    Active
                  </span>
                </div>

                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">District:</span>
                    <span className="text-sm font-medium text-gray-900">{gp.district}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Block:</span>
                    <span className="text-sm font-medium text-gray-900">{gp.block}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Population:</span>
                    <span className="text-sm font-medium text-gray-900">{gp.population.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Households:</span>
                    <span className="text-sm font-medium text-gray-900">{gp.households}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Villages:</span>
                    <span className="text-sm font-medium text-gray-900">{gp.villages.length}</span>
                  </div>
                </div>

                <div className="mt-4 pt-4 border-t border-gray-200">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium text-gray-900">Pradhan:</span>
                  </div>
                  <p className="text-sm text-gray-600">{gp.pradhan}</p>
                  <p className="text-sm text-gray-600">{gp.contact}</p>
                </div>

                <div className="mt-4 pt-4 border-t border-gray-200">
                  <div className="flex flex-wrap gap-1 mb-3">
                    {gp.schemes.slice(0, 2).map((scheme, index) => (
                      <span key={index} className="bg-gray-100 text-gray-800 text-xs font-medium px-2 py-1 rounded">
                        {scheme}
                      </span>
                    ))}
                    {gp.schemes.length > 2 && (
                      <span className="bg-gray-100 text-gray-800 text-xs font-medium px-2 py-1 rounded">
                        +{gp.schemes.length - 2} more
                      </span>
                    )}
                  </div>
                </div>

                <div className="mt-4 flex justify-between">
                  <button 
                    onClick={() => {setSelectedGp(gp); setShowModal(true);}}
                    className="text-indigo-600 hover:text-indigo-900 text-sm font-medium"
                  >
                    View Full Profile
                  </button>
                  <button 
                    onClick={() => {setSelectedGp(gp); setShowEditModal(true);}}
                    className="text-yellow-600 hover:text-yellow-900 text-sm font-medium"
                  >
                    Edit Profile
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default GPProfile;
